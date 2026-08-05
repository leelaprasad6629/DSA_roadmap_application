import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Search } from 'lucide-react';
import { phases } from '@/data/phases';
import { problems as problemsData } from '@/data/problems';
import { flashcards as flashcardsData } from '@/data/flashcards';
export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return { topics: [], problems: [], flashcards: [] };
    const q = query.toLowerCase();
    const topics = phases.flatMap((p) =>
      p.topics.filter((t) => t.name.toLowerCase().includes(q) || t.subtopics.some((s) => s.toLowerCase().includes(q)))
        .map((t) => ({ ...t, phaseId: p.id, type: 'topic' }))
    );
    const problems = problemsData.filter((p) =>
      p.name.toLowerCase().includes(q) || String(p.number).includes(q) || p.pattern.toLowerCase().includes(q) || p.tags.some((t: string) => t.toLowerCase().includes(q))
    ).map((p) => ({ ...p, type: 'problem' }));
    const flashcards = flashcardsData.filter((c) => c.front.toLowerCase().includes(q) || c.topic.toLowerCase().includes(q)).map((c) => ({ ...c, type: 'flashcard' }));
    return { topics, problems, flashcards };
  }, [query]);

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Search</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Find topics, problems, patterns, and more</p>
      </div>

      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-3">
        <Search size={20} className="text-slate-400" />
        <input
          type="text" placeholder="Search topics, problems, patterns, tags, LeetCode #..."
          value={query} onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-sm"
          autoFocus
        />
      </div>

      {query.trim() && (
        <div className="space-y-4">
          {results.topics.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Topics ({results.topics.length})</h3>
              {results.topics.slice(0, 10).map((t) => (
                <Card key={t.id} hover className="cursor-pointer mb-2" >
                  <div onClick={() => navigate(`/roadmap/phase/${t.phaseId}/topic/${t.id}`)}>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.difficulty} • Phase {t.phaseId}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {results.problems.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Problems ({results.problems.length})</h3>
              {results.problems.slice(0, 10).map((p) => (
                <Card key={p.id} hover className="cursor-pointer mb-2">
                  <div onClick={() => navigate(`/problems/${p.id}`)}>
                    <p className="font-medium">#{p.number} - {p.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{p.difficulty} • {p.topic} • {p.pattern}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {results.flashcards.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Flashcards ({results.flashcards.length})</h3>
              {results.flashcards.slice(0, 10).map((c) => (
                <Card key={c.id} hover className="cursor-pointer mb-2" >
                  <div onClick={() => navigate('/flashcards')}>
                    <p className="font-medium">{c.front}</p>
                    <p className="text-xs text-slate-400 mt-1">{c.topic} • {c.category}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {results.topics.length === 0 && results.problems.length === 0 && results.flashcards.length === 0 && (
            <p className="text-center text-slate-400 py-8">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}
