import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import type { ControlSize } from '@/types/ui';
import { cn } from '@/lib/cn';

const SIZE_CLASSES: Record<ControlSize, string> = {
  sm: 'h-7 text-[12px] px-2 rounded-sm',
  md: 'h-8 text-[13px] px-2.5 rounded-sm',
  lg: 'h-9 text-[14px] px-3 rounded-md',
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  hint?: string;
  size?: ControlSize;
  mono?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  containerClassName?: string;
}

export function Input({
  label,
  hint,
  size = 'md',
  mono = false,
  prefix,
  suffix,
  id,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[12px] font-medium text-ink-secondary select-none"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center gap-1.5 bg-surface border border-line text-ink shadow-xs transition-colors duration-120 focus-within:border-accent hover:border-line-strong',
          SIZE_CLASSES[size]
        )}
      >
        {prefix && (
          <span className="text-ink-muted shrink-0 select-none text-[12px]">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full min-w-0 bg-transparent text-ink placeholder:text-ink-muted focus:outline-none disabled:cursor-not-allowed disabled:text-ink-disabled',
            mono && 'font-mono text-[12px] tracking-tight',
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="text-ink-muted shrink-0 select-none text-[11px] font-mono">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-ink-muted leading-snug">{hint}</p>}
    </div>
  );
}
