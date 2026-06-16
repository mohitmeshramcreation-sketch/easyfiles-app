
'use server';
/**
 * @fileOverview AI flow to identify sensitive information in a PDF for redaction.
 *
 * - identifySensitiveInfo - Scans document content for PII (names, emails, SSNs, etc).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RedactPdfInputSchema = z.object({
  pdfDataUri: z.string().describe("PDF data URI"),
});

const RedactPdfOutputSchema = z.object({
  sensitiveTerms: z.array(z.string()).describe('List of sensitive terms found in the document.'),
  explanation: z.string().describe('Explanation of why these terms were flagged.'),
});

export type RedactPdfOutput = z.infer<typeof RedactPdfOutputSchema>;

export async function identifySensitiveInfo(input: { pdfDataUri: string }): Promise<RedactPdfOutput> {
  return identifySensitiveInfoFlow(input);
}

const identifySensitiveInfoFlow = ai.defineFlow(
  {
    name: 'identifySensitiveInfoFlow',
    inputSchema: RedactPdfInputSchema,
    outputSchema: RedactPdfOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: [
        { text: 'You are a privacy expert. Scan this PDF and identify any sensitive information (PII) such as full names, email addresses, phone numbers, physical addresses, or financial IDs. Return them as a list of strings.' },
        { media: { url: input.pdfDataUri, contentType: 'application/pdf' } },
      ],
      output: { schema: RedactPdfOutputSchema }
    });

    if (!output) throw new Error('AI failed to analyze document.');
    return output;
  }
);
