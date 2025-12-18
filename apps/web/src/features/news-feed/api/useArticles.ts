import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/shared/db/dexie';
import { Article } from '@/entities/feed/model/schema';

export function useArticles(feedId?: string) {
    // If feedId is provided, filter by it. Else get all.
    const articles = useLiveQuery(async () => {
        let collection;
        if (feedId) {
            collection = db.articles.where('feedId').equals(feedId);
        } else {
            collection = db.articles.toCollection();
        }

        // Sort by publishedAt desc
        const sorted = await collection.reverse().sortBy('publishedAt');
        return sorted;
    }, [feedId]);

    const markAsRead = async (id: string) => {
        await db.articles.update(id, { isRead: true });
    };

    return {
        articles: articles || [],
        isLoading: !articles,
        markAsRead,
    };
}
