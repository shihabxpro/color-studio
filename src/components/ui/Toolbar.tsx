import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Toolbar({
  leading,
  trailing,
  className,
  children,
  ...props
}: ToolbarProps) {
  return (
    <div
      role="toolbar"
      className={cn(
        'min-h-10 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 bg-surface border-b border-line shrink-0',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 min-w-0 flex-wrap">
        {leading}
        {children}
      </div>
      {trailing && (
        <div className="flex items-center gap-1.5 shrink-0">{trailing}</div>
      )}
    </div>
  );
}
