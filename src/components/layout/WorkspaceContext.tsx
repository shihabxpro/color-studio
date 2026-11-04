import { createContext, useContext } from 'react';
import { DEFAULT_LANGUAGE, getDictionary, type TranslationDictionary } from '@/i18n';
import type { Language, PlatformTarget, ThemeMode } from '@/types/ui';
import type { WorkspaceSectionId } from '@/types/navigation';

export interface WorkspaceContextValue {
  activeSection: WorkspaceSectionId;
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  platformTarget: PlatformTarget;
  setPlatformTarget: (target: PlatformTarget) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  inspectorOpen: boolean;
  toggleInspector: () => void;
}

export const WorkspaceContext = createContext<WorkspaceContextValue>({
  activeSection: 'workspace',
  lang: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: getDictionary(DEFAULT_LANGUAGE),
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  platformTarget: 'web',
  setPlatformTarget: () => {},
  sidebarCollapsed: false,
  toggleSidebar: () => {},
  inspectorOpen: true,
  toggleInspector: () => {},
});

export function useWorkspace(): WorkspaceContextValue {
  return useContext(WorkspaceContext);
}
