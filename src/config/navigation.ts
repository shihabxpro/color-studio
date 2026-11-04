import { withBase } from '@/lib/url';
import type { NavGroup, NavItem, WorkspaceSectionId } from '@/types/navigation';

export const NAVIGATION_GROUPS: NavGroup[] = [
  {
    id: 'studio',
    label: 'Workspace',
    items: [
      {
        id: 'workspace',
        label: 'Overview',
        path: '/',
        href: withBase('/'),
        icon: 'workspace',
        description: 'Workspace shell, target specifications, and layout regions.',
        shortcut: '1',
      },
      {
        id: 'palettes',
        label: 'Palettes',
        path: '/palettes',
        href: withBase('/palettes'),
        icon: 'swatches',
        description: 'Dedicated canvas container for color sets and tonal scales.',
        shortcut: '2',
      },
      {
        id: 'contrast',
        label: 'Contrast',
        path: '/contrast',
        href: withBase('/contrast'),
        icon: 'contrast',
        description: 'Surface and foreground legibility verification workspace.',
        shortcut: '3',
      },
      {
        id: 'export',
        label: 'Export',
        path: '/export',
        href: withBase('/export'),
        icon: 'export',
        description: 'Web CSS and Android Compose / XML token output container.',
        shortcut: '4',
      },
    ],
  },
  {
    id: 'system',
    label: 'Architecture',
    items: [
      {
        id: 'foundation',
        label: 'UI Foundation',
        path: '/foundation',
        href: withBase('/foundation'),
        icon: 'tokens',
        description: 'Design tokens, typography, spacing scale, and reusable UI primitives.',
        shortcut: '5',
      },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAVIGATION_GROUPS.flatMap(
  (group) => group.items
);

export function getNavItemById(id: WorkspaceSectionId): NavItem {
  return ALL_NAV_ITEMS.find((item) => item.id === id) ?? ALL_NAV_ITEMS[0];
}
