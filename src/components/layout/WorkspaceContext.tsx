import { createContext, useContext } from 'react';
import type { PlatformTarget, ThemeMode } from '@/types/ui';
import type { WorkspaceSectionId } from '@/types/navigation';

export interface WorkspaceContextValue {
  activeSection: WorkspaceSectionId;
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

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(
  null
);

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within WorkspaceShell');
  }
  return ctx;
}
