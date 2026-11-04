import { SITE_CONFIG } from '@/config/site';
import type { TranslationDictionary } from '@/i18n';
import { withBase } from '@/lib/url';
import type { Language, PlatformTarget, ThemeMode } from '@/types/ui';
import type { WorkspaceSectionId } from '@/types/navigation';
import {
  Badge,
  Divider,
  Icon,
  IconButton,
  SegmentedControl,
  type SegmentedOption,
} from '@/components/ui';

const PLATFORM_OPTIONS: readonly SegmentedOption<PlatformTarget>[] = [
  {
    value: 'web',
    label: 'Web',
    icon: <Icon name="globe" size={13} />,
  },
  {
    value: 'android',
    label: 'Android',
    icon: <Icon name="android" size={13} />,
  },
];

const LANGUAGE_OPTIONS: readonly SegmentedOption<Language>[] = [
  { value: 'bn', label: 'বাংলা' },
  { value: 'en', label: 'EN' },
];

export interface AppHeaderProps {
  activeSection: WorkspaceSectionId;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationDictionary;
  theme: ThemeMode;
  onToggleTheme: () => void;
  platformTarget: PlatformTarget;
  onPlatformChange: (target: PlatformTarget) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  mobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  inspectorOpen: boolean;
  onToggleInspector: () => void;
}

export function AppHeader({
  activeSection,
  lang,
  onLanguageChange,
  t,
  theme,
  onToggleTheme,
  platformTarget,
  onPlatformChange,
  sidebarCollapsed,
  onToggleSidebar,
  mobileNavOpen,
  onToggleMobileNav,
  inspectorOpen,
  onToggleInspector,
}: AppHeaderProps) {
  const activeItemLabel = t.nav.items[activeSection].label;

  return (
    <header className="w-full max-w-full h-12 px-2.5 sm:px-4 bg-surface border-b border-line flex items-center justify-between gap-2 shrink-0 z-20">
      {/* Left: Navigation toggles + Brand + Breadcrumb */}
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
        <IconButton
          label={mobileNavOpen ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav-drawer"
          onClick={onToggleMobileNav}
          size="sm"
          className="lg:hidden"
        >
          <Icon name={mobileNavOpen ? 'close' : 'menu'} size={17} />
        </IconButton>

        <IconButton
          label={
            sidebarCollapsed
              ? t.header.expandSidebar
              : t.header.collapseSidebar
          }
          active={!sidebarCollapsed}
          onClick={onToggleSidebar}
          className="hidden lg:inline-flex"
          size="sm"
        >
          <Icon name="sidebar-left" size={15} />
        </IconButton>

        <Divider orientation="vertical" subtle className="hidden sm:block mx-0.5" />

        <a
          href={withBase('/')}
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-sm py-1 px-1 -mx-1 hover:bg-surface-subtle transition-colors min-w-0"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink text-canvas shrink-0">
            <Icon name="studio" size={14} />
          </span>
          <span className="text-[13px] font-semibold tracking-tight text-ink truncate">
            {SITE_CONFIG.name}
          </span>
        </a>

        <Badge variant="outline" mono className="hidden xl:inline-flex">
          v{SITE_CONFIG.version}
        </Badge>

        <span
          aria-hidden="true"
          className="text-ink-disabled text-[13px] select-none hidden md:inline"
        >
          /
        </span>

        <span className="text-[13px] font-medium text-ink-secondary truncate hidden md:inline">
          {activeItemLabel}
        </span>
      </div>

      {/* Right: Platform switcher, Language switcher, Theme, Inspector */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <div className="hidden md:block">
          <SegmentedControl
            label={t.header.platformGroupLabel}
            options={PLATFORM_OPTIONS}
            value={platformTarget}
            onChange={onPlatformChange}
            size="sm"
          />
        </div>

        <SegmentedControl
          label={t.header.languageGroupLabel}
          options={LANGUAGE_OPTIONS}
          value={lang}
          onChange={onLanguageChange}
          size="sm"
        />

        <Divider orientation="vertical" subtle className="hidden sm:block mx-0.5" />

        <IconButton
          label={
            theme === 'light' ? t.header.switchToDark : t.header.switchToLight
          }
          onClick={onToggleTheme}
          size="sm"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={15} />
        </IconButton>

        <IconButton
          label={
            inspectorOpen ? t.header.hideInspector : t.header.showInspector
          }
          active={inspectorOpen}
          onClick={onToggleInspector}
          size="sm"
        >
          <Icon name="sidebar-right" size={15} />
        </IconButton>
      </div>
    </header>
  );
}
