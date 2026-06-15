# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite.

## Environment Variables
To run the AI features (Scanner, Summary, Chat), you MUST set these variables in your hosting provider (Cloudflare or Firebase):

- **Variable Name:** `GEMINI_API_KEY`
  - **Value:** [Get this from [Google AI Studio](https://aistudio.google.com/)]
- **Variable Name:** `NEXT_PUBLIC_SITE_URL`
  - **Value:** `https://easyfiles.online`

## How to Publish to GitHub

1. **Create a new repository** on [GitHub](https://github.com/new).
   - Give it a name like `easyfiles-app`.
   - Keep it Public or Private as you prefer.
   - Do **not** initialize with a README, license, or .gitignore.

2. **Open your terminal** in the project's root folder.

3. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - EasyFiles Production Ready"
   ```

4. **Connect and Push**:
   - Copy the "remote add" command from your GitHub repository page.
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## How to Host on Cloudflare (Recommended)

Cloudflare Pages is the best platform for EasyFiles because it is incredibly fast and offers a massive free tier.

### 1. Set up Cloudflare Pages
- Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
- Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
- Select your GitHub repository.

### 2. Configure Build Settings
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output` (Cloudflare uses this for Next.js compatibility).

### 3. Add Environment Variables (IMPORTANT)
- During setup, or in **Settings** > **Environment variables**:
  - Add `GEMINI_API_KEY` with your key from Google AI Studio.
  - Add `NEXT_PUBLIC_SITE_URL` with `https://easyfiles.online`.

### 4. Connect your Custom Domain (.online)
- After deployment, go to the **Custom domains** tab in your Pages project.
- Add your `.online` domain. Cloudflare handles DNS and SSL automatically.

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights from long documents.

## Privacy
Our core tools (Images to PDF, Merge, Split) process files **locally in your browser**. Data never touches a server unless an AI feature is explicitly invoked.