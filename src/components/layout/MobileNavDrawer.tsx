import { useEffect } from 'react';
import { NAVIGATION_GROUPS } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';
import type { TranslationDictionary } from '@/i18n';
import type { WorkspaceSectionId } from '@/types/navigation';
import type { Language, PlatformTarget, ThemeMode } from '@/types/ui';
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

const LANGUAGE_OPTIONS: readonly SegmentedOption<Language>[] = [
  { value: 'bn', label: 'বাংলা' },
  { value: 'en', label: 'English' },
];

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  activeSection: WorkspaceSectionId;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationDictionary;
  platformTarget: PlatformTarget;
  onPlatformChange: (target: PlatformTarget) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function MobileNavDrawer({
  open,
  onClose,
  activeSection,
  lang,
  onLanguageChange,
  t,
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
      aria-label={t.nav.mobileDrawerAriaLabel}
      className="fixed inset-0 z-40 flex lg:hidden"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-overlay backdrop-blur-[1px]"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 flex w-72 max-w-[86vw] flex-col bg-surface-elevated border-r border-line shadow-overlay">
        <div className="h-12 px-3.5 border-b border-line flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink text-canvas shrink-0">
              <Icon name="studio" size={14} />
            </span>
            <span className="text-[13px] font-semibold text-ink truncate">
              {SITE_CONFIG.name}
            </span>
            <Badge variant="outline" mono>
              v{SITE_CONFIG.version}
            </Badge>
          </div>
          <IconButton label={t.header.closeMenu} size="sm" onClick={onClose}>
            <Icon name="close" size={16} />
          </IconButton>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {NAVIGATION_GROUPS.map((group) => {
            const groupLabel =
              group.id === 'studio' ? t.nav.groups.studio : t.nav.groups.system;

            return (
              <div key={group.id} className="space-y-1.5">
                <div className="px-2.5 text-[11px] font-semibold text-ink-muted">
                  {groupLabel}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = item.id === activeSection;
                    const localized = t.nav.items[item.id];
                    return (
                      <li key={item.id}>
                        <a
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-2.5 rounded-sm px-2.5 h-9 transition-colors',
                            isActive
                              ? 'bg-surface-subtle text-ink font-medium border border-line'
                              : 'text-ink-secondary border border-transparent hover:bg-surface-subtle/60 hover:text-ink'
                          )}
                        >
                          <Icon
                            name={item.icon}
                            size={15}
                            className={
                              isActive ? 'text-accent' : 'text-ink-muted'
                            }
                          />
                          <span className="text-[13px] truncate">
                            {localized.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Mobile Language, Platform & Surface Controls */}
        <div className="p-3 border-t border-line bg-surface-subtle/50 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-ink-secondary">
              {t.nav.languageLabel}
            </span>
            <SegmentedControl
              label={t.header.languageGroupLabel}
              options={LANGUAGE_OPTIONS}
              value={lang}
              onChange={onLanguageChange}
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-ink-secondary">
              {t.nav.targetLabel}
            </span>
            <SegmentedControl
              label={t.header.platformGroupLabel}
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
            {theme === 'light' ? t.nav.switchToDarkFull : t.nav.switchToLightFull}
          </Button>
        </div>
      </div>
    </div>
  );
}
