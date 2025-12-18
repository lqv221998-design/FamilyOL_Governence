import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/shared/db/dexie';

export function DebugPanel() {
    const feedCount = useLiveQuery(() => db.feeds.count(), [], 0);
    const articleCount = useLiveQuery(() => db.articles.count(), [], 0);

    return (
        <div className="debug-panel">
            <h4>Debug Info</h4>
            <p>Feeds: {feedCount}</p>
            <p>Articles: {articleCount}</p>
            <button onClick={() => { db.delete(); window.location.reload(); }}>Reset DB</button>
            <style jsx>{`
                .debug-panel {
                    position: fixed; bottom: 80px; left: 20px;
                    padding: 10px; background: rgba(0,0,0,0.8);
                    color: #0f0; font-family: monospace; font-size: 10px;
                    border-radius: 4px; z-index: 9999;
                }
                .debug-panel button { background: #d00; color: #fff; border: 0; cursor: pointer; }
            `}</style>
        </div>
    );
}
