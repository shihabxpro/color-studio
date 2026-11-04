import type { IconName } from './ui';

export type WorkspaceSectionId =
  | 'workspace'
  | 'palettes'
  | 'contrast'
  | 'export'
  | 'foundation';

export interface NavItem {
  id: WorkspaceSectionId;
  label: string;
  path: string;
  href: string;
  icon: IconName;
  description: string;
  shortcut?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export interface InspectorProperty {
  label: string;
  value: string;
  mono?: boolean;
}

export interface InspectorSection {
  title: string;
  properties: InspectorProperty[];
}
