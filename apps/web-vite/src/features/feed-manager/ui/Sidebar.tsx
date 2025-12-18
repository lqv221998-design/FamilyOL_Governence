import { useState } from 'react';
import { useFeeds } from '../api/useFeeds';
import { AddFeedModal } from './AddFeedModal';
import { DailyBriefing } from '@/features/ai-briefing/ui/DailyBriefing';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
    onSelect: (id: string | undefined) => void;
    selectedId?: string;
}

export function Sidebar({ onSelect, selectedId }: SidebarProps) {
    const { feeds, removeFeed } = useFeeds();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <aside className="w-[280px] h-[calc(100vh-2rem)] m-4 p-6 flex flex-col gap-8 glass-panel">
            <div className="flex justify-between items-center">
                <h1 
                    onClick={() => onSelect(undefined)} 
                    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent cursor-pointer"
                >
                    RSS Reader
                </h1>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center cursor-pointer transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    aria-label="Add Feed"
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <h3 className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-4">Subscriptions</h3>
                {feeds.length === 0 ? (
                    <p className="text-sm text-[var(--text-secondary)] italic">No feeds yet.</p>
                ) : (
                    <ul className="space-y-1">
                        {feeds.map((feed) => (
                            <li
                                key={feed.id}
                                className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition-colors group ${selectedId === feed.id ? 'bg-[var(--bg-secondary)]' : 'hover:bg-[var(--bg-secondary)]'}`}
                                onClick={() => onSelect(feed.id)}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {feed.iconUrl ? (
                                        <img src={feed.iconUrl} alt="" className="w-5 h-5 rounded object-cover" />
                                    ) : (
                                        <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-[10px]">#</div>
                                    )}
                                    <span className={`text-sm truncate ${selectedId === feed.id ? 'text-blue-600 font-semibold' : ''}`}>
                                        {feed.title}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFeed(feed.id); }}
                                    className="opacity-0 group-hover:opacity-100 text-red-500 p-1 hover:bg-red-50 rounded"
                                    aria-label="Remove"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            <div className="mt-auto">
                <DailyBriefing />
            </div>

            <AddFeedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </aside>
    );
}
