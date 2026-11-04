import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ALL_NAV_ITEMS } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';
import {
  DEFAULT_LANGUAGE,
  getDictionary,
  isSupportedLanguage,
  type TranslationDictionary,
} from '@/i18n';
import { readStorage, STORAGE_KEYS, writeStorage } from '@/lib/storage';
import type { InspectorSection, WorkspaceSectionId } from '@/types/navigation';
import type { Language, PlatformTarget, ThemeMode } from '@/types/ui';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { InspectorPanel } from './InspectorPanel';
import { MobileNavDrawer } from './MobileNavDrawer';
import { StatusBar } from './StatusBar';
import { WorkspaceContext } from './WorkspaceContext';

export interface WorkspaceShellProps {
  activeSection: WorkspaceSectionId;
  pageTitle?: (t: TranslationDictionary) => string;
  inspectorSections?: (t: TranslationDictionary) => InspectorSection[];
  toolbar?: (t: TranslationDictionary) => ReactNode;
  children: (t: TranslationDictionary) => ReactNode;
}

export function WorkspaceShell({
  activeSection,
  pageTitle,
  inspectorSections,
  toolbar,
  children,
}: WorkspaceShellProps) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [platformTarget, setPlatformTargetState] =
    useState<PlatformTarget>('web');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [desktopInspectorOpen, setDesktopInspectorOpen] =
    useState<boolean>(true);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] =
    useState<boolean>(false);

  // Hydrate persisted language & shell preferences on mount
  useEffect(() => {
    const storedLang = readStorage(STORAGE_KEYS.language);
    const domLang = document.documentElement.getAttribute('data-lang');
    const resolvedLang: Language = isSupportedLanguage(storedLang)
      ? storedLang
      : isSupportedLanguage(domLang)
        ? domLang
        : DEFAULT_LANGUAGE;

    setLangState(resolvedLang);
    document.documentElement.lang = resolvedLang;
    document.documentElement.setAttribute('data-lang', resolvedLang);

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

  const t = useMemo(() => getDictionary(lang), [lang]);

  // Keep document title synchronized with selected language
  useEffect(() => {
    const resolvedTitle = pageTitle
      ? pageTitle(t)
      : t.nav.items[activeSection].label;
    document.title = `${resolvedTitle} — ${SITE_CONFIG.name}`;
  }, [activeSection, pageTitle, t]);

  const setLanguage = useCallback((next: Language) => {
    setLangState(next);
    document.documentElement.lang = next;
    document.documentElement.setAttribute('data-lang', next);
    writeStorage(STORAGE_KEYS.language, next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'bn' ? 'en' : 'bn');
  }, [lang, setLanguage]);

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

  const resolvedInspectorSections = useMemo(
    () => (inspectorSections ? inspectorSections(t) : []),
    [inspectorSections, t]
  );

  const contextValue = useMemo(
    () => ({
      activeSection,
      lang,
      setLanguage,
      toggleLanguage,
      t,
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
      lang,
      setLanguage,
      toggleLanguage,
      t,
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
      <div className="min-h-dvh w-full max-w-full overflow-x-clip lg:h-dvh lg:overflow-hidden flex flex-col bg-canvas text-ink">
        <AppHeader
          activeSection={activeSection}
          lang={lang}
          onLanguageChange={setLanguage}
          t={t}
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
          lang={lang}
          onLanguageChange={setLanguage}
          t={t}
          platformTarget={platformTarget}
          onPlatformChange={setPlatformTarget}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="flex-1 min-h-0 min-w-0 flex">
          <AppSidebar
            activeSection={activeSection}
            collapsed={sidebarCollapsed}
            t={t}
          />

          <main
            id="workspace-main"
            className="flex-1 min-w-0 max-w-full flex flex-col bg-canvas"
          >
            {toolbar ? toolbar(t) : null}
            <div className="flex-1 min-w-0 lg:overflow-y-auto studio-grid-bg">
              <div className="mx-auto w-full max-w-6xl p-3.5 sm:p-6 min-w-0">
                {children(t)}
              </div>
            </div>
          </main>

          <InspectorPanel
            desktopOpen={desktopInspectorOpen}
            mobileOpen={mobileInspectorOpen}
            onCloseMobile={() => setMobileInspectorOpen(false)}
            onToggleDesktop={toggleDesktopInspector}
            sectionTitle={t.nav.items[activeSection].label}
            platformTarget={platformTarget}
            theme={theme}
            t={t}
            sections={resolvedInspectorSections}
          />
        </div>

        <StatusBar
          activeSection={activeSection}
          platformTarget={platformTarget}
          theme={theme}
          t={t}
        />
      </div>
    </WorkspaceContext.Provider>
  );
}
