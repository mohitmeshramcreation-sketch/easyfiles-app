'use server';
/**
 * @fileOverview A Genkit flow that summarizes the content of a PDF document.
 *
 * - summarizePdf - A function that handles the PDF summarization process.
 * - SummarizePdfInput - The input type for the summarizePdf function.
 * - SummarizePdfOutput - The return type for the summarizePdf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizePdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizePdfInput = z.infer<typeof SummarizePdfInputSchema>;

const SummarizePdfOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the PDF document content.'),
});
export type SummarizePdfOutput = z.infer<typeof SummarizePdfOutputSchema>;

export async function summarizePdf(input: SummarizePdfInput): Promise<SummarizePdfOutput> {
  return summarizePdfFlow(input);
}

const summarizePdfPrompt = ai.definePrompt({
  name: 'summarizePdfPrompt',
  input: { schema: SummarizePdfInputSchema },
  output: { schema: SummarizePdfOutputSchema },
  prompt: `You are an expert summarization AI. Your task is to read the provided PDF document and generate a concise summary of its main points.

PDF Document: {{media url=pdfDataUri}}

Provide a summary that captures the essential information, key arguments, and conclusions presented in the document. The summary should be easy to understand and highlight the most important aspects, allowing a user to quickly grasp the document's content without reading the entire file.`,
});

const summarizePdfFlow = ai.defineFlow(
  {
    name: 'summarizePdfFlow',
    inputSchema: SummarizePdfInputSchema,
    outputSchema: SummarizePdfOutputSchema,
  },
  async (input) => {
    const { output } = await summarizePdfPrompt(input);
    if (!output) {
      throw new Error('Failed to generate summary.');
    }
    return output;
  }
);
