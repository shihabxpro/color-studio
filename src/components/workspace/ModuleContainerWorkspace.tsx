import type { WorkspaceSectionId } from '@/types/navigation';
import type { IconName } from '@/types/ui';
import { WorkspaceShell } from '@/components/layout';
import {
  Badge,
  ButtonLink,
  EmptyState,
  Icon,
  Panel,
  SectionHeader,
  Toolbar,
} from '@/components/ui';

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
              <div className="flex items-center gap-2 min-w-0 flex-wrap">
                <Icon name={icon} size={14} className="text-ink-muted" />
                <span className="text-[12px] font-medium text-ink truncate">
                  {mod.toolbarTitle}
                </span>
                <Badge variant="outline">{mod.toolbarBadge}</Badge>
              </div>
            }
            trailing={
              <ButtonLink href="/" variant="ghost" size="sm">
                {t.common.backToOverview}
              </ButtonLink>
            }
          />
        );
      }}
    >
      {(t) => {
        const mod = t.modules[sectionId];
        return (
          <div className="space-y-5 sm:space-y-6 min-w-0">
            <SectionHeader
              title={mod.heading}
              badge={<Badge variant="neutral">{mod.statusBadge}</Badge>}
              description={mod.summary}
            />

            <EmptyState
              icon={icon}
              meta={`MODULE BOUNDARY · /${sectionId}`}
              title={mod.emptyTitle}
              description={mod.emptyDescription}
              action={
                <ButtonLink href="/foundation" variant="secondary" size="sm">
                  {t.common.reviewPrimitives}
                </ButtonLink>
              }
            />

            <Panel
              title={mod.scopeHeading}
              meta={<Badge variant="outline">{mod.scopeBadge}</Badge>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                {mod.moduleScope.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 p-3 rounded-sm bg-surface-subtle/60 border border-line-subtle space-y-1"
                  >
                    <div className="text-[12px] font-medium text-ink break-words">
                      {item.label}
                    </div>
                    <p className="text-[12px] text-ink-muted leading-relaxed break-words">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        );
      }}
    </WorkspaceShell>
  );
}
