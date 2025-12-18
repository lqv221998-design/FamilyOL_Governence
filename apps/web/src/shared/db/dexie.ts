import Dexie, { type Table } from 'dexie';
import type { Feed, Article } from '@/entities/feed/model/schema';

export class AppDatabase extends Dexie {
    feeds!: Table<Feed>;
    articles!: Table<Article>;
    settings!: Table<{ key: string; value: any }>;

    constructor() {
        super('RssReaderDB');
        this.version(1).stores({
            feeds: 'id, url, categoryId',
            articles: 'id, feedId, isRead, isSaved, publishedAt',
            settings: 'key',
        });
    }
}

export const db = new AppDatabase();
