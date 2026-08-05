import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import LanguageSelector from '@/components/topic/LanguageSelector';
import { ArrowLeft, Lightbulb, ExternalLink, CheckCircle2, RotateCcw, X, Bookmark } from 'lucide-react';
import { useState } from 'react';

let problemsData: any[] = [];
try { problemsData = require('@/data/problems').problems; } catch {}

export default function ProblemDetail() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const selectedLanguage = useStore((s) => s.selectedLanguage);
  const setProblemStatus = useStore((s) => s.setProblemStatus);
  const toggleBookmark = useStore((s) => s.toggleBookmarkProblem);
  const bookmarkedProblems = useStore((s) => s.progress.bookmarkedProblems);
  const solvedProblems = useStore((s) => s.progress.solvedProblems);
  const [showHint, setShowHint] = useState(0);

  const problem = problemsData.find((p) => p.id === problemId);

  if (!problem) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Problem not found</p>
        <Button onClick={() => navigate('/problems')} className="mt-4">Back to Problems</Button>
      </div>
    );
  }

  const isSolved = solvedProblems.includes(problem.id);
  const isBookmarked = bookmarkedProblems.includes(problem.id);

  return (
    <div className="space-y-6 fade-in">
      <button onClick={() => navigate('/problems')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary-500">
        <ArrowLeft size={16} /> Back to Problems
      </button>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">#{problem.number}</span>
            <h1 className="text-2xl font-bold">{problem.name}</h1>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className={`px-2 py-1 rounded-full ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{problem.difficulty}</span>
            <span className="text-slate-400">{problem.topic}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">{problem.pattern}</span>
            {problem.isPremium && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Premium</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toggleBookmark(problem.id)}>
            <Bookmark size={20} className={isBookmarked ? 'fill-primary-500 text-primary-500' : 'text-slate-400'} />
          </button>
          <a href={problem.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <ExternalLink size={20} className="text-slate-400" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card><p className="text-sm text-slate-500">Time Complexity</p><p className="font-bold mt-1 text-primary-500">{problem.timeComplexity}</p></Card>
        <Card><p className="text-sm text-slate-500">Space Complexity</p><p className="font-bold mt-1 text-primary-500">{problem.spaceComplexity}</p></Card>
        <Card>
          <p className="text-sm text-slate-500">Status</p>
          <p className="font-bold mt-1">{isSolved ? '✓ Solved' : 'Not Solved'}</p>
        </Card>
      </div>

      {problem.prerequisites && problem.prerequisites.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-2">Prerequisites</h3>
          <div className="flex flex-wrap gap-2">
            {problem.prerequisites.map((p: string) => <span key={p} className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{p}</span>)}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="font-semibold mb-2">Optimal Approach</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{problem.optimalApproach}</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2"><Lightbulb size={18} className="text-yellow-500" /> Hints</h3>
          <div className="flex gap-1">
            {problem.hints && problem.hints.map((_: any, i: number) => (
              <button key={i} onClick={() => setShowHint(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium ${showHint === i + 1 ? 'gradient-bg text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        {showHint > 0 && problem.hints && problem.hints[showHint - 1] && (
          <p className="text-slate-600 dark:text-slate-300 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 slide-up">{problem.hints[showHint - 1]}</p>
        )}
      </Card>

      {problem.similarProblems && problem.similarProblems.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-2">Similar Problems</h3>
          <div className="flex flex-wrap gap-2">
            {problem.similarProblems.map((s: string) => <span key={s} className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{s}</span>)}
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Solution</h3>
          <LanguageSelector />
        </div>
        {problem.solutions && problem.solutions[selectedLanguage] ? (
          <div className="code-block">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-slate-400">{selectedLanguage}</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto">{problem.solutions[selectedLanguage]}</pre>
          </div>
        ) : (
          <div className="code-block"><pre className="text-slate-400">// Solution for {selectedLanguage} coming soon</pre></div>
        )}
      </Card>

      <div className="flex gap-3 flex-wrap">
        <Button variant={isSolved ? 'secondary' : 'primary'} onClick={() => setProblemStatus(problem.id, 'solved')}>
          <span className="flex items-center gap-2"><CheckCircle2 size={18} /> {isSolved ? 'Solved' : 'Mark as Solved'}</span>
        </Button>
        <Button variant="secondary" onClick={() => setProblemStatus(problem.id, 'attempted')}>Mark Attempted</Button>
        <Button variant="secondary" onClick={() => setProblemStatus(problem.id, 'needsRevision')}><span className="flex items-center gap-2"><RotateCcw size={18} /> Needs Revision</span></Button>
        <Button variant="danger" onClick={() => setProblemStatus(problem.id, 'wrongAttempt')}><span className="flex items-center gap-2"><X size={18} /> Wrong Attempt</span></Button>
      </div>
    </div>
  );
}
