import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProgress, Bookmark, RoadmapConfig,
  Language, Theme, RevisionItem, SavedCode, QuizScore,
} from '@/types';

interface StoreState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Language
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;

  // Auth
  user: { id: string; email: string } | null;
  setUser: (user: { id: string; email: string } | null) => void;

  // Roadmap config
  roadmapConfig: RoadmapConfig;
  setRoadmapConfig: (config: Partial<RoadmapConfig>) => void;

  // Progress
  progress: UserProgress;
  toggleTopicComplete: (topicId: string) => void;
  togglePhaseComplete: (phaseId: number) => void;
  setProblemStatus: (problemId: string, status: 'solved' | 'attempted' | 'needsRevision' | 'wrongAttempt') => void;
  toggleBookmarkProblem: (problemId: string) => void;
  updateDailyStreak: () => void;
  recordStudyDay: (date: string) => void;
  setGoals: (daily: number, weekly: number, monthly: number) => void;
  setCurrentPhase: (phaseId: number) => void;
  setCurrentDay: (day: number) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;

  // Revision
  revisionItems: RevisionItem[];
  addRevisionItem: (item: RevisionItem) => void;
  updateRevisionItem: (topicId: string, updated: RevisionItem) => void;
  removeRevisionItem: (topicId: string) => void;

  // Quiz
  addQuizScore: (score: QuizScore) => void;

  // Flashcards
  updateFlashcardProgress: (id: string, rating: number) => void;

  // Saved code
  savedCodes: SavedCode[];
  saveCode: (code: Omit<SavedCode, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSavedCode: (id: string, code: string) => void;
  deleteSavedCode: (id: string) => void;
}

const defaultProgress: UserProgress = {
  completedTopics: [],
  completedPhases: [],
  solvedProblems: [],
  attemptedProblems: [],
  bookmarkedProblems: [],
  needsRevisionProblems: [],
  wrongAttemptProblems: [],
  problemCompletionDates: {},
  dailyStreak: 0,
  lastStudyDate: '',
  studyCalendar: {},
  bookmarks: [],
  flashcardProgress: {},
  quizScores: [],
  currentPhase: 0,
  currentDay: 1,
  dailyGoal: 2,
  weeklyGoal: 10,
  monthlyGoal: 40,
};

