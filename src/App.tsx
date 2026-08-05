import { Routes, Route } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import Roadmap from '@/components/roadmap/Roadmap';
import TopicPage from '@/components/topic/TopicPage';
import ProblemList from '@/components/problems/ProblemList';
import ProblemDetail from '@/components/problems/ProblemDetail';
import DailyPlanner from '@/components/planner/DailyPlanner';
import WeeklyPlanner from '@/components/planner/WeeklyPlanner';
import MonthlyPlanner from '@/components/planner/MonthlyPlanner';
import RevisionSystem from '@/components/revision/RevisionSystem';
import NotesSystem from '@/components/notes/NotesSystem';
import Flashcards from '@/components/flashcards/Flashcards';
import QuizSystem from '@/components/quiz/QuizSystem';
import CodingWorkspace from '@/components/workspace/CodingWorkspace';
import ProgressAnalytics from '@/components/analytics/ProgressAnalytics';
import GlobalSearch from '@/components/search/GlobalSearch';
import Bookmarks from '@/components/bookmarks/Bookmarks';

export default function App() {
  useTheme();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/roadmap/phase/:phaseId/topic/:topicId" element={<TopicPage />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problems/:problemId" element={<ProblemDetail />} />
        <Route path="/planner/daily" element={<DailyPlanner />} />
        <Route path="/planner/weekly" element={<WeeklyPlanner />} />
        <Route path="/planner/monthly" element={<MonthlyPlanner />} />
        <Route path="/revision" element={<RevisionSystem />} />
        <Route path="/notes" element={<NotesSystem />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/quiz" element={<QuizSystem />} />
        <Route path="/workspace" element={<CodingWorkspace />} />
        <Route path="/analytics" element={<ProgressAnalytics />} />
        <Route path="/search" element={<GlobalSearch />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Route>
    </Routes>
  );
}
