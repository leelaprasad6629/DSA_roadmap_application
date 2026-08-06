import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Terminal, Save, Trash2, Code2, Play, Loader2, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { LANGUAGES, Language } from '@/types';
import { runCode } from '@/lib/codeRunner';

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
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showStdin, setShowStdin] = useState(false);
  const [runError, setRunError] = useState(false);
  const saveCode = useStore((s) => s.saveCode);
  const savedCodes = useStore((s) => s.savedCodes);
  const deleteSavedCode = useStore((s) => s.deleteSavedCode);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
    setOutput('');
    setRunError(false);
  };

  const handleSave = () => {
    saveCode({ topic: title, language, code, title });
    setTitle('Untitled');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setRunError(false);
    const result = await runCode(language, code, stdin);
    setOutput(result.output || (result.error || 'No output'));
    setRunError(!result.success);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Coding Workspace</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Write, run, and save solutions</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4 gap-2">
          <input
            type="text" placeholder="Solution title..."
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value as Language)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm">
            {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.icon} {l.label}</option>)}
          </select>
          <Button size="sm" onClick={handleSave} variant="secondary"><span className="flex items-center gap-1"><Save size={14} /> Save</span></Button>
          <Button size="sm" onClick={handleRun} disabled={isRunning}>
            {isRunning ? <span className="flex items-center gap-1"><Loader2 size={14} className="animate-spin" /> Running...</span> : <span className="flex items-center gap-1"><Play size={14} /> Run</span>}
          </Button>
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

      {/* Stdin input */}
      <Card>
        <button onClick={() => setShowStdin(!showStdin)} className="flex items-center gap-2 w-full text-left">
          <Terminal size={16} className="text-slate-400" />
          <span className="text-sm font-medium">Custom Input (stdin)</span>
          <ChevronDown size={14} className={`ml-auto text-slate-400 transition-transform ${showStdin ? 'rotate-180' : ''}`} />
        </button>
        {showStdin && (
          <textarea
            value={stdin} onChange={(e) => setStdin(e.target.value)}
            placeholder="Enter input for your program..."
            className="w-full mt-3 min-h-[80px] p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            spellCheck={false}
          />
        )}
      </Card>

      {/* Output panel */}
      {(output || isRunning) && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={16} className={runError ? 'text-red-500' : 'text-green-500'} />
            <span className="text-sm font-semibold">{runError ? 'Error Output' : 'Output'}</span>
            {!isRunning && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${runError ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                {runError ? 'Failed' : 'Success'}
              </span>
            )}
          </div>
          <pre className={`text-sm font-mono whitespace-pre-wrap p-4 rounded-xl min-h-[60px] ${runError ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'}`}>
            {isRunning ? 'Executing...' : output}
          </pre>
        </Card>
      )}

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
                  <Button size="sm" variant="ghost" onClick={() => { setLanguage(sc.language); setCode(sc.code); setTitle(sc.title); setOutput(''); }}>Load</Button>
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
