import type { Article, Feed } from '@/entities/feed/model/schema';
import { FeedCard } from './FeedCard';

interface MasonryGridProps {
    articles: Article[];
    getFeed: (id: string) => Feed | undefined;
}

export function MasonryGrid({ articles, getFeed }: MasonryGridProps) {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
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
        </div>
    );
}
