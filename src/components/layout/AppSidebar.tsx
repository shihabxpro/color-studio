import { NAVIGATION_GROUPS } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';
import type { WorkspaceSectionId } from '@/types/navigation';
import { cn } from '@/lib/cn';
import { Icon, Kbd } from '@/components/ui';

export interface AppSidebarProps {
  activeSection: WorkspaceSectionId;
  collapsed: boolean;
}

export function AppSidebar({ activeSection, collapsed }: AppSidebarProps) {
  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        'hidden lg:flex flex-col shrink-0 bg-surface-subtle/65 border-r border-line select-none transition-[width] duration-150 ease-out',
        collapsed ? 'w-14' : 'w-56'
      )}
    >
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.id} className="space-y-1">
            {!collapsed ? (
              <div className="px-2.5 pb-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                {group.label}
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="mx-2 my-1 h-px bg-line-subtle"
              />
            )}

            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.id === activeSection;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      title={
                        collapsed
                          ? `${item.label} (${item.shortcut ?? ''})`
                          : item.description
                      }
                      className={cn(
                        'group relative flex items-center rounded-sm text-[13px] transition-colors duration-120',
                        collapsed
                          ? 'h-9 w-9 mx-auto justify-center'
                          : 'h-8 px-2.5 justify-between gap-2',
                        isActive
                          ? 'bg-surface text-ink font-medium border border-line shadow-xs'
                          : 'text-ink-secondary border border-transparent hover:bg-surface/70 hover:text-ink'
                      )}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          name={item.icon}
                          size={15}
                          className={cn(
                            'transition-colors',
                            isActive
                              ? 'text-accent'
                              : 'text-ink-muted group-hover:text-ink-secondary'
                          )}
                        />
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </span>

                      {!collapsed && item.shortcut && (
                        <Kbd
                          className={cn(
                            'opacity-0 group-hover:opacity-100 transition-opacity',
                            isActive && 'opacity-100'
                          )}
                        >
                          {item.shortcut}
                        </Kbd>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar footer shortcut reference */}
      <div className="p-2 border-t border-line-subtle">
        {collapsed ? (
          <div
            className="flex items-center justify-center py-1 text-ink-muted"
            title={`Press ${SITE_CONFIG.shortcuts.toggleSidebar} to expand sidebar`}
          >
            <Kbd>{SITE_CONFIG.shortcuts.toggleSidebar}</Kbd>
          </div>
        ) : (
          <div className="flex items-center justify-between px-2 py-1 text-[11px] text-ink-muted">
            <span>Toggle rail</span>
            <Kbd>{SITE_CONFIG.shortcuts.toggleSidebar}</Kbd>
          </div>
        )}
      </div>
    </aside>
  );
}
