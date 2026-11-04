import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant, ControlSize } from '@/types/ui';
import { cn } from '@/lib/cn';
import { withBase } from '@/lib/url';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-contrast border border-transparent shadow-xs hover:bg-accent-hover',
  secondary:
    'bg-surface text-ink border border-line shadow-xs hover:bg-surface-subtle hover:border-line-strong',
  ghost:
    'bg-transparent text-ink-secondary border border-transparent hover:bg-surface-subtle hover:text-ink',
};

const SIZE_CLASSES: Record<ControlSize, string> = {
  sm: 'h-7 px-2.5 text-[12px] gap-1.5 rounded-sm',
  md: 'h-8 px-3 text-[13px] gap-1.5 rounded-sm',
  lg: 'h-9 px-3.5 text-[13px] gap-2 rounded-md',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center font-medium leading-none whitespace-nowrap select-none transition-colors duration-120 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ControlSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ControlSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function ButtonLink({
  variant = 'secondary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  href,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      href={href ? withBase(href) : undefined}
      className={cn(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </a>
  );
}
