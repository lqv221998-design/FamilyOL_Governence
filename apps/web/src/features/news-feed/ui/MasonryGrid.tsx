import { Article, Feed } from '@/entities/feed/model/schema';
import { FeedCard } from './FeedCard';

interface MasonryGridProps {
    articles: Article[];
    getFeed: (id: string) => Feed | undefined;
}

export function MasonryGrid({ articles, getFeed }: MasonryGridProps) {
    return (
        <div className="masonry-grid">
            {articles.map((article) => {
                const feed = getFeed(article.feedId);
                return (
                    <FeedCard
                        key={article.id}
                        article={article}
                        feedTitle={feed?.title || 'Unknown Source'}
                        onClick={() => window.open(article.link, '_blank')} // Temporary: open link
                    />
                );
            })}

            <style jsx>{`
        .masonry-grid {
          column-count: 3;
          column-gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .masonry-grid { column-count: 2; }
        }
        @media (max-width: 640px) {
          .masonry-grid { column-count: 1; }
        }
      `}</style>
        </div>
    );
}
