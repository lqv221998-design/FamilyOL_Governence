import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import DOMPurify from 'isomorphic-dompurify';

export const dynamic = 'force-dynamic'; // Always fetch fresh data

const parser = new Parser({
    timeout: 5000,
    headers: {
        'User-Agent': 'LocalRSSReader/1.0 (Portfolio Project)',
    },
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }

    try {
        const feed = await parser.parseURL(url);

        // Sanitize and normalize data
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

        return NextResponse.json(cleanFeed);
    } catch (error: any) {
        console.error('RSS Fetch Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feed', details: error.message },
            { status: 500 }
        );
    }
}
