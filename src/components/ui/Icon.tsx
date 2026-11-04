import type { SVGProps } from 'react';
import type { IconName } from '@/types/ui';
import { cn } from '@/lib/cn';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({
  name,
  size = 16,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('shrink-0', className)}
      {...props}
    >
      {renderPaths(name)}
    </svg>
  );
}

function renderPaths(name: IconName) {
  switch (name) {
    case 'studio':
      return (
        <>
          <rect x="3" y="3" width="8" height="8" rx="1.75" />
          <rect x="13" y="3" width="8" height="8" rx="1.75" />
          <rect x="3" y="13" width="8" height="8" rx="1.75" />
          <rect
            x="13"
            y="13"
            width="8"
            height="8"
            rx="1.75"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </>
      );
    case 'workspace':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M9 4v16" />
          <path d="M9 10h12" />
        </>
      );
    case 'swatches':
      return (
        <>
          <rect x="3" y="4" width="5" height="16" rx="1.25" />
          <rect x="9.5" y="4" width="5" height="16" rx="1.25" />
          <rect x="16" y="4" width="5" height="16" rx="1.25" />
        </>
      );
    case 'contrast':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5v17" />
          <path
            d="M12 3.5a8.5 8.5 0 0 1 0 17Z"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="none"
          />
        </>
      );
    case 'export':
      return (
        <>
          <polyline points="8 8 4 12 8 16" />
          <polyline points="16 8 20 12 16 16" />
          <line x1="13.5" y1="6" x2="10.5" y2="18" />
        </>
      );
    case 'tokens':
      return (
        <>
          <polygon points="12 3 20 7.5 12 12 4 7.5 12 3" />
          <polyline points="4 12 12 16.5 20 12" />
          <polyline points="4 16.5 12 21 20 16.5" />
        </>
      );
    case 'sidebar-left':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="9" y1="4" x2="9" y2="20" />
        </>
      );
    case 'sidebar-right':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="15" y1="4" x2="15" y2="20" />
        </>
      );
    case 'menu':
      return (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      );
    case 'close':
      return (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      );
    case 'sun':
      return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2" />
          <path d="M12 19.5v2" />
          <path d="m5.3 5.3 1.4 1.4" />
          <path d="m17.3 17.3 1.4 1.4" />
          <path d="M2.5 12h2" />
          <path d="M19.5 12h2" />
          <path d="m5.3 18.7 1.4-1.4" />
          <path d="m17.3 6.7 1.4-1.4" />
        </>
      );
    case 'moon':
      return (
        <path d="M20.2 14.8A8.5 8.5 0 0 1 9.2 3.8a8.5 8.5 0 1 0 11 11Z" />
      );
    case 'globe':
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.6 12h16.8" />
          <path d="M12 3.5a13 13 0 0 1 3.4 8.5A13 13 0 0 1 12 20.5a13 13 0 0 1-3.4-8.5A13 13 0 0 1 12 3.5Z" />
        </>
      );
    case 'android':
      return (
        <>
          <rect x="6" y="3" width="12" height="18" rx="2.25" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </>
      );
    case 'chevron-right':
      return <polyline points="9 6 15 12 9 18" />;
    case 'sliders':
      return (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="17" x2="20" y2="17" />
          <circle cx="9" cy="7" r="2" fill="var(--cs-surface)" />
          <circle cx="15" cy="17" r="2" fill="var(--cs-surface)" />
        </>
      );
    case 'check':
      return <polyline points="5 12.5 9.5 17 19 7" />;
    case 'copy':
      return (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </>
      );
    case 'reset':
      return (
        <>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <polyline points="3 3 3 8 8 8" />
        </>
      );
    case 'pipette':
      return (
        <>
          <path d="m2 22 1-1h3l9-9" />
          <path d="M3 21v-3l9-9" />
          <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" />
        </>
      );
    case 'terminal':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <polyline points="7.5 9.5 10.5 12 7.5 14.5" />
          <line x1="12.5" y1="14.5" x2="16.5" y2="14.5" />
        </>
      );
    case 'grid':
      return (
        <>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
        </>
      );
  }
}
