import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const PADDING_CLASSES = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
} as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: keyof typeof PADDING_CLASSES;
  subtle?: boolean;
  children: ReactNode;
}

export function Card({
  padding = 'md',
  subtle = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-line',
        subtle ? 'bg-surface-subtle' : 'bg-surface shadow-xs',
        PADDING_CLASSES[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
