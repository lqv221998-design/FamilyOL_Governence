import { useState, useRef } from 'react';
import { useArticles } from '@/features/news-feed/api/useArticles';

export function DailyBriefing() {
    const { articles } = useArticles();
    const [briefing, setBriefing] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const generateReport = async () => {
        if (articles.length === 0) return;

        setLoading(true);
        setBriefing('');
        setIsOpen(true);

        abortControllerRef.current = new AbortController();

        try {
            // Prepare content (Top 20 latest articles)
            const topArticles = articles.slice(0, 20).map(a => `- ${a.title}: ${a.snippet}`).join('\n');

            const response = await fetch('/api/ai/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: topArticles }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Server Error');
            }

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                setBriefing(prev => prev + chunk);
            }

        } catch (err: any) {
            if (err.name !== 'AbortError') {
                setBriefing(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen && !loading) return (
        <button 
            onClick={generateReport} 
            className="w-full p-3 rounded-lg bg-gradient-to-br from-blue-600 to-purple-500 text-white font-semibold cursor-pointer shadow-md transition-transform hover:-translate-y-0.5"
        >
            ✨ Daily Briefing
        </button>
    );

    return (
        <div className="fixed bottom-8 right-8 w-[400px] h-[500px] flex flex-col z-50 shadow-2xl glass-panel bg-white/90">
            <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center">
                <h3 className="font-semibold">Daily Briefing {loading && '...'}</h3>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                    Close
                </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto text-sm leading-relaxed">
                {briefing ? (
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: briefing.replace(/\n/g, '<br/>') }} />
                    // Ideally render Markdown properly. For now, simple replace.
                ) : (
                    <p className="text-[var(--text-secondary)] italic animate-pulse">Connecting to Ollama...</p>
                )}
            </div>
        </div>
    );
}
