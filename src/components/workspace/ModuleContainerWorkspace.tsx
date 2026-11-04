import type { WorkspaceSectionId } from '@/types/navigation';
import type { IconName } from '@/types/ui';
import { WorkspaceShell } from '@/components/layout';
import { ButtonLink, EmptyState, Icon, Toolbar } from '@/components/ui';

export interface ModuleContainerWorkspaceProps {
  sectionId: Exclude<WorkspaceSectionId, 'workspace' | 'foundation'>;
  icon: IconName;
}

export function ModuleContainerWorkspace({
  sectionId,
  icon,
}: ModuleContainerWorkspaceProps) {
  return (
    <WorkspaceShell
      activeSection={sectionId}
      pageTitle={(t) => t.modules[sectionId].pageTitle}
      inspectorSections={(t) => t.modules[sectionId].inspectorSections}
      toolbar={(t) => {
        const mod = t.modules[sectionId];
        return (
          <Toolbar
            leading={
              <div className="flex items-center gap-2 min-w-0">
                <Icon name={icon} size={14} className="text-ink-muted" />
                <span className="text-[12px] font-semibold text-ink truncate">
                  {mod.toolbarTitle}
                </span>
              </div>
            }
            trailing={
              <ButtonLink href="/" variant="ghost" size="sm">
                {t.common.backToPicker}
              </ButtonLink>
            }
          />
        );
      }}
    >
      {(t) => {
        const mod = t.modules[sectionId];
        return (
          <EmptyState
            icon={icon}
            title={mod.emptyTitle}
            description={mod.emptyDescription}
            action={
              <ButtonLink href="/" variant="secondary" size="sm">
                {t.common.backToPicker}
              </ButtonLink>
            }
          />
        );
      }}
    </WorkspaceShell>
  );
}
