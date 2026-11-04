import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ALL_NAV_ITEMS, getNavItemById } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';
import { readStorage, STORAGE_KEYS, writeStorage } from '@/lib/storage';
import type { InspectorSection, WorkspaceSectionId } from '@/types/navigation';
import type { PlatformTarget, ThemeMode } from '@/types/ui';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { InspectorPanel } from './InspectorPanel';
import { MobileNavDrawer } from './MobileNavDrawer';
import { StatusBar } from './StatusBar';
import { WorkspaceContext } from './WorkspaceContext';

export interface WorkspaceShellProps {
  activeSection: WorkspaceSectionId;
  inspectorSections?: InspectorSection[];
  toolbar?: ReactNode;
  children: ReactNode;
}

export function WorkspaceShell({
  activeSection,
  inspectorSections,
  toolbar,
  children,
}: WorkspaceShellProps) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [platformTarget, setPlatformTargetState] =
    useState<PlatformTarget>('web');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [desktopInspectorOpen, setDesktopInspectorOpen] =
    useState<boolean>(true);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] =
    useState<boolean>(false);

  // Hydrate persisted shell preferences on mount
  useEffect(() => {
    const domTheme = document.documentElement.getAttribute('data-theme');
    if (domTheme === 'dark' || domTheme === 'light') {
      setThemeState(domTheme);
    }

    const storedPlatform = readStorage(STORAGE_KEYS.platformTarget);
    if (storedPlatform === 'web' || storedPlatform === 'android') {
      setPlatformTargetState(storedPlatform);
    }

    const storedSidebar = readStorage(STORAGE_KEYS.sidebarCollapsed);
    if (storedSidebar === 'true') {
      setSidebarCollapsed(true);
    }

    const storedInspector = readStorage(STORAGE_KEYS.inspectorOpen);
    if (storedInspector === 'false') {
      setDesktopInspectorOpen(false);
    }
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    writeStorage(STORAGE_KEYS.theme, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const setPlatformTarget = useCallback((next: PlatformTarget) => {
    setPlatformTargetState(next);
    writeStorage(STORAGE_KEYS.platformTarget, next);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      writeStorage(STORAGE_KEYS.sidebarCollapsed, String(next));
      return next;
    });
  }, []);

  const toggleDesktopInspector = useCallback(() => {
    setDesktopInspectorOpen((prev) => {
      const next = !prev;
      writeStorage(STORAGE_KEYS.inspectorOpen, String(next));
      return next;
    });
  }, []);

  const toggleInspector = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileInspectorOpen((prev) => !prev);
    } else {
      toggleDesktopInspector();
    }
  }, [toggleDesktopInspector]);

  // Global keyboard shortcuts for developer ergonomics
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === SITE_CONFIG.shortcuts.toggleSidebar) {
        event.preventDefault();
        toggleSidebar();
        return;
      }

      if (event.key === SITE_CONFIG.shortcuts.toggleInspector) {
        event.preventDefault();
        toggleInspector();
        return;
      }

      const matchedNav = ALL_NAV_ITEMS.find(
        (item) => item.shortcut === event.key
      );
      if (matchedNav && matchedNav.id !== activeSection) {
        window.location.assign(matchedNav.href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, toggleSidebar, toggleInspector]);

  const currentNav = getNavItemById(activeSection);

  const contextValue = useMemo(
    () => ({
      activeSection,
      theme,
      setTheme,
      toggleTheme,
      platformTarget,
      setPlatformTarget,
      sidebarCollapsed,
      toggleSidebar,
      inspectorOpen: desktopInspectorOpen || mobileInspectorOpen,
      toggleInspector,
    }),
    [
      activeSection,
      theme,
      setTheme,
      toggleTheme,
      platformTarget,
      setPlatformTarget,
      sidebarCollapsed,
      toggleSidebar,
      desktopInspectorOpen,
      mobileInspectorOpen,
      toggleInspector,
    ]
  );

  return (
    <WorkspaceContext.Provider value={contextValue}>
      <div className="min-h-dvh lg:h-dvh lg:overflow-hidden flex flex-col bg-canvas text-ink">
        <AppHeader
          activeSection={activeSection}
          theme={theme}
          onToggleTheme={toggleTheme}
          platformTarget={platformTarget}
          onPlatformChange={setPlatformTarget}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          mobileNavOpen={mobileNavOpen}
          onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)}
          inspectorOpen={desktopInspectorOpen || mobileInspectorOpen}
          onToggleInspector={toggleInspector}
        />

        <MobileNavDrawer
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          activeSection={activeSection}
          platformTarget={platformTarget}
          onPlatformChange={setPlatformTarget}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="flex-1 min-h-0 flex">
          <AppSidebar
            activeSection={activeSection}
            collapsed={sidebarCollapsed}
          />

          <main
            id="workspace-main"
            className="flex-1 min-w-0 flex flex-col bg-canvas"
          >
            {toolbar}
            <div className="flex-1 overflow-y-auto studio-grid-bg">
              <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
                {children}
              </div>
            </div>
          </main>

          <InspectorPanel
            desktopOpen={desktopInspectorOpen}
            mobileOpen={mobileInspectorOpen}
            onCloseMobile={() => setMobileInspectorOpen(false)}
            onToggleDesktop={toggleDesktopInspector}
            sectionTitle={currentNav.label}
            platformTarget={platformTarget}
            theme={theme}
            sections={inspectorSections}
          />
        </div>

        <StatusBar
          activeSection={activeSection}
          platformTarget={platformTarget}
          theme={theme}
        />
      </div>
    </WorkspaceContext.Provider>
  );
}
