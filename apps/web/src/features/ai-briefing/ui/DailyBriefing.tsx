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
        <button onClick={generateReport} className="btn-ai-generate">
            ✨ Daily Briefing
            <style jsx>{`
        .btn-ai-generate {
           width: 100%; padding: 0.75rem; 
           background: linear-gradient(135deg, var(--accent), #a855f7);
           color: white; border: none; border-radius: 8px;
           font-weight: 600; cursor: pointer;
           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
           transition: transform 0.2s;
        }
        .btn-ai-generate:hover { transform: translateY(-2px); }
       `}</style>
        </button>
    );

    return (
        <div className="briefing-panel glass-panel">
            <div className="briefing-header">
                <h3>Daily Briefing {loading && '...'}</h3>
                <button onClick={() => setIsOpen(false)} className="btn-close">Close</button>
            </div>
            <div className="briefing-content">
                {briefing ? (
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: briefing.replace(/\n/g, '<br/>') }} />
                    // Ideally render Markdown properly. For now, simple replace.
                ) : (
                    <p className="placeholder">Connecting to Ollama...</p>
                )}
            </div>

            <style jsx>{`
        .briefing-panel {
           position: fixed; bottom: 2rem; right: 2rem; width: 400px; height: 500px;
           display: flex; flex-direction: column;
           z-index: 100; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .briefing-header {
           padding: 1rem; border-bottom: 1px solid var(--glass-border);
           display: flex; justify-content: space-between; align-items: center;
        }
        .briefing-content {
           padding: 1rem; flex: 1; overflow-y: auto; font-size: 0.9rem; line-height: 1.6;
        }
        .btn-close { background: none; border: none; color: var(--text-secondary); cursor: pointer; }
       `}</style>
        </div>
    );
}
