"use client";

import { useState } from "react";
import { Sidebar } from "@/features/feed-manager/ui/Sidebar";
import { MasonryGrid } from "@/features/news-feed/ui/MasonryGrid";
import { useArticles } from "@/features/news-feed/api/useArticles";
import { useFeeds } from "@/features/feed-manager/api/useFeeds";

import { DebugPanel } from '@/shared/ui/DebugPanel';

export default function Home() {
  const [selectedFeedId, setSelectedFeedId] = useState<string | undefined>(undefined);
  const { articles, isLoading } = useArticles(selectedFeedId);
  const { feeds } = useFeeds();

  const getFeed = (id: string) => feeds?.find((f) => f.id === id);

  return (
    <main className="app-container">
      <Sidebar onSelect={setSelectedFeedId} selectedId={selectedFeedId} />
      <section className="content-area glass-panel">
        <header className="content-header">
          <h2>{selectedFeedId ? getFeed(selectedFeedId)?.title : 'Latest News'}</h2>
          <div className="view-mode-toggles">
            <span className="count">{articles?.length || 0} articles</span>
          </div>
        </header>

        <div className="articles-grid">
          {/* ... */}
          {isLoading ? (
            <p className="loading">Loading news...</p>
          ) : articles && articles.length > 0 ? (
            <MasonryGrid articles={articles} getFeed={getFeed} />
          ) : (
            <div className="empty-feed">
              <p>No articles found. Add a feed to get started.</p>
            </div>
          )}
        </div>
      </section>

      <DebugPanel />

      <style jsx global>{`
        .app-container {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-image: 
            radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.1) 0px, transparent 50%);
        }
        .content-area {
          flex: 1;
          margin: 1rem 1rem 1rem 0;
          padding: 2rem;
          display: flex; flex-direction: column;
          overflow-y: auto;
        }
        .content-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 2rem;
        }
        .empty-feed {
          display: flex; justify-content: center; align-items: center;
          height: 300px;
          color: var(--text-secondary);
        }
        .loading { text-align: center; color: var(--text-secondary); margin-top: 2rem; }
        .count { font-size: 0.875rem; color: var(--text-secondary); }
      `}</style>
    </main>
  );
}
