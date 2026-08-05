import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Brain, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { quizQuestions as quizData } from '@/data/quizzes';
export default function QuizSystem() {
  const [filterTopic, setFilterTopic] = useState('All');
  const [quizActive, setQuizActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const addQuizScore = useStore((s) => s.addQuizScore);

  const topics = useMemo(() => Array.from(new Set(quizData.map((q) => q.topic))), []);
  const questions = useMemo(() =>
    (filterTopic === 'All' ? quizData : quizData.filter((q) => q.topic === filterTopic)).slice(0, 10),
  [filterTopic]);

  const startQuiz = () => { setQuizActive(true); setCurrentQ(0); setSelectedAns(null); setShowAnswer(false); setScore(0); setAnswers([]); };

  const handleAnswer = () => {
    if (selectedAns === null) return;
    const correct = selectedAns === questions[currentQ].correctAnswer;
    if (correct) setScore(score + 1);
    setAnswers([...answers, correct]);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedAns(null);
      setShowAnswer(false);
    } else {
      addQuizScore({ quizId: crypto.randomUUID(), topic: filterTopic, score, total: questions.length, date: new Date().toISOString() });
      setQuizActive(false);
    }
  };

  if (!quizActive) {
    return (
      <div className="space-y-6 fade-in">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Quiz System</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Test your DSA knowledge</p>
        </div>
        <Card>
          <div className="flex items-center gap-2 mb-4"><Brain size={18} className="text-primary-500" /><h3 className="font-semibold">Quiz Settings</h3></div>
          <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm mb-4">
            <option value="All">All Topics ({quizData.length} questions)</option>
            {topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <p className="text-sm text-slate-400 mb-4">10 questions per quiz • Multiple choice, code output, complexity, and debugging questions</p>
          <Button onClick={startQuiz}>Start Quiz</Button>
        </Card>
      </div>
    );
  }

  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Question {currentQ + 1} / {questions.length}</h1>
        <span className="text-sm px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">Score: {score}</span>
      </div>

      <div className="flex gap-1">
        {answers.map((a, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${a ? 'bg-green-500' : 'bg-red-500'}`} />
        ))}
      </div>

      <Card>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 mb-3 inline-block">{q.type}</span>
        <h3 className="text-lg font-semibold mb-4">{q.question}</h3>
        <div className="space-y-2">
          {q.options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => !showAnswer && setSelectedAns(i)}
              disabled={showAnswer}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                showAnswer && i === q.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                showAnswer && i === selectedAns ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                selectedAns === i ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' :
                'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
              {showAnswer && i === q.correctAnswer && <CheckCircle2 size={16} className="inline ml-2 text-green-500" />}
              {showAnswer && i === selectedAns && i !== q.correctAnswer && <XCircle size={16} className="inline ml-2 text-red-500" />}
            </button>
          ))}
        </div>

        {showAnswer && (
          <div className="mt-4 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 slide-up">
            <p className="text-sm font-medium mb-1">Explanation:</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{q.explanation}</p>
          </div>
        )}
      </Card>

      <div className="flex gap-3">
        {!showAnswer ? (
          <Button onClick={handleAnswer} disabled={selectedAns === null}>Submit Answer</Button>
        ) : (
          <Button onClick={nextQuestion}>{currentQ + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}</Button>
        )}
        <Button variant="ghost" onClick={() => setQuizActive(false)}><RotateCcw size={16} /> Exit</Button>
      </div>
    </div>
  );
}
