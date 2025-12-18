import { Article, Feed } from '@/entities/feed/model/schema';

interface FeedCardProps {
    article: Article;
    feedTitle: string;
    onClick: () => void;
}

export function FeedCard({ article, feedTitle, onClick }: FeedCardProps) {
    // Extract first image from content if snippet or content has it (simple regex or DOM parser)
    // For now, assume no image or basic parsing logic if needed.
    // We'll focus on text layout first.

    const dateStr = new Date(article.publishedAt).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric'
    });

    return (
        <article className="feed-card glass-panel" onClick={onClick}>
            <div className="card-content">
                <div className="card-meta">
                    <span className="feed-source">{feedTitle}</span>
                    <span className="article-date">{dateStr}</span>
                </div>
                <h3 className="card-title">{article.title}</h3>
                <p className="card-snippet">{article.snippet}</p>
            </div>

            <div className="card-actions">
                {/* Future: Save/Read Later buttons */}
            </div>

            <style jsx>{`
        .feed-card {
          margin-bottom: 1.5rem;
          break-inside: avoid; /* For Masonry */
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.4); /* Lighter glass */
        }
        .feed-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .card-content { padding: 1.25rem; }
        .card-meta {
          display: flex; justify-content: space-between;
          font-size: 0.75rem; color: var(--text-secondary);
          margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .feed-source { font-weight: 600; color: var(--accent); }
        .card-title {
          font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;
          line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-snippet {
          font-size: 0.9rem; color: var(--text-secondary);
          display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
        }
      `}</style>
        </article>
    );
}
