'use server';
/**
 * @fileOverview A Genkit flow that translates the text extracted from a PDF document.
 * 
 * - translateDocument - Main function for translation.
 * - TranslateDocumentInput - Input schema.
 * - TranslateDocumentOutput - Output schema.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateDocumentInputSchema = z.object({
  pdfDataUri: z.string().describe("PDF data URI"),
  targetLanguage: z.string().describe("Target language (e.g., 'Spanish', 'French')"),
});
export type TranslateDocumentInput = z.infer<typeof TranslateDocumentInputSchema>;

const TranslateDocumentOutputSchema = z.object({
  translatedText: z.string().describe('The translated content of the document.'),
});
export type TranslateDocumentOutput = z.infer<typeof TranslateDocumentOutputSchema>;

export async function translateDocument(input: TranslateDocumentInput): Promise<TranslateDocumentOutput> {
  return translateDocumentFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translateDocumentPrompt',
  input: { schema: TranslateDocumentInputSchema },
  output: { schema: TranslateDocumentOutputSchema },
  prompt: `You are a professional translator. 
Read the provided PDF document and translate its entire content accurately into {{{targetLanguage}}}.
Maintain the formal or informal tone as appropriate for the document type.

PDF Document: {{media url=pdfDataUri}}

Translated Content:`,
});

const translateDocumentFlow = ai.defineFlow(
  {
    name: 'translateDocumentFlow',
    inputSchema: TranslateDocumentInputSchema,
    outputSchema: TranslateDocumentOutputSchema,
  },
  async (input) => {
    const { output } = await translatePrompt(input);
    if (!output) throw new Error('Translation failed.');
    return output;
  }
);
