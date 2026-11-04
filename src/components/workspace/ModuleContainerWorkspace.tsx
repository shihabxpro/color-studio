import type { InspectorSection, WorkspaceSectionId } from '@/types/navigation';
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
  title: string;
  summary: string;
  emptyTitle: string;
  emptyDescription: string;
  moduleScope: readonly { label: string; detail: string }[];
  inspectorSections: InspectorSection[];
}

export function ModuleContainerWorkspace({
  sectionId,
  icon,
  title,
  summary,
  emptyTitle,
  emptyDescription,
  moduleScope,
  inspectorSections,
}: ModuleContainerWorkspaceProps) {
  return (
    <WorkspaceShell
      activeSection={sectionId}
      inspectorSections={inspectorSections}
      toolbar={
        <Toolbar
          leading={
            <div className="flex items-center gap-2">
              <Icon name={icon} size={14} className="text-ink-muted" />
              <span className="text-[12px] font-medium text-ink">{title}</span>
              <Badge variant="outline" mono>
                Module Slot
              </Badge>
            </div>
          }
          trailing={
            <ButtonLink href="/" variant="ghost" size="sm">
              Back to Overview
            </ButtonLink>
          }
        />
      }
    >
      <div className="space-y-6">
        <SectionHeader
          title={title}
          badge={
            <Badge variant="neutral" mono>
              Unpopulated Container
            </Badge>
          }
          description={summary}
        />

        <EmptyState
          icon={icon}
          meta={`MODULE BOUNDARY · /${sectionId}`}
          title={emptyTitle}
          description={emptyDescription}
          action={
            <ButtonLink href="/foundation" variant="secondary" size="sm">
              Review UI Primitives
            </ButtonLink>
          }
        />

        <Panel
          title="Planned Module Boundaries"
          meta={
            <Badge variant="outline" mono>
              Architecture Contract
            </Badge>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {moduleScope.map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-sm bg-surface-subtle/60 border border-line-subtle space-y-1"
              >
                <div className="text-[12px] font-medium text-ink">
                  {item.label}
                </div>
                <p className="text-[12px] text-ink-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </WorkspaceShell>
  );
}
