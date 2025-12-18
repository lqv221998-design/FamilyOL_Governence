import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/shared/db/dexie';
import type { Feed } from '@/entities/feed/model/schema';

export function useFeeds() {
    const feeds = useLiveQuery(() => db.feeds.toArray());

    const addFeed = async (url: string) => {
        // 1. Fetch RSS info via Proxy
        const res = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error('Invalid RSS URL');
        const data = await res.json();

        // 2. Add to IndexedDB
        const newFeed: Feed = {
            id: crypto.randomUUID(),
            url,
            title: data.title,
            description: data.description,
            iconUrl: data.image?.url, // Basic RSS image
            createdAt: new Date(),
            errorCount: 0,
        };

        const articles = (data.items || []).map((item: any) => {
            // Extract image from content or enclosure
            const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/) ||
                item['content:encoded']?.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : (item.enclosure?.url || undefined);

            // Validate Date
            let publishedAt = new Date();
            if (item.isoDate) publishedAt = new Date(item.isoDate);
            else if (item.pubDate) publishedAt = new Date(item.pubDate);

            if (isNaN(publishedAt.getTime())) {
                publishedAt = new Date(); // Fallback to now if invalid
            }

            return {
                id: crypto.randomUUID(),
                feedId: newFeed.id,
                title: item.title,
                link: item.link,
                content: item.content || item['content:encoded'] || '',
                snippet: item.snippet || '',
                imageUrl,
                publishedAt,
                isRead: false,
            };
        });

        console.log(`[useFeeds] Saving ${articles.length} articles to DB`);

        await db.transaction('rw', db.feeds, db.articles, async () => {
            await db.feeds.add(newFeed);
            await db.articles.bulkAdd(articles);
        });

        return newFeed;
    };

    const removeFeed = async (id: string) => {
        await db.feeds.delete(id);
    };

    return {
        feeds: feeds || [],
        isLoading: !feeds,
        addFeed,
        removeFeed,
    };
}