const defaultConfig: RoadmapConfig = {
  startDate: new Date().toISOString().split('T')[0],
  targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  hoursPerDay: 3,
  daysPerWeek: 5,
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      selectedLanguage: 'cpp',
      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),

      user: null,
      setUser: (user) => set({ user }),

      roadmapConfig: defaultConfig,
      setRoadmapConfig: (config) => set((s) => ({ roadmapConfig: { ...s.roadmapConfig, ...config } })),

      progress: defaultProgress,
      toggleTopicComplete: (topicId) =>
        set((s) => {
          const completed = s.progress.completedTopics.includes(topicId);
          return {
            progress: {
              ...s.progress,
              completedTopics: completed
                ? s.progress.completedTopics.filter((t) => t !== topicId)
                : [...s.progress.completedTopics, topicId],
            },
          };
        }),
      togglePhaseComplete: (phaseId) =>
        set((s) => {
          const completed = s.progress.completedPhases.includes(phaseId);
          return {
            progress: {
              ...s.progress,
              completedPhases: completed
                ? s.progress.completedPhases.filter((p) => p !== phaseId)
                : [...s.progress.completedPhases, phaseId],
            },
          };
        }),
      setProblemStatus: (problemId, status) =>
        set((s) => {
          const p = { ...s.progress };
          p.solvedProblems = p.solvedProblems.filter((id) => id !== problemId);
          p.attemptedProblems = p.attemptedProblems.filter((id) => id !== problemId);
          p.needsRevisionProblems = p.needsRevisionProblems.filter((id) => id !== problemId);
          p.wrongAttemptProblems = p.wrongAttemptProblems.filter((id) => id !== problemId);
          if (status === 'solved') {
            p.solvedProblems.push(problemId);
            p.problemCompletionDates[problemId] = new Date().toISOString();
          } else if (status === 'attempted') p.attemptedProblems.push(problemId);
          else if (status === 'needsRevision') p.needsRevisionProblems.push(problemId);
          else if (status === 'wrongAttempt') p.wrongAttemptProblems.push(problemId);
          return { progress: p };
        }),
      toggleBookmarkProblem: (problemId) =>
        set((s) => {
          const bookmarked = s.progress.bookmarkedProblems.includes(problemId);
          return {
            progress: {
              ...s.progress,
              bookmarkedProblems: bookmarked
                ? s.progress.bookmarkedProblems.filter((id) => id !== problemId)
                : [...s.progress.bookmarkedProblems, problemId],
            },
          };
        }),
      updateDailyStreak: () =>
        set((s) => {
          const today = new Date().toDateString();
          if (s.progress.lastStudyDate === today) return {};
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          const streak = s.progress.lastStudyDate === yesterday ? s.progress.dailyStreak + 1 : 1;
          return {
            progress: { ...s.progress, dailyStreak: streak, lastStudyDate: today },
          };
        }),
      recordStudyDay: (date) =>
        set((s) => ({
          progress: {
            ...s.progress,
            studyCalendar: {
              ...s.progress.studyCalendar,
              [date]: (s.progress.studyCalendar[date] || 0) + 1,
            },
          },
        })),
      setGoals: (daily, weekly, monthly) =>
        set((s) => ({
          progress: { ...s.progress, dailyGoal: daily, weeklyGoal: weekly, monthlyGoal: monthly },
        })),
      setCurrentPhase: (phaseId) => set((s) => ({ progress: { ...s.progress, currentPhase: phaseId } })),
      setCurrentDay: (day) => set((s) => ({ progress: { ...s.progress, currentDay: day } })),

      addBookmark: (bookmark) =>
        set((s) => ({
          progress: {
            ...s.progress,
            bookmarks: [
              ...s.progress.bookmarks,
              { ...bookmark, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ],
          },
        })),
      removeBookmark: (id) =>
        set((s) => ({
          progress: { ...s.progress, bookmarks: s.progress.bookmarks.filter((b) => b.id !== id) },
        })),

      revisionItems: [],
      addRevisionItem: (item) =>
        set((s) => ({
          revisionItems: s.revisionItems.some((r) => r.topicId === item.topicId)
            ? s.revisionItems
            : [...s.revisionItems, item],
        })),
      updateRevisionItem: (topicId, updated) =>
        set((s) => ({
          revisionItems: s.revisionItems.map((r) => (r.topicId === topicId ? updated : r)),
        })),
      removeRevisionItem: (topicId) =>
        set((s) => ({
          revisionItems: s.revisionItems.filter((r) => r.topicId !== topicId),
        })),

      addQuizScore: (score) =>
        set((s) => ({
          progress: { ...s.progress, quizScores: [...s.progress.quizScores, score] },
        })),

      updateFlashcardProgress: (id, rating) =>
        set((s) => ({
          progress: {
            ...s.progress,
            flashcardProgress: { ...s.progress.flashcardProgress, [id]: rating },
          },
        })),

      savedCodes: [],
      saveCode: (code) =>
        set((s) => ({
          savedCodes: [
            ...s.savedCodes,
            { ...code, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          ],
        })),
      updateSavedCode: (id, code) =>
        set((s) => ({
          savedCodes: s.savedCodes.map((c) => (c.id === id ? { ...c, code, updatedAt: new Date().toISOString() } : c)),
        })),
      deleteSavedCode: (id) =>
        set((s) => ({
          savedCodes: s.savedCodes.filter((c) => c.id !== id),
        })),
    }),
    { name: 'dsa-mastery-store' }
  )
);
