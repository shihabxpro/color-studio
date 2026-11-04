import { SITE_CONFIG } from '@/config/site';
import { getNavItemById } from '@/config/navigation';
import type { WorkspaceSectionId } from '@/types/navigation';
import type { PlatformTarget, ThemeMode } from '@/types/ui';

export interface StatusBarProps {
  activeSection: WorkspaceSectionId;
  platformTarget: PlatformTarget;
  theme: ThemeMode;
}

export function StatusBar({
  activeSection,
  platformTarget,
  theme,
}: StatusBarProps) {
  const currentNav = getNavItemById(activeSection);
  const platform = SITE_CONFIG.platforms[platformTarget];

  return (
    <footer
      aria-label="Workspace status"
      className="h-7 px-3 sm:px-4 bg-surface border-t border-line flex items-center justify-between gap-4 text-[11px] font-mono text-ink-muted shrink-0 select-none"
    >
      <div className="flex items-center gap-3 min-w-0 truncate">
        <span className="inline-flex items-center gap-1.5 text-ink-secondary">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span>Ready</span>
        </span>
        <span aria-hidden="true" className="text-line-strong">
          ·
        </span>
        <span className="truncate">{currentNav.path}</span>
        <span
          aria-hidden="true"
          className="text-line-strong hidden md:inline"
        >
          ·
        </span>
        <span className="hidden md:inline">Achromatic UI (C=0)</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span>Target: {platform.label}</span>
        <span aria-hidden="true" className="text-line-strong hidden sm:inline">
          ·
        </span>
        <span className="hidden sm:inline capitalize">{theme}</span>
      </div>
    </footer>
  );
}
