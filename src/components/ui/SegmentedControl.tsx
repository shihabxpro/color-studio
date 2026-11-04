import type { ReactNode } from 'react';
import type { ControlSize } from '@/types/ui';
import { cn } from '@/lib/cn';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: Extract<ControlSize, 'sm' | 'md'>;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  label,
  options,
  value,
  onChange,
  size = 'sm',
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'inline-flex flex-wrap items-center max-w-full p-0.5 rounded-sm bg-surface-subtle border border-line',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 font-medium leading-none whitespace-nowrap rounded-xs transition-colors duration-120 cursor-pointer select-none',
              size === 'sm' ? 'h-6 px-2.5 text-[12px]' : 'h-7 px-3 text-[13px]',
              isActive
                ? 'bg-surface text-ink shadow-xs border border-line-subtle'
                : 'text-ink-muted hover:text-ink border border-transparent'
            )}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
