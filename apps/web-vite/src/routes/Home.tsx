import { useState } from "react";
import { Sidebar } from "@/features/feed-manager/ui/Sidebar";
import { MasonryGrid } from "@/features/news-feed/ui/MasonryGrid";
import { useArticles } from "@/features/news-feed/api/useArticles";
import { useFeeds } from "@/features/feed-manager/api/useFeeds";
import { DebugPanel } from "@/shared/ui/DebugPanel";

export default function Home() {
  const [selectedFeedId, setSelectedFeedId] = useState<string | undefined>(undefined);
  const { articles, isLoading } = useArticles(selectedFeedId);
  const { feeds } = useFeeds();

  const getFeed = (id: string) => feeds?.find((f) => f.id === id);

  return (
    <main className="flex h-screen overflow-hidden bg-[radial-gradient(at_0%_0%,rgba(37,99,235,0.1)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(168,85,247,0.1)_0px,transparent_50%)]">
      <Sidebar onSelect={setSelectedFeedId} selectedId={selectedFeedId} />
      <section className="glass-panel flex-1 m-4 ml-0 p-8 flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{selectedFeedId ? getFeed(selectedFeedId)?.title : 'Latest News'}</h2>
          <div>
            <span className="text-sm text-[var(--text-secondary)]">{articles?.length || 0} articles</span>
          </div>
        </header>

        <div className="flex-1">
          {isLoading ? (
            <p className="text-center mt-8 text-[var(--text-secondary)]">Loading news...</p>
          ) : articles && articles.length > 0 ? (
            <MasonryGrid articles={articles} getFeed={getFeed} />
          ) : (
            <div className="flex justify-center items-center h-[300px] text-[var(--text-secondary)]">
              <p>No articles found. Add a feed to get started.</p>
            </div>
          )}
        </div>
      </section>
      
      <DebugPanel />
    </main>
  );
}
