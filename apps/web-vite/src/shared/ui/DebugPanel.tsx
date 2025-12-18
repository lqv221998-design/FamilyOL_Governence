import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/shared/db/dexie';

export function DebugPanel() {
    const feedCount = useLiveQuery(() => db.feeds.count(), [], 0);
    const articleCount = useLiveQuery(() => db.articles.count(), [], 0);

    return (
        <div className="fixed bottom-20 left-5 p-2.5 bg-black/80 text-green-400 font-mono text-[10px] rounded z-[9999]">
            <h4 className="font-bold mb-1">Debug Info</h4>
            <p>Feeds: {feedCount}</p>
            <p>Articles: {articleCount}</p>
            <button 
                onClick={() => { db.delete(); window.location.reload(); }}
                className="mt-2 bg-red-700 text-white border-0 cursor-pointer px-2 py-1 rounded hover:bg-red-600"
            >
                Reset DB
            </button>
        </div>
    );
}
