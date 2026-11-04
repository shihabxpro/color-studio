import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  subtle?: boolean;
}

export function Divider({
  orientation = 'horizontal',
  subtle = false,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'shrink-0',
        subtle ? 'bg-line-subtle' : 'bg-line',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-4 self-center',
        className
      )}
      {...props}
    />
  );
}
