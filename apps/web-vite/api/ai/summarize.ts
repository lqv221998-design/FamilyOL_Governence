import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Missing content' });
        }

        const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';

        // Check if Ollama is running
        try {
            await fetch(`${OLLAMA_URL}/api/tags`);
        } catch {
            return res.status(503).json({ error: 'Ollama is not running. Please start Ollama locally.' });
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
                model: 'llama3.1', // Or 'qwen2.5'
                prompt: prompt,
                stream: true,
            }),
        });

        if (!response.ok || !response.body) {
            throw new Error('Failed to communicate with Ollama');
        }

        // Stream the response
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    try {
                        const json = JSON.parse(line);
                        if (json.response) {
                            res.write(json.response);
                        }
                        if (json.done) {
                            res.end();
                            return;
                        }
                    } catch (e) {
                        // Ignore partial JSON
                    }
                }
            }
        } finally {
            reader.releaseLock();
            res.end();
        }

    } catch (error: any) {
        console.error('AI Error:', error);
        res.status(500).json({ error: error.message });
    }
}
