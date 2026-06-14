# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite.

## Deployment & Pricing

### 1. Firebase App Hosting (Recommended)
This is the modern way to host Next.js apps globally. 
- **Platform**: Uses Google Cloud's global infrastructure.
- **Pricing**: Requires the **Firebase Blaze Plan** (Pay-as-you-go). For an MVP with moderate traffic, usage usually falls within the **free tier limits** of the underlying Google Cloud services (Cloud Run, Cloud Build).
- **Custom Domains**: Fully supported. You can connect your `.online` domain in the Firebase Console under **App Hosting > Settings > Custom Domains**.

### 2. Deployment Steps
1. Push your code to a GitHub repository.
2. Go to the [Firebase Console](https://console.firebase.google.com/).
3. Select **App Hosting** and connect your repository.
4. Firebase will automatically build your Next.js app and deploy it to a global CDN.

## Core Features
- **Images to PDF**: Advanced reordering, layout control, and browser-side processing.
- **AI Scanner**: Intelligent OCR and document enhancement via EasyFiles AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights using Gemini AI.

## Privacy & Security
EasyFiles is "Privacy by Design." Most tools process files locally in the user's browser, meaning data never touches a server unless an AI feature (Summary/Chat/Scanner) is explicitly invoked.
