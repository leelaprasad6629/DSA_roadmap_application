import { Moon, Sun } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  return (
    <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50">
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
