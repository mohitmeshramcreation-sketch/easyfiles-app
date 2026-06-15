
# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite.

## How to Solve Build Errors (ERESOLVE)
If you see dependency errors during deployment:
1. Ensure your `package.json` has `next` version `15.5.18` or higher.
2. The included `.npmrc` file with `legacy-peer-deps=true` handles conflicts automatically.
3. In Cloudflare Pages Settings, you can also add an Environment Variable:
   - **Key:** `NPM_FLAGS`
   - **Value:** `--legacy-peer-deps`

## How to Solve "Root Directory Not Found"
In the Cloudflare Dashboard settings:
- **Root directory**: MUST be set to `/` (or leave it blank). Do NOT set it to `/src` or any other folder.
- **Framework preset**: Select `Next.js`.
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output`

## Environment Variables
To run the AI features (Scanner, Summary, Chat), you MUST set these variables in your hosting provider (Cloudflare or Firebase):

- **Variable Name:** `GEMINI_API_KEY`
  - **Value:** [Get this from [Google AI Studio](https://aistudio.google.com/)]
- **Variable Name:** `NEXT_PUBLIC_SITE_URL`
  - **Value:** `https://easyfiles.online`

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights from long documents.
