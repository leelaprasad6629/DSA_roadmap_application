import type { Language } from '@/types';

// Piston API (emkc.org) - free public code execution engine
const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

interface PistonFile {
  name?: string;
  content: string;
}

interface PistonExecuteParams {
  language: string;
  version: string;
  files: PistonFile[];
  stdin?: string;
  args?: string[];
}

interface PistonResponse {
  run?: { stdout: string; stderr: string; code: number; output: string };
  compile?: { stdout: string; stderr: string; code: number; output: string };
  language?: string;
  version?: string;
}

// Map our language IDs to Piston language + version
const LANGUAGE_MAP: Record<Language, { language: string; version: string; fileExt: string }> = {
  java:      { language: 'java',       version: '15.0.2', fileExt: '.java' },
  cpp:       { language: 'c++',        version: '10.2.0', fileExt: '.cpp' },
  python:    { language: 'python',     version: '3.10.0', fileExt: '.py' },
  c:         { language: 'c',          version: '10.2.0', fileExt: '.c' },
  javascript: { language: 'javascript', version: '18.15.0', fileExt: '.js' },
  go:        { language: 'go',         version: '1.16.2', fileExt: '.go' },
  csharp:    { language: 'csharp',     version: '6.12.0',  fileExt: '.cs' },
  kotlin:    { language: 'kotlin',     version: '1.8.20', fileExt: '.kt' },
  rust:      { language: 'rust',       version: '1.68.2', fileExt: '.rs' },
};

export async function runCode(
  language: Language,
  code: string,
  stdin: string = ''
): Promise<{ success: boolean; output: string; error?: string }> {
  const langConfig = LANGUAGE_MAP[language];
  if (!langConfig) {
    return { success: false, output: '', error: `Language ${language} is not supported for execution.` };
  }

  const params: PistonExecuteParams = {
    language: langConfig.language,
    version: langConfig.version,
    files: [{ name: `main${langConfig.fileExt}`, content: code }],
    stdin: stdin || undefined,
  };

  try {
    const response = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errText = await response.text();
      return { success: false, output: '', error: `Execution API error (${response.status}): ${errText}` };
    }

    const data: PistonResponse = await response.json();

    // Check for compilation errors
    if (data.compile && data.compile.code !== 0 && data.compile.stderr) {
      return { success: false, output: data.compile.stderr, error: 'Compilation failed' };
    }

    // Get runtime output
    if (data.run) {
      const stdout = data.run.stdout || '';
      const stderr = data.run.stderr || '';
      const combined = stdout + (stderr ? `\n[stderr]\n${stderr}` : '');
      if (data.run.code !== 0 && !stdout) {
        return { success: false, output: combined, error: `Runtime error (exit code ${data.run.code})` };
      }
      return { success: true, output: combined || '(no output)' };
    }

    return { success: false, output: '', error: 'No execution result returned.' };
  } catch (err: any) {
    return { success: false, output: '', error: `Failed to execute code: ${err?.message || err}` };
  }
}

export function isLanguageRunnable(language: Language): boolean {
  return language in LANGUAGE_MAP;
}
