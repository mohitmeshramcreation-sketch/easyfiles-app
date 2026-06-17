
# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite built with Next.js.

## Vercel Deployment Instructions

Deploying EasyFiles to Vercel is the recommended method for maximum performance and stability.

### 1. Push to GitHub
Ensure your latest code is pushed to a GitHub, GitLab, or Bitbucket repository.

### 2. Import to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your `easyfiles-app` repository.

### 3. Configure Environment Variables
In the Vercel project settings, add the following environment variables:

- `GEMINI_API_KEY`: Your API Key from [Google AI Studio](https://aistudio.google.com/).
- `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g., `https://easyfiles.online`).

**Firebase Configuration:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 4. Deploy
Click **Deploy**. Vercel will automatically detect Next.js and handle the build process.

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **AI PDF Redactor**: Automatically identify and hide sensitive information (PII).
- **PDF Suite**: Merge, Split, Organize, and Watermark tools running in-browser.
- **AI PDF Summary**: Instant insights from long documents.
- **Developer API**: Secure API key management for programmatic access.
