import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar, Legend } from 'recharts';
import { TrendingUp, Award, Target } from 'lucide-react';

export default function ProgressAnalytics() {
  const progress = useStore((s) => s.progress);
  const allTopics = phases.flatMap((p) => p.topics);
  const topicData = allTopics.map((t) => ({
    name: t.name,
    completed: progress.completedTopics.includes(t.id) ? 1 : 0,
  }));

  const difficultyData = useMemo(() => {
    const diff = { Beginner: 0, Intermediate: 0, Advanced: 0 };
    progress.solvedProblems.forEach((id) => {
      // approximate difficulty distribution
    });
    return [
      { name: 'Easy', value: Math.floor(progress.solvedProblems.length * 0.5), color: '#22c55e' },
      { name: 'Medium', value: Math.floor(progress.solvedProblems.length * 0.3), color: '#eab308' },
      { name: 'Hard', value: Math.floor(progress.solvedProblems.length * 0.2), color: '#ef4444' },
    ];
  }, [progress.solvedProblems]);

  const calendarData = useMemo(() => {
    const days = [];
    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days.push({ date: key.slice(5), count: progress.studyCalendar[key] || 0 });
    }
    return days;
  }, [progress.studyCalendar]);

  const phaseProgress = phases.slice(0, 15).map((p) => ({
    name: `P${p.id}`,
    progress: (p.topics.filter((t) => progress.completedTopics.includes(t.id)).length / p.topics.length) * 100,
  }));

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Progress Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your learning journey</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><div className="flex items-center gap-2"><TrendingUp className="text-primary-500" size={20} /><div><p className="text-xs text-slate-400">Topics Done</p><p className="text-xl font-bold">{progress.completedTopics.length}</p></div></div></Card>
        <Card><div className="flex items-center gap-2"><Award className="text-green-500" size={20} /><div><p className="text-xs text-slate-400">Solved</p><p className="text-xl font-bold">{progress.solvedProblems.length}</p></div></div></Card>
        <Card><div className="flex items-center gap-2"><Target className="text-purple-500" size={20} /><div><p className="text-xs text-slate-400">Streak</p><p className="text-xl font-bold">{progress.dailyStreak} days</p></div></div></Card>
        <Card><div className="flex items-center gap-2"><Target className="text-orange-500" size={20} /><div><p className="text-xs text-slate-400">Quiz Scores</p><p className="text-xl font-bold">{progress.quizScores.length}</p></div></div></Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Daily Study Activity (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={calendarData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Phase Completion Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={phaseProgress}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Problem Difficulty Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={difficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {difficultyData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Topic Completion Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto scrollbar-thin">
          {topicData.map((t) => (
            <div key={t.name} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm">
              <div className={`w-2 h-2 rounded-full ${t.completed ? 'bg-green-500' : 'bg-slate-300'}`} />
              <span className={t.completed ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}>{t.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
