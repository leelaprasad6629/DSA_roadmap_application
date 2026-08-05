import { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { generateRoadmap } from '@/lib/roadmapGenerator';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, BookOpen, Code2, RotateCcw, StickyNote } from 'lucide-react';

export default function DailyPlanner() {
  const config = useStore((s) => s.roadmapConfig);
  const progress = useStore((s) => s.progress);
  const setCurrentDay = useStore((s) => s.setCurrentDay);
  const updateDailyStreak = useStore((s) => s.updateDailyStreak);
  const recordStudyDay = useStore((s) => s.recordStudyDay);
  const [currentDayIdx, setCurrentDayIdx] = useState(progress.currentDay - 1);

  const roadmap = useMemo(() => generateRoadmap(config), [config]);
  const day = roadmap.days[currentDayIdx];

  if (!day) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">No plan generated yet</h1>
        <p className="text-slate-500">Adjust your roadmap configuration to generate a plan.</p>
      </div>
    );
  }

  const handleCompleteDay = () => {
    updateDailyStreak();
    recordStudyDay(day.date);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Daily Planner</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Day {day.day} • {day.date}</p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={currentDayIdx === 0}
            onClick={() => setCurrentDayIdx(currentDayIdx - 1)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            disabled={currentDayIdx === roadmap.days.length - 1}
            onClick={() => { setCurrentDayIdx(currentDayIdx + 1); setCurrentDay(currentDayIdx + 2); }}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-3"><BookOpen size={18} className="text-primary-500" /><h3 className="font-semibold">Topics to Learn</h3></div>
          <ul className="space-y-2">
            {day.topics.map((t, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Circle size={16} className="text-slate-300" /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-400">Reading time: {day.readingTime}h</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3"><Code2 size={18} className="text-green-500" /><h3 className="font-semibold">Practice Problems</h3></div>
          <ul className="space-y-2">
            {day.practiceProblems.map((p, i) => (
              <li key={i} className="text-sm text-slate-600 dark:text-slate-300">{i + 1}. {p}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3"><RotateCcw size={18} className="text-yellow-500" /><h3 className="font-semibold">Revision Tasks</h3></div>
          {day.revisionTasks.length > 0 ? (
            <ul className="space-y-2">
              {day.revisionTasks.map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Circle size={16} className="text-slate-300" /> {r}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No revision due today 🎉</p>
          )}
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-3"><StickyNote size={18} className="text-slate-400" /><h3 className="font-semibold">Notes</h3></div>
        <textarea
          placeholder="Write your notes for today..."
          className="w-full min-h-[120px] p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
      </Card>

      <button
        onClick={handleCompleteDay}
        className="w-full py-3 rounded-xl gradient-bg text-white font-medium flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Mark Day as Complete
      </button>
    </div>
  );
}
