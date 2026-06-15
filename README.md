
# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite.

## How to Solve Build Errors (ERESOLVE)
If you see dependency errors during deployment:
1. Ensure your `package.json` has `next` version `15.1.0` or higher.
2. The included `.npmrc` file with `legacy-peer-deps=true` handles conflicts automatically.
3. In Cloudflare Pages Settings, you can also add an Environment Variable:
   - **Key:** `NPM_FLAGS`
   - **Value:** `--legacy-peer-deps`

## Environment Variables
To run the AI features (Scanner, Summary, Chat), you MUST set these variables in your hosting provider (Cloudflare or Firebase):

- **Variable Name:** `GEMINI_API_KEY`
  - **Value:** [Get this from [Google AI Studio](https://aistudio.google.com/)]
- **Variable Name:** `NEXT_PUBLIC_SITE_URL`
  - **Value:** `https://easyfiles.online`

## How to Publish to GitHub

1. **Create a new repository** on [GitHub](https://github.com/new).
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

### 1. Set up Cloudflare Pages
- Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
- Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
- Select your GitHub repository.

### 2. Configure Build Settings
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output`

### 3. Add Environment Variables (IMPORTANT)
- In Cloudflare Dashboard, go to **Settings** > **Environment variables**:
  - Add `GEMINI_API_KEY` with your key from Google AI Studio.
  - Add `NEXT_PUBLIC_SITE_URL` with `https://easyfiles.online`.
  - Add `NPM_FLAGS` with `--legacy-peer-deps` to ensure the build succeeds.

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights from long documents.
