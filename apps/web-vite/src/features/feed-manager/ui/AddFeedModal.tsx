import { useState } from 'react';
import { useFeeds } from '../api/useFeeds';

export function AddFeedModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { addFeed } = useFeeds();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await addFeed(url);
            setUrl('');
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to add feed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[400px] glass-panel bg-white p-8 flex flex-col gap-4 shadow-2xl">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Add New Feed</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="url"
                        placeholder="https://example.com/rss"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-end gap-3 mt-2">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
                        >
                            {loading ? 'Adding...' : 'Add Feed'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
