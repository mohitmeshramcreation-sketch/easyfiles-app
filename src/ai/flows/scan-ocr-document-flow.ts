'use server';
/**
 * @fileOverview An AI agent that enhances document images, performs OCR to extract text, and converts them into searchable PDFs.
 *
 * - scanOcrDocument - A function that handles the document scanning and OCR process.
 * - ScanOcrDocumentInput - The input type for the scanOcrDocument function.
 * - ScanOcrDocumentOutput - The return type for the scanOcrDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Buffer } from 'buffer';

// Input Schema
const ScanOcrDocumentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ScanOcrDocumentInput = z.infer<typeof ScanOcrDocumentInputSchema>;

// Output Schema
const ScanOcrDocumentOutputSchema = z.object({
  searchablePdfDataUri: z
    .string()
    .describe('The generated searchable PDF as a data URI.'),
  extractedText: z
    .string()
    .describe('The text extracted from the document image after OCR.'),
});
export type ScanOcrDocumentOutput = z.infer<typeof ScanOcrDocumentOutputSchema>;

// Genkit Tool to generate a searchable PDF
// This function relies on the 'pdf-lib' npm package, which needs to be installed.
// For a truly "searchable" PDF with the original image as background,
// the text would typically be placed invisibly or with very low opacity on top of the image
// with precise coordinate mapping. This simplified implementation places the image and text separately
// on the PDF page, making the added text searchable.
const generateSearchablePdfTool = ai.defineTool(
  {
    name: 'generateSearchablePdf',
    description: 'Generates a searchable PDF from an image data URI and its extracted text.',
    inputSchema: z.object({
      imageDataUri: z.string().describe('The enhanced document image as a data URI.'),
      extractedText: z.string().describe('The text extracted from the document.'),
    }),
    outputSchema: z.object({
      pdfDataUri: z.string().describe('The generated PDF as a data URI.'),
    }),
  },
  async (input) => {
    const { imageDataUri, extractedText } = input;

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    // Embed font for text
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add extracted text to make it searchable
    // Simple text wrapping logic
    page.setFont(font);
    page.setFontSize(10);
    let yOffset = page.getHeight() - 50;
    const margin = 50;
    const lineGap = 12;
    const maxTextWidth = page.getWidth() - (2 * margin);

    const words = extractedText.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine === '' ? word : currentLine + ' ' + word;
      const textWidth = font.widthOfTextAtSize(testLine, 10);

      if (textWidth < maxTextWidth) {
        currentLine = testLine;
      } else {
        page.drawText(currentLine, {
          x: margin,
          y: yOffset,
          font,
          size: 10,
          color: rgb(0, 0, 0),
        });
        yOffset -= lineGap;
        currentLine = word;

        if (yOffset < margin) {
          page = pdfDoc.addPage();
          page.setFont(font);
          page.setFontSize(10);
          yOffset = page.getHeight() - margin;
        }
      }
    }
    // Draw the last line
    if (currentLine !== '') {
      page.drawText(currentLine, {
        x: margin,
        y: yOffset,
        font,
        size: 10,
        color: rgb(0, 0, 0),
      });
      yOffset -= lineGap;
    }

    // Embed and draw the enhanced image
    try {
      const [mimeTypePart, base64Data] = imageDataUri.split(';base64,');
      if (!base64Data) {
        throw new Error('Invalid data URI for image.');
      }
      const imageBuffer = Buffer.from(base64Data, 'base64');

      let embeddedImage;
      if (mimeTypePart.includes('image/jpeg')) {
        embeddedImage = await pdfDoc.embedJpg(imageBuffer);
      } else if (mimeTypePart.includes('image/png')) {
        embeddedImage = await pdfDoc.embedPng(imageBuffer);
      } else {
        console.warn('Unsupported image MIME type for PDF embedding, attempting as PNG/JPG: ' + mimeTypePart);
        try {
          embeddedImage = await pdfDoc.embedPng(imageBuffer); // Try PNG
        } catch (pngErr) {
          embeddedImage = await pdfDoc.embedJpg(imageBuffer); // Try JPG
        }
      }

      if (embeddedImage) {
        const imgRatio = embeddedImage.width / embeddedImage.height;
        let imgWidth = page.getWidth() * 0.7;
        let imgHeight = imgWidth / imgRatio;

        if (imgHeight > (yOffset - margin - lineGap)) { // If image is too tall for remaining space
          imgHeight = yOffset - margin - lineGap;
          imgWidth = imgHeight * imgRatio;
        }

        const imageX = (page.getWidth() - imgWidth) / 2;
        const imageY = yOffset - imgHeight - lineGap; // Position below text

        if (imageY < margin) { // If image goes below margin, add new page
            page = pdfDoc.addPage();
            yOffset = page.getHeight() - margin;
            page.setFont(font);
            page.setFontSize(10);
            page.drawImage(embeddedImage, {
                x: (page.getWidth() - imgWidth) / 2,
                y: yOffset - imgHeight - lineGap,
                width: imgWidth,
                height: imgHeight,
            });
        } else {
            page.drawImage(embeddedImage, {
                x: imageX,
                y: imageY,
                width: imgWidth,
                height: imgHeight,
            });
        }
      } else {
        console.warn('Failed to embed image into PDF: No supported image type found or embedding failed.');
      }
    } catch (error) {
      console.error('Error embedding image into PDF:', error);
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { pdfDataUri: `data:application/pdf;base64,${pdfBase64}` };
  }
);

// Genkit Flow Definition
const scanOcrDocumentFlow = ai.defineFlow(
  {
    name: 'scanOcrDocumentFlow',
    inputSchema: ScanOcrDocumentInputSchema,
    outputSchema: ScanOcrDocumentOutputSchema,
  },
  async (input) => {
    // Step 1: Enhance the image and perform OCR using a multimodal model
    const response = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-image'),
      prompt: [
        { text: 'Enhance this document image (improve contrast, deskew, straighten, and clean up background noise if necessary). Then, meticulously extract all visible text from the enhanced document. Prioritize accuracy and readability. Return the enhanced image and the extracted text.' },
        { media: { url: input.photoDataUri } },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        temperature: 0, // Aim for factual extraction, not creative.
      },
    });

    const extractedText = response.text || ''; // Default to empty string if no text
    const enhancedImageDataUri = response.media?.[0]?.url;

    if (!enhancedImageDataUri) {
      throw new Error('AI failed to return an enhanced image. Cannot generate PDF.');
    }

    // Step 2: Generate searchable PDF using the extracted text and enhanced image
    const pdfToolOutput = await generateSearchablePdfTool({
      imageDataUri: enhancedImageDataUri,
      extractedText: extractedText,
    });

    return {
      searchablePdfDataUri: pdfToolOutput.pdfDataUri,
      extractedText: extractedText,
    };
  }
);

// Exported wrapper function for the flow
export async function scanOcrDocument(
  input: ScanOcrDocumentInput
): Promise<ScanOcrDocumentOutput> {
  return scanOcrDocumentFlow(input);
}
