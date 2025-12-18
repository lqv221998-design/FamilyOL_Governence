import { useState } from 'react';
import { useFeeds } from '../api/useFeeds';
// Using Tailwind/Headless approach or Custom CSS as per plan (Vanilla CSS).
// Plan said Vanilla CSS. Let's build a simple custom Modal.

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
        <div className="modal-overlay">
            <div className="glass-panel modal-content">
                <h2>Add New Feed</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="url"
                        placeholder="https://example.com/rss"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="input-field"
                    />
                    {error && <p className="error-text">{error}</p>}
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Adding...' : 'Add Feed'}
                        </button>
                    </div>
                </form>
            </div>
            <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 50;
        }
        .modal-content {
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .input-field {
          width: 100%; padding: 0.75rem;
          border-radius: 8px; border: 1px solid var(--border);
          background: var(--bg-secondary); color: var(--text-primary);
        }
        .modal-actions { display: flex; gap: 1rem; justify-content: flex-end; }
        .btn-primary {
          background: var(--accent); color: white; border: none; padding: 0.5rem 1rem;
          border-radius: 6px; cursor: pointer;
        }
        .btn-secondary {
          background: transparent; color: var(--text-secondary); border: 1px solid var(--border);
          padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;
        }
        .error-text { color: #ef4444; font-size: 0.875rem; }
      `}</style>
        </div>
    );
}
