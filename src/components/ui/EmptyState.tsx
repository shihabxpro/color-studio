import type { HTMLAttributes, ReactNode } from 'react';
import type { IconName } from '@/types/ui';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  icon?: IconName;
  title: string;
  description: string;
  meta?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon = 'studio',
  title,
  description,
  meta,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6 py-12 rounded-md border border-dashed border-line-strong/80 bg-surface/70',
        className
      )}
      {...props}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface-subtle text-ink-secondary mb-3.5">
        <Icon name={icon} size={18} />
      </div>
      {meta && (
        <span className="font-mono text-[11px] text-ink-muted mb-1 tracking-tight">
          {meta}
        </span>
      )}
      <h3 className="text-[14px] font-semibold text-ink tracking-tight">
        {title}
      </h3>
      <p className="mt-1.5 max-w-md text-[13px] text-ink-muted leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
