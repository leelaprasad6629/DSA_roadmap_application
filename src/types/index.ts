export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type Language = 'java' | 'cpp' | 'python' | 'c' | 'javascript' | 'go' | 'csharp' | 'kotlin' | 'rust';
export type ProblemStatus = 'Solved' | 'Attempted' | 'Bookmarked' | 'Needs Revision' | 'Wrong Attempt' | 'Not Started';
export type Theme = 'light' | 'dark';

export interface Topic {
  id: string;
  name: string;
  difficulty: Difficulty;
  estimatedHours: number;
  subtopics: string[];
  theory: string;
  commonMistakes: string[];
  bestPractices: string[];
  revisionChecklist: string[];
  pseudocode?: string;
  dryRun?: string;
  complexity?: { time: string; space: string };
  edgeCases?: string[];
}

export interface Phase {
  id: number;
  name: string;
  description: string;
  prerequisites: string[];
  learningObjectives: string[];
  estimatedDuration: number;
  topics: Topic[];
  order: number;
}

export interface Problem {
  id: string;
  number: number;
  name: string;
  difficulty: ProblemDifficulty;
  topic: string;
  pattern: string;
  prerequisites: string[];
  similarProblems: string[];
  tags: string[];
  isPremium: boolean;
  link: string;
  hints: string[];
  optimalApproach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: Partial<Record<Language, string>>;
}

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  category: 'Definition' | 'Algorithm' | 'Complexity' | 'Formula' | 'Trick' | 'Concept';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizQuestion {
  id: string;
  topic: string;
  type: 'MCQ' | 'CodeOutput' | 'Complexity' | 'Debugging';
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
}

export interface DayPlan {
  day: number;
  date: string;
  topics: string[];
  readingTime: number;
  practiceProblems: string[];
  revisionTasks: string[];
  notes: string;
  completed: boolean;
}

export interface WeekPlan {
  week: number;
  topicsCovered: string[];
  problemsTarget: number;
  revisionTopics: string[];
  weakTopics: string[];
  suggestedReview: string[];
}

export interface MonthPlan {
  month: number;
  topicsCovered: string[];
  totalProblemsTarget: number;
  revisionSchedule: string[];
  overallProgress: number;
  skillImprovement: string;
}

export interface RoadmapConfig {
  startDate: string;
  targetDate: string;
  hoursPerDay: number;
  daysPerWeek: number;
}

export interface UserProgress {
  completedTopics: string[];
  completedPhases: number[];
  solvedProblems: string[];
  attemptedProblems: string[];
  bookmarkedProblems: string[];
  needsRevisionProblems: string[];
  wrongAttemptProblems: string[];
  problemCompletionDates: Record<string, string>;
  dailyStreak: number;
  lastStudyDate: string;
  studyCalendar: Record<string, number>;

  bookmarks: Bookmark[];
  flashcardProgress: Record<string, number>;
  quizScores: QuizScore[];
  currentPhase: number;
  currentDay: number;
  dailyGoal: number;
  weeklyGoal: number;
  monthlyGoal: number;
}


export interface Bookmark {
  id: string;
  type: 'topic' | 'problem' | 'note' | 'algorithm';
  refId: string;
  label: string;
  createdAt: string;
}

export interface QuizScore {
  quizId: string;
  topic: string;
  score: number;
  total: number;
  date: string;
}

export interface RevisionItem {
  topicId: string;
  topicName: string;
  lastReviewed: string;
  nextReview: string;
  reviewCount: number;
  interval: number;
}

export interface SavedCode {
  id: string;
  topic: string;
  language: Language;
  code: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export const LANGUAGES: { value: Language; label: string; icon: string }[] = [
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚡' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'c', label: 'C', icon: '🔧' },
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'go', label: 'Go', icon: '🦫' },
  { value: 'csharp', label: 'C#', icon: '💠' },
  { value: 'kotlin', label: 'Kotlin', icon: '🟪' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
];
