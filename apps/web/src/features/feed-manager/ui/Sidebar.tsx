import { useState } from 'react';
import { useFeeds } from '../api/useFeeds';
import { AddFeedModal } from './AddFeedModal';
import { DailyBriefing } from '@/features/ai-briefing/ui/DailyBriefing';
import { PlusIcon, RssIcon, TrashIcon } from '@heroicons/react/24/outline'; // Check import path for v2

export function Sidebar() {
    const { feeds, removeFeed } = useFeeds();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <h1>RSS Reader</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn-icon" aria-label="Add Feed">
                    <PlusIcon className="icon" />
                </button>
            </div>

            <nav className="feed-list">
                <h3>Subscriptions</h3>
                {feeds.length === 0 ? (
                    <p className="empty-state">No feeds yet.</p>
                ) : (
                    <ul>
                        {feeds.map((feed) => (
                            <li key={feed.id} className="feed-item">
                                <div className="feed-info">
                                    {feed.iconUrl ? (
                                        <img src={feed.iconUrl} alt="" className="feed-icon" />
                                    ) : (
                                        <RssIcon className="feed-icon-placeholder" />
                                    )}
                                    <span className="feed-title">{feed.title}</span>
                                </div>
                                <button
                                    onClick={() => removeFeed(feed.id)}
                                    className="btn-delete"
                                    aria-label="Remove"
                                >
                                    <TrashIcon className="icon-sm" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            <div className="sidebar-footer">
                <DailyBriefing />
            </div>

            <AddFeedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <style jsx>{`
        .sidebar-footer { margin-top: auto; }
        .sidebar {
          width: 280px;
          height: calc(100vh - 2rem);
          margin: 1rem;
          padding: 1.5rem;
          display: flex; flex-direction: column; gap: 2rem;
        }
        .sidebar-header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .sidebar-header h1 {
          font-size: 1.25rem; font-weight: 700; background: linear-gradient(to right, var(--accent), #a855f7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .btn-icon {
          background: var(--bg-secondary); border: 1px solid var(--border);
          border-radius: 50%; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-icon:hover { background: var(--accent); color: white; border-color: var(--accent); }
        .icon { width: 20px; height: 20px; }
        .icon-sm { width: 16px; height: 16px; }

        .feed-list h3 {
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--text-secondary); margin-bottom: 1rem;
        }
        .feed-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.5rem; border-radius: 6px; cursor: pointer;
          transition: background 0.2s;
        }
        .feed-item:hover { background: var(--bg-secondary); }
        .feed-info { display: flex; align-items: center; gap: 0.75rem; overflow: hidden; }
        .feed-icon { width: 20px; height: 20px; border-radius: 4px; object-fit: cover; }
        .feed-icon-placeholder { width: 20px; height: 20px; color: var(--text-secondary); }
        .feed-title { font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .btn-delete {
          opacity: 0; background: none; border: none; color: #ef4444; cursor: pointer;
        }
        .feed-item:hover .btn-delete { opacity: 1; }
        .empty-state { font-size: 0.875rem; color: var(--text-secondary); font-style: italic; }
      `}</style>
        </aside>
    );
}
