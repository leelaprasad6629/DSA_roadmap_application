import { useStore } from '@/store/useStore';

export default function CodeBlock({ code, language }: { code?: string; language?: string }) {
  const selectedLanguage = useStore((s) => s.selectedLanguage);

  if (code) {
    return (
      <div className="code-block">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <pre className="text-slate-300">{code}</pre>
      </div>
    );
  }

  // Placeholder for topic-specific code
  return (
    <div className="code-block">
      <p className="text-slate-400 text-sm">// Code examples for {selectedLanguage} will appear here</p>
      <pre className="text-slate-300 mt-2">{`// Implementation coming soon for ${selectedLanguage}`}</pre>
    </div>
  );
}
