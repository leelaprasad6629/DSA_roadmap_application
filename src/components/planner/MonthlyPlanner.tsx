import { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { generateRoadmap } from '@/lib/roadmapGenerator';
import { Card } from '@/components/ui/Card';
import { BookOpen, Target, RotateCcw, TrendingUp } from 'lucide-react';

export default function MonthlyPlanner() {
  const config = useStore((s) => s.roadmapConfig);
  const roadmap = useMemo(() => generateRoadmap(config), [config]);

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Monthly Planner</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{roadmap.months.length} months in your plan</p>
      </div>

      <div className="space-y-4">
        {roadmap.months.map((month) => (
          <Card key={month.month}>
            <h3 className="font-bold text-lg mb-3">Month {month.month}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2"><BookOpen size={16} className="text-primary-500" /><h4 className="text-sm font-medium">Topics Covered</h4></div>
                <div className="flex flex-wrap gap-1.5">
                  {month.topicsCovered.map((t, i) => <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">{t}</span>)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2"><Target size={16} className="text-green-500" /><h4 className="text-sm font-medium">Total Problems Target: {month.totalProblemsTarget}</h4></div>
                <div className="flex items-center gap-2 mb-2 mt-2"><RotateCcw size={16} className="text-yellow-500" /><h4 className="text-sm font-medium">Revision Schedule</h4></div>
                <div className="flex flex-wrap gap-1.5">
                  {month.revisionSchedule.map((r, i) => <span key={i} className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">{r}</span>)}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary-500" />
              <span className="text-sm">Overall Progress: {month.overallProgress}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
