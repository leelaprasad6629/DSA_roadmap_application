import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Terminal, Save, Trash2, Code2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { LANGUAGES, Language } from '@/types';

const defaultCode: Record<string, string> = {
  java: `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, DSA!");\n    }\n}`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, DSA!" << endl;\n    return 0;\n}`,
  python: `print("Hello, DSA!")`,
  c: `#include <stdio.h>\nint main() {\n    printf("Hello, DSA!\\n");\n    return 0;\n}`,
  javascript: `console.log("Hello, DSA!");`,
  go: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, DSA!")\n}`,
  csharp: `using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, DSA!");\n    }\n}`,
  kotlin: `fun main() {\n    println("Hello, DSA!")\n}`,
  rust: `fn main() {\n    println!("Hello, DSA!");\n}`,
};

export default function CodingWorkspace() {
  const [language, setLanguage] = useState<Language>('cpp');
  const [code, setCode] = useState(defaultCode.cpp);
  const [title, setTitle] = useState('Untitled');
  const saveCode = useStore((s) => s.saveCode);
  const savedCodes = useStore((s) => s.savedCodes);
  const deleteSavedCode = useStore((s) => s.deleteSavedCode);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
  };

  const handleSave = () => {
    saveCode({ topic: title, language, code, title });
    setTitle('Untitled');
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Coding Workspace</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Write, save, and compare solutions</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text" placeholder="Solution title..."
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="flex-1 mr-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value as Language)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm">
            {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.icon} {l.label}</option>)}
          </select>
          <Button size="sm" onClick={handleSave} className="ml-2"><span className="flex items-center gap-1"><Save size={14} /> Save</span></Button>
        </div>
        <div className="code-block">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-400">{language}</span>
          </div>
          <textarea
            value={code} onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-[400px] bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </Card>

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Code2 size={18} /> Saved Solutions ({savedCodes.length})</h3>
        <div className="space-y-2">
          {savedCodes.map((sc) => (
            <Card key={sc.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{sc.title}</h4>
                  <p className="text-xs text-slate-400">{sc.language} • {new Date(sc.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => { setLanguage(sc.language); setCode(sc.code); setTitle(sc.title); }}>Load</Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteSavedCode(sc.id)}><Trash2 size={14} className="text-red-400" /></Button>
                </div>
              </div>
            </Card>
          ))}
          {savedCodes.length === 0 && <p className="text-center text-slate-400 py-4">No saved solutions yet.</p>}
        </div>
      </div>
    </div>
  );
}
