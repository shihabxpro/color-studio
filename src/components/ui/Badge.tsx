import type { HTMLAttributes, ReactNode } from 'react';
import type { BadgeVariant } from '@/types/ui';
import { cn } from '@/lib/cn';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-subtle text-ink-secondary border border-line',
  accent: 'bg-accent-subtle text-accent-ink border border-accent-border',
  outline: 'bg-transparent text-ink-muted border border-line',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  mono?: boolean;
  children: ReactNode;
}

export function Badge({
  variant = 'neutral',
  mono = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 h-5 px-1.5 rounded-xs text-[11px] font-medium leading-none whitespace-nowrap select-none',
        mono && 'font-mono tracking-tight',
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
