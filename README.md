
# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite built with Next.js 15.

## Deployment via Firebase App Hosting (Recommended)

EasyFiles is optimized for **Firebase App Hosting**, which provides seamless Next.js support with automatic scaling and server-side rendering.

### 1. Connect to GitHub
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select **App Hosting** from the sidebar.
3. Click **Get Started** and connect your GitHub repository.

### 2. Configure Build Settings
*   **Root Directory**: `/`
*   **Environment Variables**: In the App Hosting dashboard, add the following:
    *   `GEMINI_API_KEY`: Your API Key from [Google AI Studio](https://aistudio.google.com/).
    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   (And other Firebase config variables from your Project Settings).

### 3. Automatic Deployment
Every time you push code to your `main` branch, Firebase will automatically build and deploy your application.

## Alternative: Vercel Deployment
1. Import the repository into [Vercel](https://vercel.com).
2. Configure the environment variables listed above.
3. Vercel will detect Next.js and deploy automatically.

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **AI PDF Redactor**: Automatically identify and hide sensitive information (PII).
- **PDF Suite**: Merge, Split, Organize, and Watermark tools running in-browser.
- **AI PDF Summary**: Instant insights from long documents.
- **Developer API**: Secure API key management via Firebase Auth & Firestore.
