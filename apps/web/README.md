# 📰 AI-Powered Local RSS Reader (Enterprise Portfolio)

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Ollama](https://img.shields.io/badge/AI-Ollama-orange) ![Dexie.js](https://img.shields.io/badge/DB-IndexedDB-lightgrey)

> A modern, local-first RSS Reader that brings the power of **Local LLMs** to your daily news consumption. Built with privacy, performance, and clean architecture in mind.

## 🚀 Features

- **🔒 Local-First Architecture**: All data (feeds, articles) stored locally using **IndexedDB (Dexie)**. Zero privacy tracking.
- **✨ Features "Glassmorphism" UI**: Aesthetically pleasing, responsive design with dark mode support.
- **🤖 AI Daily Briefing**: Integrated with **Ollama** to generate on-demand daily summaries of your news feeds using local LLMs (Llama 3, Qwen).
- **🛡️ Enterprise Standards**: Built with **Feature-Sliced Design (FSD)**, strict **Typescript** validation (Zod), and **PWA** support.
- **⚡ Super Fast**: Optimistic UI updates, Virtual Masonry Grid, and Offline support.

## 🏗️ Technical Architecture

### Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, CSS Modules.
- **State/Data**: SWR (Fetching), Dexie (Persistence), Zod (Validation).
- **AI Integration**: Custom Streaming API Route connecting to local Ollama instance.
- **Style**: Custom CSS Variables system (No Tailwind dependency).

### Pattern: Feature-Sliced Design (FSD)

The project follows a strict FSD directory structure for scalability:

```
src/
├── app/            # Next.js App Router (Entry Layer)
├── entities/       # Business Entities (Feed, Article Models)
├── features/       # User Scenarios (FeedManager, NewsFeed, AIBriefing)
├── shared/         # Reusable infrastructure (DB, UI Kit)
└── widgets/        # Composition Layer
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- [Ollama](https://ollama.com) (for AI features) running locally on port 11434.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/local-rss-reader.git
   cd local-rss-reader
   ```

2. **Install dependencies**

   ```bash
   cd apps/web
   npm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Verify AI (Optional)**
   Ensure Ollama is running: `ollama run llama3`

## 🧪 Quality Assurance

- **Linting**: ESLint + Prettier configured.
- **Hooks**: Husky pre-commit hooks ensure high code quality.
- **Type Safety**: strict checking enabled.

---

*This project was built as a demonstration of advanced Frontend Engineering & AI Integration capabilities.*
