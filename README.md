# FamilyOL Governance - RSS Reader

A premium, local-first RSS Reader application built with Vite, React, Tailwind CSS, and Vercel Serverless Functions.

## 📂 Project Structure

- **`apps/web-vite`**: The main application (previously ported from Next.js).
  - **Frontend**: React + Vite + Tailwind CSS.
  - **Backend**: Vercel Serverless Functions (`api/`).
  - **Database**: IndexedDB (via Dexie.js) for local storage.

- **`docs/`**: Documentation and legacy planning files.

## 🚀 Getting Started

1.  Navigate to the application directory:
    ```bash
    cd apps/web-vite
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    - **Frontend Only**: `npm run dev`
    - **Full Stack (Frontend + API)**: `npx vercel dev`

## 🛠 Features

- **RSS Aggregation**: Proxies RSS requests to bypass CORS.
- **AI Summarization**: Integrates with local Ollama for "Daily Briefings".
- **Local-First**: Works offline using IndexedDB.
