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

## How to Host on Firebase (Recommended)

To deploy your app globally and connect your `.online` domain, follow these steps:

### 1. Prepare your Repository
- Ensure your code is pushed to your **GitHub** repository (using the steps above).

### 2. Set up Firebase
- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click **Add Project** and create a new project named "EasyFiles".
- Upgrade to the **Blaze Plan** (Pay-as-you-go). Note: There is a generous free tier, so small/medium usage often costs $0.

### 3. Enable App Hosting
- In the left sidebar, go to **Build > App Hosting**.
- Click **Get Started**.
- Connect your GitHub account and select your repository.
- Follow the wizard:
  - **Region**: Select the one closest to your target users (e.g., `us-central1`).
  - **Environment Variables**: You don't need to add any yet.
- Click **Finish and Deploy**.

### 4. Connect your Custom Domain (.online)
- Once the deployment is finished, go to the **App Hosting** dashboard.
- Select your backend and click **Settings**.
- Find the **Custom Domains** section.
- Add your `.online` domain and follow the instructions to update your DNS records (A and CNAME).

## Core Features
- **Images to PDF**: Advanced reordering, orientation control, and scaling.
- **AI Scanner**: OCR and document enhancement via Gemini AI.
- **PDF Suite**: Merge, Split, and Compress tools running 100% in-browser for privacy.
- **AI PDF Summary**: Instant insights from long documents.

## Privacy
Most tools process files locally in the user's browser, meaning data never touches a server unless an AI feature is explicitly invoked.
