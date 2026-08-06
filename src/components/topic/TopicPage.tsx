import { useParams, useNavigate } from 'react-router-dom';
import { phases } from '@/data/phases';
import { problems as problemsData, getProblemsByTopicId } from '@/data/problems';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import LanguageSelector from './LanguageSelector';
import CodeBlock from './CodeBlock';
import { useStore } from '@/store/useStore';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, BookOpen, Clock, ChevronRight, ExternalLink, Code2 } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function TopicPage() {
  const { phaseId, topicId } = useParams();
  const navigate = useNavigate();
  const completedTopics = useStore((s) => s.progress.completedTopics);
  const toggleTopicComplete = useStore((s) => s.toggleTopicComplete);
  const addRevisionItem = useStore((s) => s.addRevisionItem);
  const [showCode, setShowCode] = useState(false);

  const phase = phases.find((p) => p.id === parseInt(phaseId || '0'));
  const topic = phase?.topics.find((t) => t.id === topicId);

  const topicProblems = useMemo(() => getProblemsByTopicId(topicId || ''), [topicId]);

  // Group problems by subtopic
  const problemsBySubtopic = useMemo(() => {
    const map = new Map<string, typeof problemsData>();
    for (const p of topicProblems) {
      const key = p.subtopic || 'General';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return map;
  }, [topicProblems]);

  if (!phase || !topic) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Topic not found</p>
        <Button onClick={() => navigate('/roadmap')} className="mt-4">Back to Roadmap</Button>
      </div>
    );
  }

  const isComplete = completedTopics.includes(topic.id);
  const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="space-y-6 fade-in">
      <button onClick={() => navigate('/roadmap')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary-500">
        <ArrowLeft size={16} /> Back to Roadmap
      </button>

      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Phase {phase.id}</span>
          <ChevronRight size={14} />
          <span>{phase.name}</span>
          <ChevronRight size={14} />
          <span className="text-primary-500">{topic.name}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          <span className={`text-sm px-3 py-1 rounded-full ${
            topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>{topic.difficulty}</span>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-4">
          <Clock size={18} className="text-slate-400" />
          <span className="text-sm text-slate-500">Estimated study time: {topic.estimatedHours} hours</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold">Subtopics:</h3>
          {topic.subtopics.map((s, i) => {
            const hasProblems = problemsBySubtopic.has(s);
            return (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  hasProblems
                    ? 'bg-primary-200 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 hover:bg-primary-300 dark:hover:bg-primary-800'
                    : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                }`}
                title={hasProblems ? `${problemsBySubtopic.get(s)!.length} practice problems` : ''}
              >
                {hasProblems && <Code2 size={10} className="inline mr-1" />}
                {s}
              </span>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><BookOpen size={18} /> Concept Explanation</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{topic.theory}</p>
      </Card>

      {topic.complexity && (
        <Card>
          <h3 className="font-semibold mb-3">Complexity Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm text-slate-500">Time Complexity</p>
              <p className="text-xl font-bold mt-1 text-primary-600 dark:text-primary-400">{topic.complexity.time}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm text-slate-500">Space Complexity</p>
              <p className="text-xl font-bold mt-1 text-primary-600 dark:text-primary-400">{topic.complexity.space}</p>
            </div>
          </div>
        </Card>
      )}

      {topic.pseudocode && (
        <Card>
          <h3 className="font-semibold mb-3">Pseudocode</h3>
          <div className="code-block">
            <pre className="text-slate-300">{topic.pseudocode}</pre>
          </div>
        </Card>
      )}

      {topic.dryRun && (
        <Card>
          <h3 className="font-semibold mb-3">Dry Run Example</h3>
          <div className="code-block">
            <pre className="text-slate-300">{topic.dryRun}</pre>
          </div>
        </Card>
      )}

      {topic.edgeCases && topic.edgeCases.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><AlertTriangle size={18} className="text-yellow-500" /> Edge Cases</h3>
          <ul className="space-y-2">
            {topic.edgeCases.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="text-yellow-500 mt-0.5">⚠</span> {e}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500" /> Common Mistakes</h3>
        <ul className="space-y-2">
          {topic.commonMistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="text-red-500 mt-0.5">✗</span> {m}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Lightbulb size={18} className="text-yellow-500" /> Best Practices</h3>
        <ul className="space-y-2">
          {topic.bestPractices.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="text-green-500 mt-0.5">✓</span> {b}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3">Revision Checklist</h3>
        <ul className="space-y-2">
          {topic.revisionChecklist.map((c, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-600" />
              {c}
            </li>
          ))}
        </ul>
      </Card>

      {/* Practice Problems mapped to subtopics */}
      {topicProblems.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Code2 size={18} className="text-primary-500" /> Practice Problems for Subtopics</h3>
          <div className="space-y-5">
            {topic.subtopics.map((subtopic, si) => {
              const subProblems = problemsBySubtopic.get(subtopic) || [];
              if (subProblems.length === 0) return null;
              return (
                <div key={si}>
                  <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2 flex items-center gap-1">
                    {subtopic}
                    <span className="text-xs text-slate-400 font-normal">({subProblems.length})</span>
                  </h4>
                  <div className="space-y-2 ml-4">
                    {subProblems.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => navigate(`/problems/${p.id}`)}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[p.difficulty] || difficultyColors.Medium}`}>
                            {p.difficulty}
                          </span>
                          <span className="text-sm font-medium group-hover:text-primary-500 transition-colors">
                            #{p.number} {p.name}
                          </span>
                          <span className="text-xs text-slate-400">{p.pattern}</span>
                        </div>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-primary-500" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Code Examples */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Code Examples</h3>
          <LanguageSelector />
        </div>
        <CodeBlock language="selected" />
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant={isComplete ? 'secondary' : 'primary'}
          onClick={() => {
            toggleTopicComplete(topic.id);
            if (!isComplete) {
              import('@/lib/spacedRepetition').then(({ createRevisionItem }) => {
                addRevisionItem(createRevisionItem(topic.id, topic.name));
              });
            }
          }}
        >
          {isComplete ? <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Completed</span> : 'Mark as Complete'}
        </Button>
      </div>
    </div>
  );
}
