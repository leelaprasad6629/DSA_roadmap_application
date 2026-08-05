import type { Phase, DayPlan, WeekPlan, MonthPlan, RoadmapConfig } from '@/types';
import { phases as allPhases } from '@/data/phases';

export function generateRoadmap(config: RoadmapConfig): {
  days: DayPlan[];
  weeks: WeekPlan[];
  months: MonthPlan[];
  totalDays: number;
} {
  const start = new Date(config.startDate);
  const end = new Date(config.targetDate);
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const studyDaysPerWeek = config.daysPerWeek;
  const hoursPerDay = config.hoursPerDay;

  const allTopics = allPhases.flatMap((phase) =>
    phase.topics.map((topic) => ({
      phaseId: phase.id,
      phaseName: phase.name,
      topicId: topic.id,
      topicName: topic.name,
      estimatedHours: topic.estimatedHours,
    }))
  );

  const totalHours = allTopics.reduce((sum, t) => sum + t.estimatedHours, 0);
  const availableStudyDays = Math.floor((totalDays / 7) * studyDaysPerWeek);
  const totalAvailableHours = availableStudyDays * hoursPerDay;

  const days: DayPlan[] = [];
  const weeks: WeekPlan[] = [];
  const months: MonthPlan[] = [];

  let currentDay = 0;
  let topicIndex = 0;
  let problemsAssigned: string[] = [];
  let revisionQueue: { topicId: string; topicName: string; day: number }[] = [];

  const isStudyDay = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek < studyDaysPerWeek;
  };

  let studyDayCount = 0;

  while (currentDay < totalDays && topicIndex < allTopics.length) {
    const date = new Date(start);
    date.setDate(date.getDate() + currentDay);

    if (!isStudyDay(date)) {
      currentDay++;
      continue;
    }

    studyDayCount++;
    const topicsForDay: string[] = [];
    const practiceProblems: string[] = [];
    const revisionTasks: string[] = [];
    let readingTime = 0;

    const hoursLeft = hoursPerDay;

    while (readingTime < hoursLeft && topicIndex < allTopics.length) {
      const topic = allTopics[topicIndex];
      topicsForDay.push(`${topic.topicName}`);
      readingTime += topic.estimatedHours;
      practiceProblems.push(`LeetCode problems for ${topic.topicName}`);
      revisionQueue.push({ topicId: topic.topicId, topicName: topic.topicName, day: studyDayCount + 1 });
      topicIndex++;
    }

    revisionQueue = revisionQueue.filter((r) => {
      if (r.day === studyDayCount) {
        revisionTasks.push(r.topicName);
        return false;
      }
      return true;
    });

    days.push({
      day: studyDayCount,
      date: date.toISOString().split('T')[0],
      topics: topicsForDay,
      readingTime,
      practiceProblems,
      revisionTasks,
      notes: '',
      completed: false,
    });

    currentDay++;
  }

  // Generate weeks
  const totalWeeks = Math.ceil(studyDayCount / studyDaysPerWeek);
  for (let w = 0; w < totalWeeks; w++) {
    const weekStart = w * studyDaysPerWeek;
    const weekEnd = Math.min(weekStart + studyDaysPerWeek, studyDayCount);
    const weekDays = days.slice(weekStart, weekEnd);
    const topicsCovered = Array.from(new Set(weekDays.flatMap((d) => d.topics)));
    weeks.push({
      week: w + 1,
      topicsCovered,
      problemsTarget: weekDays.reduce((sum, d) => sum + d.practiceProblems.length, 0),
      revisionTopics: Array.from(new Set(weekDays.flatMap((d) => d.revisionTasks))),
      weakTopics: [],
      suggestedReview: [],
    });
  }

  // Generate months
  const totalMonths = Math.ceil(totalWeeks / 4);
  for (let m = 0; m < totalMonths; m++) {
    const monthWeeks = weeks.slice(m * 4, (m + 1) * 4);
    const topicsCovered = Array.from(new Set(monthWeeks.flatMap((w) => w.topicsCovered)));
    months.push({
      month: m + 1,
      topicsCovered,
      totalProblemsTarget: monthWeeks.reduce((sum, w) => sum + w.problemsTarget, 0),
      revisionSchedule: monthWeeks.flatMap((w) => w.revisionTopics),
      overallProgress: 0,
      skillImprovement: '',
    });
  }

  return { days, weeks, months, totalDays: studyDayCount };
}
