import { SITE_CONFIG } from '@/config/site';
import { getNavItemById } from '@/config/navigation';
import type { TranslationDictionary } from '@/i18n';
import type { WorkspaceSectionId } from '@/types/navigation';
import type { PlatformTarget, ThemeMode } from '@/types/ui';

export interface StatusBarProps {
  activeSection: WorkspaceSectionId;
  platformTarget: PlatformTarget;
  theme: ThemeMode;
  t: TranslationDictionary;
}

export function StatusBar({
  activeSection,
  platformTarget,
  theme,
  t,
}: StatusBarProps) {
  const currentNav = getNavItemById(activeSection);
  const platform = SITE_CONFIG.platforms[platformTarget];
  const themeText =
    theme === 'light' ? t.inspector.themeLight : t.inspector.themeDark;

  return (
    <footer
      aria-label={t.statusBar.ariaLabel}
      className="w-full max-w-full overflow-hidden h-7 px-3 sm:px-4 bg-surface border-t border-line flex items-center justify-between gap-2 text-[11px] text-ink-muted shrink-0 select-none"
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
        <span className="inline-flex items-center gap-1.5 text-ink-secondary shrink-0">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span>{t.statusBar.ready}</span>
        </span>
        <span aria-hidden="true" className="text-line-strong shrink-0">
          ·
        </span>
        <span className="font-mono truncate">{currentNav.path}</span>
        <span
          aria-hidden="true"
          className="text-line-strong hidden md:inline shrink-0"
        >
          ·
        </span>
        <span className="hidden md:inline truncate">
          {t.statusBar.achromaticLabel}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <span className="whitespace-nowrap">
          {t.statusBar.targetPrefix}{' '}
          <span className="font-mono">{platform.label}</span>
        </span>
        <span aria-hidden="true" className="text-line-strong hidden sm:inline">
          ·
        </span>
        <span className="hidden sm:inline whitespace-nowrap">{themeText}</span>
      </div>
    </footer>
  );
}
