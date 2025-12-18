import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';
import DOMPurify from 'isomorphic-dompurify';

const parser = new Parser({
    timeout: 5000,
    headers: {
        'User-Agent': 'LocalRSSReader/1.0 (Portfolio Project)',
    },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
        const feed = await parser.parseURL(url);

        // Sanitize and normalize data
        console.log(`[API] Fetched ${feed.items?.length || 0} items from ${url}`);

        const cleanFeed = {
            ...feed,
            title: feed.title || 'Untitled Feed',
            description: feed.description || '',
            items: feed.items.map((item) => ({
                ...item,
                title: item.title || 'No Title',
                content: DOMPurify.sanitize(item.content || item['content:encoded'] || item.summary || ''),
                snippet: DOMPurify.sanitize(item.contentSnippet || item.summary || '', { ALLOWED_TAGS: [] }).slice(0, 200),
            })),
        };

        return res.status(200).json(cleanFeed);
    } catch (error: any) {
        console.error('RSS Fetch Error:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch RSS feed', 
            details: error.message 
        });
    }
}
