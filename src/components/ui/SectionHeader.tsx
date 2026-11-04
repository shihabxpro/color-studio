import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface SectionHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
}

export function SectionHeader({
  title,
  description,
  badge,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2',
        className
      )}
      {...props}
    >
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-[15px] font-semibold tracking-tight text-ink">
            {title}
          </h2>
          {badge}
        </div>
        {description && (
          <p className="text-[13px] text-ink-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}
