# Zintl - Next-Gen AI Document Tools

Zintl is a high-performance, private, and AI-powered document utility suite.

## Core Features
- **Images to PDF**: Advanced multi-image conversion with reordering and layout control.
- **AI Scanner**: Intelligent OCR and document enhancement.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights using Gemini AI.

## Deployment Instructions

### 1. Firebase App Hosting (Recommended)
This is the easiest way to host this Next.js app globally:
1. Push your code to a GitHub repository.
2. Go to the [Firebase Console](https://console.firebase.google.com/).
3. Select **App Hosting** and connect your repository.
4. Firebase will automatically detect the Next.js settings and deploy it to a global CDN.

### 2. Cloud Run
If you prefer direct control via Google Cloud:
1. Build the production image: `npm run build`.
2. Deploy to Cloud Run using the `gcloud` CLI or the Google Cloud Console.
3. Enable "Allow unauthenticated invocations" for public access.

## Domain Setup
Your `.online` domain is an excellent choice. To connect it:
- In Firebase App Hosting or Cloud Run, go to **Settings > Custom Domains**.
- Add your `.online` domain and update the DNS records (A/AAAA/CNAME) at your domain registrar.

## Privacy & Security
Zintl is designed for privacy. Most tools process files locally in the user's browser, meaning data never touches a server unless an AI feature is explicitly used.
