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
        'min-w-0 max-w-full rounded-md border border-line bg-surface shadow-xs overflow-hidden',
        className
      )}
      {...props}
    >
      {(title || meta || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 border-b border-line-subtle bg-surface-subtle/60">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            {title && (
              <h2 className="text-[12px] font-semibold text-ink break-words">
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
      <div className={cn('p-3.5 sm:p-4 min-w-0', bodyClassName)}>{children}</div>
    </section>
  );
}
