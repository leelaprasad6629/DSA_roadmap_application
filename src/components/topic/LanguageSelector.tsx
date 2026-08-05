import { useStore } from '@/store/useStore';
import { LANGUAGES } from '@/types';

export default function LanguageSelector() {
  const selectedLanguage = useStore((s) => s.selectedLanguage);
  const setSelectedLanguage = useStore((s) => s.setSelectedLanguage);
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value as any)}
      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      {LANGUAGES.map((l) => (
        <option key={l.value} value={l.value}>{l.icon} {l.label}</option>
      ))}
    </select>
  );
}
