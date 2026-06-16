
# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite.

## Cloudflare Pages Deployment Configuration

To ensure a successful deployment on Cloudflare Pages, use the following settings in your Cloudflare Dashboard:

### 1. Build Settings
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output`
- **Root directory**: `/` (Leave blank or set to `/`)

### 2. Environment Variables
Set these under **Settings > Environment variables**:

- **Variable Name:** `GEMINI_API_KEY`
  - **Value:** [Your API Key from Google AI Studio]
- **Variable Name:** `NEXT_PUBLIC_SITE_URL`
  - **Value:** `https://easyfiles.online`
- **Variable Name:** `NODE_VERSION`
  - **Value:** `22.16.0`
- **Variable Name:** `NPM_FLAGS`
  - **Value:** `--legacy-peer-deps`

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights from long documents.
