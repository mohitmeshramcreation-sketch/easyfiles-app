# EasyFiles - Smart AI Document Tools

EasyFiles is a high-performance, private, and AI-powered document utility suite.

## How to Publish to GitHub

1. **Create a new repository** on [GitHub](https://github.com/new).
   - Give it a name like `easyfiles-app`.
   - Keep it Public or Private as you prefer.
   - Do **not** initialize with a README, license, or .gitignore (as the project already has them).

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

## How to Host on Cloudflare (Recommended for Zero-Backend Feel)

Cloudflare Pages is the best platform for EasyFiles because it is incredibly fast and offers a massive free tier.

### 1. Set up Cloudflare Pages
- Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
- Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
- Select your GitHub repository.

### 2. Configure Build Settings
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output` (Note: Cloudflare uses the Vercel output format for Next.js compatibility).
- **Environment Variables**:
  - Add `GEMINI_API_KEY`: [Your Google AI API Key]
  - Add `NEXT_PUBLIC_SITE_URL`: `https://easyfiles.online`

### 3. Connect your Custom Domain (.online)
- After deployment, go to the **Custom domains** tab in your Pages project.
- Add your `.online` domain. Cloudflare will automatically handle the DNS and SSL for you.

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling. (100% Private, Browser-based)
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights from long documents.

## Privacy
Our core tools (Images to PDF, Merge, Split) process files **locally in your browser**. Data never touches a server unless an AI feature is explicitly invoked, ensuring maximum privacy for your sensitive documents.
