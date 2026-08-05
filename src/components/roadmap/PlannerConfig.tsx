import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';

export default function PlannerConfig() {
  const config = useStore((s) => s.roadmapConfig);
  const setConfig = useStore((s) => s.setRoadmapConfig);

  return (
    <Card className="slide-up">
      <h3 className="font-semibold mb-4">Roadmap Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">Start Date</label>
          <input
            type="date"
            value={config.startDate}
            onChange={(e) => setConfig({ startDate: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">Target Date</label>
          <input
            type="date"
            value={config.targetDate}
            onChange={(e) => setConfig({ targetDate: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">Hours Per Day: {config.hoursPerDay}</label>
          <input
            type="range" min="1" max="10" value={config.hoursPerDay}
            onChange={(e) => setConfig({ hoursPerDay: parseInt(e.target.value) })}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">Days Per Week: {config.daysPerWeek}</label>
          <input
            type="range" min="1" max="7" value={config.daysPerWeek}
            onChange={(e) => setConfig({ daysPerWeek: parseInt(e.target.value) })}
            className="w-full mt-2"
          />
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3">The roadmap will automatically adjust based on these settings.</p>
    </Card>
  );
}
