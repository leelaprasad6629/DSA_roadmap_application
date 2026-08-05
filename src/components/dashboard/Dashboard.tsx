import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { Card, StatCard } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Flame, Target, CheckCircle2, Circle, BookOpen, Code2, RotateCcw, TrendingUp, Calendar } from 'lucide-react';
import { useMemo } from 'react';

export default function Dashboard() {
  const progress = useStore((s) => s.progress);
  const { solvedProblems, completedTopics, completedPhases, dailyStreak } = progress;

  const allTopics = useMemo(() => phases.flatMap((p) => p.topics), []);
  const totalTopics = allTopics.length;
  const topicsRemaining = totalTopics - completedTopics.length;
  const totalPhases = phases.length;
  const currentPhase = phases.find((p) => p.id === progress.currentPhase) || phases[0];

  const overallProgress = (completedTopics.length / totalTopics) * 100;
  const phaseProgress = currentPhase
    ? (currentPhase.topics.filter((t) => completedTopics.includes(t.id)).length / currentPhase.topics.length) * 100
    : 0;

  const today = new Date().toISOString().split('T')[0];
  const studiedToday = progress.studyCalendar[today] || 0;
  const todayProblems = Object.values(progress.problemCompletionDates).filter(
    (d) => d.split('T')[0] === today
  ).length;

  const revisionDue = useMemo(() => {
    const now = new Date();
    return useStore.getState().revisionItems.filter((r) => new Date(r.nextReview) <= now).length;
  }, []);

  // Last 30 days for heatmap
  const last30Days = useMemo(() => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days.push({ date: key, count: progress.studyCalendar[key] || 0 });
    }
    return days;
  }, [progress.studyCalendar]);

  const maxCount = Math.max(...last30Days.map((d) => d.count), 1);

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your DSA mastery journey</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Daily Streak" value={`${dailyStreak} 🔥`} icon={Flame} color="orange" />
        <StatCard label="Topics Done" value={completedTopics.length} icon={CheckCircle2} color="green" subtitle={`of ${totalTopics}`} />
        <StatCard label="Topics Left" value={topicsRemaining} icon={Circle} color="blue" />
        <StatCard label="Problems Solved" value={solvedProblems.length} icon={Code2} color="purple" />
        <StatCard label="Current Phase" value={currentPhase?.id || 0} icon={BookOpen} color="indigo" subtitle={currentPhase?.name} />
        <StatCard label="Revision Due" value={revisionDue} icon={RotateCcw} color="red" />
      </div>

      {/* Progress rings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Overall Progress</h3>
            <ProgressRing progress={overallProgress} label="Complete" size={140} />
            <p className="mt-4 text-sm text-slate-500">{completedTopics.length} / {totalTopics} topics</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Current Phase</h3>
            <ProgressRing progress={phaseProgress} label={currentPhase?.name} size={140} />
            <p className="mt-4 text-sm text-slate-500">Phase {currentPhase?.id} of {totalPhases - 1}</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Daily Goal</h3>
            <ProgressRing progress={Math.min((todayProblems / progress.dailyGoal) * 100, 100)} label="Today" size={140} />
            <p className="mt-4 text-sm text-slate-500">{todayProblems} / {progress.dailyGoal} problems today</p>
          </div>
        </Card>
      </div>

      {/* Goals & Current status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Target size={18} /> Study Goals</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Daily Goal</span>
              <span className="font-semibold">{progress.dailyGoal} problems/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Weekly Goal</span>
              <span className="font-semibold">{progress.weeklyGoal} problems/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Monthly Goal</span>
              <span className="font-semibold">{progress.monthlyGoal} problems/month</span>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} /> Current Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Current Day</span>
              <span className="font-semibold">Day {progress.currentDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Phases Completed</span>
              <span className="font-semibold">{completedPhases.length} / {totalPhases - 1}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Problems Remaining</span>
              <span className="font-semibold">In progress</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Study Calendar / Heatmap */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar size={18} /> Study Activity (Last 30 Days)</h3>
        <div className="grid grid-cols-15 gap-1.5" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
          {last30Days.map((d) => {
            const intensity = d.count === 0 ? 0 : Math.ceil((d.count / maxCount) * 4);
            return (
              <div
                key={d.date}
                className={`aspect-square rounded heatmap-color-${intensity} border border-slate-200 dark:border-slate-700`}
                title={`${d.date}: ${d.count} sessions`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-1 mt-3 text-xs text-slate-400">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-3 h-3 rounded heatmap-color-${i} border border-slate-200 dark:border-slate-700`} />
          ))}
          <span>More</span>
        </div>
      </Card>
    </div>
  );
}
