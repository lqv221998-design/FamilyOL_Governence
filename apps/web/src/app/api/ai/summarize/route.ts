import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { content } = await req.json();

        if (!content) {
            return NextResponse.json({ error: 'Missing content' }, { status: 400 });
        }

        const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';

        // Check if Ollama is running
        try {
            await fetch(`${OLLAMA_URL}/api/tags`);
        } catch {
            return NextResponse.json(
                { error: 'Ollama is not running. Please start Ollama locally.' },
                { status: 503 }
            );
        }

        const prompt = `
You are a professional news editor. Summarize the following news articles into a concise "Daily Briefing" report.
Focus on the most important facts. Use bullet points. Use Markdown.
Language: Vietnamese (Tiếng Việt).

Articles:
${content}
    `;

        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.1', // Or 'qwen2.5', user can configure
                prompt: prompt,
                stream: true,
            }),
        });

        if (!response.ok || !response.body) {
            throw new Error('Failed to communicate with Ollama');
        }

        // Stream the response from Ollama back to the client
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body!.getReader();
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        // Ollama sends JSON objects in chunks. We need to parse them.
                        // But simple proxying might be easier if client handles parsing.
                        // Let's parse here to send clean text chunks.
                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n').filter(line => line.trim() !== '');

                        for (const line of lines) {
                            try {
                                const json = JSON.parse(line);
                                if (json.response) {
                                    controller.enqueue(encoder.encode(json.response));
                                }
                                if (json.done) {
                                    controller.close();
                                    return;
                                }
                            } catch (e) {
                                // Ignore partial JSON parse errors
                            }
                        }
                    }
                } finally {
                    reader.releaseLock();
                }
            },
        });

        return new NextResponse(stream);

    } catch (error: any) {
        console.error('AI Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
