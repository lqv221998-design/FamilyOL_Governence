import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/shared/db/dexie';
import { Feed } from '@/entities/feed/model/schema';

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

        await db.feeds.add(newFeed);
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
