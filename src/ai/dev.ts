import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-pdf-flow.ts';
import '@/ai/flows/pdf-qa-flow.ts';
import '@/ai/flows/scan-ocr-document-flow.ts';