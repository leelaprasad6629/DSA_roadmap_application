import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Bookmark, Edit3, Download, Code2 } from 'lucide-react';

export default function NotesSystem() {
  const notes = useStore((s) => s.progress.notes);
  const addNote = useStore((s) => s.addNote);
  const updateNote = useStore((s) => s.updateNote);
  const deleteNote = useStore((s) => s.deleteNote);
  const toggleNoteBookmark = useStore((s) => s.toggleNoteBookmark);

  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    if (editing) {
      updateNote(editing, { title, content, codeSnippets: codeSnippet ? [...notes.find(n => n.id === editing)?.codeSnippets || [], codeSnippet] : [] });
      setCodeSnippet('');
      setShowCode(false);
    } else {
      addNote({ title, content, codeSnippets: codeSnippet ? [codeSnippet] : [], bookmarked: false });
      setCodeSnippet('');
      setShowCode(false);
    }
    setTitle('');
    setContent('');
    setEditing(null);
  };

  const exportNote = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;
    const text = `# ${note.title}\n\n${note.content}\n\n${note.codeSnippets.map((c, i) => `## Code Snippet ${i + 1}\n\`\`\`\n${c}\n\`\`\``).join('\n\n')}`;
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || 'note'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Notes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Create and manage your study notes</p>
        </div>
        <Button onClick={() => { setEditing(null); setTitle(''); setContent(''); }}>
          <span className="flex items-center gap-1"><Plus size={16} /> New Note</span>
        </Button>
      </div>

      {(editing !== null || title || content) && (
        <Card className="slide-up">
          <input
            type="text" placeholder="Note title..."
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
          />
          <textarea
            placeholder="Write your notes..."
            value={content} onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[150px] px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          {showCode && (
            <textarea
              placeholder="Paste code snippet..."
              value={codeSnippet} onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full mt-2 min-h-[100px] px-3 py-2 rounded-xl bg-slate-900 text-slate-300 font-mono text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="ghost" onClick={() => setShowCode(!showCode)}>
              <span className="flex items-center gap-1"><Code2 size={14} /> {showCode ? 'Hide' : 'Add'} Code</span>
            </Button>
            <Button size="sm" onClick={handleSave}>{editing ? 'Update' : 'Save'} Note</Button>
            <Button size="sm" variant="ghost" onClick={() => { setEditing(null); setTitle(''); setContent(''); setCodeSnippet(''); }}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No notes yet. Create your first note!</p>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{note.title || 'Untitled'}</h3>
                    {note.bookmarked && <Bookmark size={14} className="text-primary-500 fill-primary-500" />}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{note.content.substring(0, 200)}{note.content.length > 200 ? '...' : ''}</p>
                  {note.codeSnippets && note.codeSnippets.length > 0 && (
                    <p className="text-xs text-slate-400 mt-1">{note.codeSnippets.length} code snippet(s)</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleNoteBookmark(note.id)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Bookmark size={16} className={note.bookmarked ? 'text-primary-500 fill-primary-500' : 'text-slate-400'} />
                  </button>
                  <button onClick={() => { setEditing(note.id); setTitle(note.title); setContent(note.content); }} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Edit3 size={16} className="text-slate-400" />
                  </button>
                  <button onClick={() => exportNote(note.id)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Download size={16} className="text-slate-400" />
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20">
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
