import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, Code2, Calendar, RotateCcw, StickyNote,
  Layers, Brain, Terminal, BarChart3, Search, Bookmark, X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/problems', icon: Code2, label: 'Problems' },
  { to: '/planner/daily', icon: Calendar, label: 'Daily Planner' },
  { to: '/planner/weekly', icon: Calendar, label: 'Weekly Planner' },
  { to: '/planner/monthly', icon: Calendar, label: 'Monthly Planner' },
  { to: '/revision', icon: RotateCcw, label: 'Revision' },
  { to: '/notes', icon: StickyNote, label: 'Notes' },
  { to: '/flashcards', icon: Layers, label: 'Flashcards' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/workspace', icon: Terminal, label: 'Coding Workspace' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass flex-col overflow-y-auto scrollbar-thin transition-transform duration-300 ${
          isOpen ? 'translate-x-0 flex' : '-translate-x-full lg:translate-x-0 lg:flex'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-sm">
              DSA
            </div>
            <div>
              <h1 className="font-bold text-lg gradient-text">DSA Mastery</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Learn • Practice • Master</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'sidebar-link-active text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 text-xs text-slate-400 text-center">
          <p>DSA Mastery v1.0</p>
          <p className="mt-1">Built with ❤️ for DSA learners</p>
        </div>
      </aside>
    </>
  );
}
