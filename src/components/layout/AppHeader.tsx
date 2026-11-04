import { SITE_CONFIG } from '@/config/site';
import { getNavItemById } from '@/config/navigation';
import { withBase } from '@/lib/url';
import type { PlatformTarget, ThemeMode } from '@/types/ui';
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

export interface AppHeaderProps {
  activeSection: WorkspaceSectionId;
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
  const currentNav = getNavItemById(activeSection);

  return (
    <header className="h-12 px-3 sm:px-4 bg-surface border-b border-line flex items-center justify-between gap-3 shrink-0 z-20">
      {/* Left: Navigation toggles + Brand + Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <IconButton
          label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav-drawer"
          onClick={onToggleMobileNav}
          className="lg:hidden"
        >
          <Icon name={mobileNavOpen ? 'close' : 'menu'} size={17} />
        </IconButton>

        <IconButton
          label={
            sidebarCollapsed
              ? 'Expand navigation sidebar ([)'
              : 'Collapse navigation sidebar ([)'
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
          className="inline-flex items-center gap-2 rounded-sm py-1 px-1 -mx-1 hover:bg-surface-subtle transition-colors min-w-0"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink text-canvas shrink-0">
            <Icon name="studio" size={14} />
          </span>
          <span className="text-[13px] font-semibold tracking-tight text-ink whitespace-nowrap">
            {SITE_CONFIG.name}
          </span>
        </a>

        <Badge variant="outline" mono className="hidden md:inline-flex">
          v{SITE_CONFIG.version}
        </Badge>

        <span
          aria-hidden="true"
          className="text-ink-disabled text-[13px] select-none hidden sm:inline"
        >
          /
        </span>

        <span className="text-[13px] font-medium text-ink-secondary truncate hidden sm:inline">
          {currentNav.label}
        </span>
      </div>

      {/* Right: Target context, theme toggle, inspector toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="hidden sm:block">
          <SegmentedControl
            label="Target platform context"
            options={PLATFORM_OPTIONS}
            value={platformTarget}
            onChange={onPlatformChange}
            size="sm"
          />
        </div>

        <Divider orientation="vertical" subtle className="hidden sm:block mx-0.5" />

        <IconButton
          label={
            theme === 'light'
              ? 'Switch to dark neutral surface'
              : 'Switch to light neutral surface'
          }
          onClick={onToggleTheme}
          size="sm"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={15} />
        </IconButton>

        <IconButton
          label={
            inspectorOpen
              ? 'Hide inspector panel (])'
              : 'Show inspector panel (])'
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
