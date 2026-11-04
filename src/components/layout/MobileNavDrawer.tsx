import { useEffect } from 'react';
import { NAVIGATION_GROUPS } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';
import type { WorkspaceSectionId } from '@/types/navigation';
import type { PlatformTarget, ThemeMode } from '@/types/ui';
import { cn } from '@/lib/cn';
import {
  Badge,
  Button,
  Icon,
  IconButton,
  SegmentedControl,
  type SegmentedOption,
} from '@/components/ui';

const PLATFORM_OPTIONS: readonly SegmentedOption<PlatformTarget>[] = [
  { value: 'web', label: 'Web' },
  { value: 'android', label: 'Android' },
];

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  activeSection: WorkspaceSectionId;
  platformTarget: PlatformTarget;
  onPlatformChange: (target: PlatformTarget) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function MobileNavDrawer({
  open,
  onClose,
  activeSection,
  platformTarget,
  onPlatformChange,
  theme,
  onToggleTheme,
}: MobileNavDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-40 flex lg:hidden"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-overlay backdrop-blur-[1px]"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 flex w-72 max-w-[85vw] flex-col bg-surface-elevated border-r border-line shadow-overlay">
        <div className="h-12 px-3.5 border-b border-line flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink text-canvas">
              <Icon name="studio" size={14} />
            </span>
            <span className="text-[13px] font-semibold text-ink">
              {SITE_CONFIG.name}
            </span>
            <Badge variant="outline" mono>
              v{SITE_CONFIG.version}
            </Badge>
          </div>
          <IconButton label="Close menu" size="sm" onClick={onClose}>
            <Icon name="close" size={16} />
          </IconButton>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.id} className="space-y-1.5">
              <div className="px-2.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                {group.label}
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.id === activeSection;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={onClose}
                        className={cn(
                          'flex items-start gap-2.5 rounded-sm px-2.5 py-2 transition-colors',
                          isActive
                            ? 'bg-surface-subtle text-ink border border-line'
                            : 'text-ink-secondary border border-transparent hover:bg-surface-subtle/60 hover:text-ink'
                        )}
                      >
                        <Icon
                          name={item.icon}
                          size={16}
                          className={cn(
                            'mt-0.5',
                            isActive ? 'text-accent' : 'text-ink-muted'
                          )}
                        />
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium leading-tight">
                            {item.label}
                          </div>
                          <p className="mt-0.5 text-[11px] text-ink-muted leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Mobile Environment & Surface Controls */}
        <div className="p-3 border-t border-line bg-surface-subtle/50 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-ink-secondary">
              Target
            </span>
            <SegmentedControl
              label="Target platform"
              options={PLATFORM_OPTIONS}
              value={platformTarget}
              onChange={onPlatformChange}
              size="sm"
            />
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={onToggleTheme}
            leadingIcon={
              <Icon name={theme === 'light' ? 'moon' : 'sun'} size={14} />
            }
            className="w-full justify-center"
          >
            {theme === 'light' ? 'Switch to Dark Surface' : 'Switch to Light Surface'}
          </Button>
        </div>
      </div>
    </div>
  );
}
