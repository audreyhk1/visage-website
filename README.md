# VISAGE — AI Makeup Analysis

## Setup

### 1. Push this repo to GitHub
Make sure all files are committed and pushed.

### 2. Import into Vercel
- Go to vercel.com → Add New Project
- Connect your GitHub repo
- Framework Preset: **Other**
- Root Directory: `./`
- Build Command: *(leave blank)*
- Output Directory: `public`

### 3. Add your Anthropic API key
In Vercel → your project → **Settings** → **Environment Variables**:
- Name: `ANTHROPIC_API_KEY`
- Value: `sk-ant-...` (your key from console.anthropic.com)

### 4. Redeploy
Vercel → Deployments → Redeploy. Your site is live!

## File Structure
```
visage/
├── api/
│   └── analyze.js      ← serverless function (keeps API key secret)
├── public/
│   └── index.html      ← the app
├── vercel.json         ← routing config
└── README.md
```
