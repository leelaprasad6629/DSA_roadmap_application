import type { RevisionItem } from '@/types';

const INTERVALS = [1, 3, 7, 15, 30, 60];

export function calculateNextReview(reviewCount: number): number {
  const index = Math.min(reviewCount, INTERVALS.length - 1);
  return INTERVALS[index];
}

export function createRevisionItem(topicId: string, topicName: string): RevisionItem {
  const now = new Date();
  const interval = INTERVALS[0];
  const next = new Date(now);
  next.setDate(next.getDate() + interval);
  return {
    topicId,
    topicName,
    lastReviewed: now.toISOString(),
    nextReview: next.toISOString(),
    reviewCount: 0,
    interval,
  };
}

export function updateRevisionItem(item: RevisionItem): RevisionItem {
  const now = new Date();
  const newCount = item.reviewCount + 1;
  const interval = calculateNextReview(newCount);
  const next = new Date(now);
  next.setDate(next.getDate() + interval);
  return {
    ...item,
    lastReviewed: now.toISOString(),
    nextReview: next.toISOString(),
    reviewCount: newCount,
    interval,
  };
}

export function isDueForReview(item: RevisionItem): boolean {
  return new Date(item.nextReview) <= new Date();
}

export function getDaysUntilReview(item: RevisionItem): number {
  const now = new Date();
  const next = new Date(item.nextReview);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export { INTERVALS };
