import type { Article } from '@/entities/feed/model/schema';

interface FeedCardProps {
  article: Article;
  feedTitle: string;
  onClick: () => void;
}

export function FeedCard({ article, feedTitle, onClick }: FeedCardProps) {
  const dateStr = new Date(article.publishedAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric'
  });

  return (
    <article 
      className="mb-6 break-inside-avoid cursor-pointer transition-all duration-200 overflow-hidden glass-panel bg-white/40 hover:-translate-y-1 hover:shadow-lg"
      onClick={onClick}
    >
      {article.imageUrl && (
        <div className="w-full h-[180px] overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            loading="lazy" 
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
          <span className="font-semibold text-blue-600">{feedTitle}</span>
          <span>{dateStr}</span>
        </div>
        <h3 className="text-lg font-bold mb-3 leading-snug line-clamp-3">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-4">
          {article.snippet}
        </p>
      </div>

      <div className="card-actions">
        {/* Future: Save/Read Later buttons */}
      </div>
    </article>
  );
}
