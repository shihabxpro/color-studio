export const STORAGE_KEYS = {
  theme: 'cs:theme',
  sidebarCollapsed: 'cs:sidebar-collapsed',
  inspectorOpen: 'cs:inspector-open',
  platformTarget: 'cs:platform-target',
} as const;

export function readStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}
