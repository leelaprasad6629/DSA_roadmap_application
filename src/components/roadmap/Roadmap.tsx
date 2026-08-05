import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { phases } from '@/data/phases';
import { Card } from '@/components/ui/Card';
import { ChevronDown, ChevronUp, Lock, CheckCircle2, Clock, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlannerConfig from './PlannerConfig';

export default function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [showConfig, setShowConfig] = useState(false);
  const completedTopics = useStore((s) => s.progress.completedTopics);
  const completedPhases = useStore((s) => s.progress.completedPhases);
  const toggleTopicComplete = useStore((s) => s.toggleTopicComplete);
  const togglePhaseComplete = useStore((s) => s.togglePhaseComplete);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Learning Roadmap</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{phases.length} phases from beginner to advanced</p>
        </div>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
        >
          <Settings size={16} /> Customize
        </button>
      </div>

      {showConfig && <PlannerConfig />}

      {/* Timeline view */}
      <div className="relative">
        {phases.map((phase, idx) => {
          const isExpanded = expandedPhase === phase.id;
          const phaseComplete = completedPhases.includes(phase.id);
          const phaseTopicsDone = phase.topics.filter((t) => completedTopics.includes(t.id)).length;
          const phaseProgress = (phaseTopicsDone / phase.topics.length) * 100;

          return (
            <div key={phase.id} className="relative pl-8 pb-6">
              {/* Timeline line */}
              {idx < phases.length - 1 && (
                <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
              )}
              {/* Timeline dot */}
              <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                phaseComplete ? 'bg-green-500 border-green-500' : phaseProgress > 0 ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-600'
              }`}>
                {phaseComplete ? <CheckCircle2 size={14} className="text-white" /> : (
                  <span className="text-xs font-bold text-slate-500">{phase.id}</span>
                )}
              </div>

              <Card>
                <div
                  className="cursor-pointer"
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">Phase {phase.id}: {phase.name}</h3>
                        {phaseComplete && <CheckCircle2 size={18} className="text-green-500" />}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{phase.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={12} /> {phase.estimatedDuration} days</span>
                        <span>{phase.topics.length} topics</span>
                        <span>{phaseTopicsDone} completed</span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full gradient-bg rounded-full transition-all duration-500" style={{ width: `${phaseProgress}%` }} />
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-3 slide-up">
                    {/* Phase details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Prerequisites</h4>
                        <ul className="space-y-1 text-slate-500 dark:text-slate-400">
                          {phase.prerequisites.map((p, i) => <li key={i} className="flex items-center gap-1"><Lock size={10} /> {p}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Learning Objectives</h4>
                        <ul className="space-y-1 text-slate-500 dark:text-slate-400">
                          {phase.learningObjectives.map((o, i) => <li key={i}>• {o}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="space-y-2 mt-3">
                      <h4 className="font-semibold">Topics</h4>
                      {phase.topics.map((topic) => {
                        const done = completedTopics.includes(topic.id);
                        return (
                          <div key={topic.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleTopicComplete(topic.id); }}
                              className="flex-shrink-0"
                            >
                              {done ? <CheckCircle2 size={20} className="text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />}
                            </button>
                            <div
                              className="flex-1 cursor-pointer"
                              onClick={() => navigate(`/roadmap/phase/${phase.id}/topic/${topic.id}`)}
                            >
                              <span className="font-medium">{topic.name}</span>
                              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>{topic.difficulty}</span>
                            </div>
                            <span className="text-xs text-slate-400">{topic.estimatedHours}h</span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => togglePhaseComplete(phase.id)}
                      className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-2"
                    >
                      {phaseComplete ? 'Mark as incomplete' : 'Mark phase as complete'}
                    </button>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
