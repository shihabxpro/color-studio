import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}

export function Panel({
  title,
  meta,
  actions,
  className,
  bodyClassName,
  children,
  ...props
}: PanelProps) {
  return (
    <section
      className={cn(
        'rounded-md border border-line bg-surface shadow-xs overflow-hidden',
        className
      )}
      {...props}
    >
      {(title || meta || actions) && (
        <header className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-line-subtle bg-surface-subtle/60">
          <div className="flex items-center gap-2 min-w-0">
            {title && (
              <h2 className="text-[12px] font-semibold tracking-tight text-ink truncate">
                {title}
              </h2>
            )}
            {meta}
          </div>
          {actions && (
            <div className="flex items-center gap-1.5 shrink-0">{actions}</div>
          )}
        </header>
      )}
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </section>
  );
}
