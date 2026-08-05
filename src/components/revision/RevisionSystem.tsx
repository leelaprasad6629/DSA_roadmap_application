import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RotateCcw, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { isDueForReview, updateRevisionItem, INTERVALS } from '@/lib/spacedRepetition';
import { useMemo } from 'react';

export default function RevisionSystem() {
  const revisionItems = useStore((s) => s.revisionItems);
  const updateRevision = useStore((s) => s.updateRevisionItem);

  const dueItems = useMemo(() => revisionItems.filter(isDueForReview), [revisionItems]);
  const upcomingItems = useMemo(
    () => revisionItems.filter((r) => !isDueForReview(r)).sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()),
    [revisionItems]
  );

  const handleReview = (topicId: string) => {
    const item = revisionItems.find((r) => r.topicId === topicId);
    if (item) updateRevision(topicId, updateRevisionItem(item));
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Revision System</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Spaced repetition for long-term retention</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INTERVALS.map((interval, i) => (
          <Card key={interval}>
            <p className="text-xs text-slate-400">Review {i + 1}</p>
            <p className="text-xl font-bold mt-1">{interval} days</p>
            <p className="text-xs text-slate-400 mt-1">after previous</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-red-500" />
          <h3 className="font-semibold">Due Today ({dueItems.length})</h3>
        </div>
        {dueItems.length > 0 ? (
          <div className="space-y-2">
            {dueItems.map((item) => (
              <div key={item.topicId} className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <div>
                  <p className="font-medium">{item.topicName}</p>
                  <p className="text-xs text-slate-400">Reviews done: {item.reviewCount}</p>
                </div>
                <Button size="sm" onClick={() => handleReview(item.topicId)}>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Review</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 py-4">No revisions due today! 🎉</p>
        )}
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-primary-500" />
          <h3 className="font-semibold">Upcoming Reviews</h3>
        </div>
        {upcomingItems.length > 0 ? (
          <div className="space-y-2">
            {upcomingItems.slice(0, 10).map((item) => (
              <div key={item.topicId} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="font-medium">{item.topicName}</p>
                  <p className="text-xs text-slate-400">Next: {new Date(item.nextReview).toLocaleDateString()}</p>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  Review {item.reviewCount + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 py-4">No upcoming reviews scheduled.</p>
        )}
      </Card>
    </div>
  );
}
