import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[1.25rem] h-[1.125rem] px-1 rounded-xs bg-surface-subtle border border-line text-[10px] font-mono font-medium text-ink-muted leading-none select-none',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
