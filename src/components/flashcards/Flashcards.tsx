import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, RotateCcw, Layers, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { flashcards as flashcardsData } from '@/data/flashcards';
export default function Flashcards() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filterTopic, setFilterTopic] = useState('All');
  const updateFlashcardProgress = useStore((s) => s.updateFlashcardProgress);

  const topics = useMemo(() => Array.from(new Set(flashcardsData.map((c) => c.topic))), []);
  const filtered = useMemo(() =>
    filterTopic === 'All' ? flashcardsData : flashcardsData.filter((c) => c.topic === filterTopic),
  [filterTopic]);

  const card = filtered[currentIdx];

  const next = () => { setFlipped(false); setCurrentIdx((currentIdx + 1) % filtered.length); };
  const prev = () => { setFlipped(false); setCurrentIdx((currentIdx - 1 + filtered.length) % filtered.length); };

  const rate = (rating: number) => {
    if (card) updateFlashcardProgress(card.id, rating);
    setTimeout(next, 300);
  };

  if (!card) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
        <p className="text-slate-500">Loading flashcards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Flashcards</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{filtered.length} cards • Card {currentIdx + 1}</p>
        </div>
        <select value={filterTopic} onChange={(e) => { setFilterTopic(e.target.value); setCurrentIdx(0); setFlipped(false); }} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm">
          <option value="All">All Topics</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex flex-col items-center">
        <div
          className="w-full max-w-2xl h-64 cursor-pointer perspective-1000"
          onClick={() => setFlipped(!flipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
            {/* Front */}
            <div className="absolute inset-0 glass-card flex flex-col items-center justify-center p-8" style={{ backfaceVisibility: 'hidden' }}>
              <div className="flex items-center gap-2 mb-4">
                <Layers size={20} className="text-primary-500" />
                <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">{card.category}</span>
              </div>
              <p className="text-2xl font-bold text-center">{card.front}</p>
              <p className="text-xs text-slate-400 mt-4">Click to flip</p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 glass-card flex flex-col items-center justify-center p-8 gradient-bg text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <p className="text-lg text-center leading-relaxed">{card.back}</p>
              <p className="text-xs opacity-70 mt-4">Click to flip back</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Button variant="secondary" onClick={prev}><ChevronLeft size={20} /></Button>
          <Button variant="ghost" onClick={() => setFlipped(!flipped)}><RotateCcw size={18} /> Flip</Button>
          <Button variant="secondary" onClick={next}><ChevronRight size={20} /></Button>
        </div>

        {flipped && (
          <div className="flex gap-3 mt-4 slide-up">
            <Button variant="danger" onClick={() => rate(0)}><span className="flex items-center gap-1"><ThumbsDown size={16} /> Again</span></Button>
            <Button variant="secondary" onClick={() => rate(1)}><span className="flex items-center gap-1"><ThumbsUp size={16} /> Got it</span></Button>
          </div>
        )}
      </div>
    </div>
  );
}
