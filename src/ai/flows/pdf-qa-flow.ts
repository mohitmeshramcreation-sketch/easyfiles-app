'use server';
/**
 * @fileOverview This file implements a Genkit flow for asking questions about the content of a PDF document.
 *
 * - askQuestionsFromPdf - A function that handles the process of querying a PDF.
 * - AskQuestionsFromPdfInput - The input type for the askQuestionsFromPdf function.
 * - AskQuestionsFromPdfOutput - The return type for the askQuestionsFromPdf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AskQuestionsFromPdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The PDF document content as a data URI that must include a MIME type (e.g., 'application/pdf') and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  question: z.string().describe("The question to ask about the PDF document's content."),
});
export type AskQuestionsFromPdfInput = z.infer<typeof AskQuestionsFromPdfInputSchema>;

const AskQuestionsFromPdfOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer based on the PDF content.'),
});
export type AskQuestionsFromPdfOutput = z.infer<typeof AskQuestionsFromPdfOutputSchema>;

export async function askQuestionsFromPdf(input: AskQuestionsFromPdfInput): Promise<AskQuestionsFromPdfOutput> {
  return askQuestionsFromPdfFlow(input);
}

const askQuestionsFromPdfPrompt = ai.definePrompt({
  name: 'askQuestionsFromPdfPrompt',
  input: { schema: AskQuestionsFromPdfInputSchema },
  output: { schema: AskQuestionsFromPdfOutputSchema },
  prompt: `You are an intelligent assistant designed to answer questions about a PDF document.
Your task is to answer the user's question based *solely* on the content of the provided PDF document.
If you cannot find the answer directly within the document, please state that the information is not available in the document.
Do not use any outside knowledge or make assumptions.
Be concise and to the point.

PDF Document: {{media url=pdfDataUri}}

Question: {{{question}}}

Answer:`,
});

const askQuestionsFromPdfFlow = ai.defineFlow(
  {
    name: 'askQuestionsFromPdfFlow',
    inputSchema: AskQuestionsFromPdfInputSchema,
    outputSchema: AskQuestionsFromPdfOutputSchema,
  },
  async (input) => {
    const { output } = await askQuestionsFromPdfPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);
