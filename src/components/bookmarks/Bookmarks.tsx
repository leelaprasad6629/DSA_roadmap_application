import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { Bookmark, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { phases } from '@/data/phases';
import { problems as problemsData } from '@/data/problems';
export default function Bookmarks() {
  const bookmarks = useStore((s) => s.progress.bookmarks);
  const removeBookmark = useStore((s) => s.removeBookmark);
  const bookmarkedProblems = useStore((s) => s.progress.bookmarkedProblems);
  const navigate = useNavigate();

  const problemBookmarks = bookmarkedProblems.map((id) => problemsData.find((p) => p.id === id)).filter(Boolean);
  const topicBookmarks = phases.flatMap((p) => p.topics.filter((t) => bookmarks.some((b) => b.type === 'topic' && b.refId === t.id)).map((t) => ({ ...t, phaseId: p.id })));

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Bookmarks</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Your saved topics and problems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Bookmark size={18} className="text-primary-500" /> Bookmarked Problems ({problemBookmarks.length})</h3>
          <div className="space-y-2">
            {problemBookmarks.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer" onClick={() => navigate(`/problems/${p.id}`)}>
                <span className="text-sm">#{p.number} {p.name}</span>
                <button onClick={(e) => { e.stopPropagation(); useStore.getState().toggleBookmarkProblem(p.id); }}>
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            ))}
            {problemBookmarks.length === 0 && <p className="text-xs text-slate-400 text-center py-2">No bookmarked problems</p>}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Bookmark size={18} className="text-primary-500" /> Bookmarked Topics ({topicBookmarks.length})</h3>
          <div className="space-y-2">
            {topicBookmarks.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 cursor-pointer" onClick={() => navigate(`/roadmap/phase/${t.phaseId}/topic/${t.id}`)}>
                <span className="text-sm">{t.name}</span>
              </div>
            ))}
            {topicBookmarks.length === 0 && <p className="text-xs text-slate-400 text-center py-2">No bookmarked topics</p>}
          </div>
        </Card>
      </div>

      {bookmarks.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-3">All Bookmarks</h3>
          <div className="space-y-2">
            {bookmarks.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm">{b.label} <span className="text-xs text-slate-400">({b.type})</span></span>
                <button onClick={() => removeBookmark(b.id)}><Trash2 size={14} className="text-red-400" /></button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
