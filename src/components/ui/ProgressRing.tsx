export function ProgressRing({ progress, size = 120, strokeWidth = 10, label }: {
  progress: number; size?: number; strokeWidth?: number; label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        <circle stroke="currentColor" strokeWidth={strokeWidth} fill="none" r={radius} cx={size/2} cy={size/2}
          className="text-slate-200 dark:text-slate-700" />
        <circle stroke="url(#gradient)" strokeWidth={strokeWidth} fill="none" r={radius} cx={size/2} cy={size/2}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(progress)}%</span>
        {label && <span className="text-xs text-slate-500 mt-1">{label}</span>}
      </div>
    </div>
  );
}
