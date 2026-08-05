import { ReactNode } from 'react';

export function Card({ children, className = '', hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`glass-card p-5 ${hover ? 'hover:shadow-lg' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, color = 'primary', subtitle }: {
  label: string; value: string | number; icon: any; color?: string; subtitle?: string;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}>
          <Icon className={`text-${color}-600 dark:text-${color}-400`} size={24} />
        </div>
      </div>
    </Card>
  );
}
