import { Menu, Moon, Sun, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  return (
    <header className="glass border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-3 flex items-center justify-between">
      <button onClick={onMenuClick} className="lg:hidden text-slate-600 dark:text-slate-300">
        <Menu size={24} />
      </button>
      <div
        className="flex items-center gap-2 flex-1 max-w-md cursor-pointer"
        onClick={() => navigate('/search')}
      >
        <div className="flex items-center gap-2 w-full bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-2 text-slate-400">
          <Search size={16} />
          <span className="text-sm hidden sm:block">Search topics, problems, patterns...</span>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
