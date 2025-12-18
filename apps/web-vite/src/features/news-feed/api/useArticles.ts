import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/shared/db/dexie';


export function useArticles(feedId?: string) {
    // If feedId is provided, filter by it. Else get all.
    const articles = useLiveQuery(async () => {
        let results;
        if (feedId) {
            results = await db.articles.where('feedId').equals(feedId).toArray();
        } else {
            results = await db.articles.toArray();
        }

        // Sort in memory to avoid compound index issues
        const sorted = results.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        console.log(`[useArticles] Found ${sorted.length} articles for feed ${feedId || 'ALL'}`);
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
