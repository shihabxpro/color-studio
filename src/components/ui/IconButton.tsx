import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ControlSize } from '@/types/ui';
import { cn } from '@/lib/cn';

const SIZE_CLASSES: Record<ControlSize, string> = {
  sm: 'h-7 w-7 rounded-sm',
  md: 'h-8 w-8 rounded-sm',
  lg: 'h-9 w-9 rounded-md',
};

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: ControlSize;
  active?: boolean;
  bordered?: boolean;
  children: ReactNode;
}

export function IconButton({
  label,
  size = 'md',
  active = false,
  bordered = false,
  className,
  type = 'button',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={active ? true : undefined}
      title={label}
      className={cn(
        'inline-flex items-center justify-center shrink-0 transition-colors duration-120 cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
        SIZE_CLASSES[size],
        bordered && 'border border-line bg-surface shadow-xs',
        active
          ? 'bg-accent-subtle text-accent-ink border border-accent-border'
          : 'text-ink-secondary hover:bg-surface-subtle hover:text-ink',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
