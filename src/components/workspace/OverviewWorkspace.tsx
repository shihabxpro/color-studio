import type { InspectorSection } from '@/types/navigation';
import { WorkspaceShell } from '@/components/layout';
import {
  Badge,
  ButtonLink,
  EmptyState,
  Icon,
  Kbd,
  Panel,
  SectionHeader,
  Toolbar,
} from '@/components/ui';

const OVERVIEW_INSPECTOR_SECTIONS: InspectorSection[] = [
  {
    title: 'Shell Geometry',
    properties: [
      { label: 'Header Height', value: '48px (3rem)', mono: true },
      { label: 'Sidebar Width', value: '224px / 56px', mono: true },
      { label: 'Inspector Width', value: '288px (18rem)', mono: true },
      { label: 'Status Bar', value: '28px (1.75rem)', mono: true },
    ],
  },
  {
    title: 'Stack Foundation',
    properties: [
      { label: 'Framework', value: 'Astro 5 + React 19', mono: true },
      { label: 'Language', value: 'TypeScript (Strict)', mono: true },
      { label: 'Styling', value: 'Tailwind CSS 4 + Tokens', mono: true },
    ],
  },
];

const SHORTCUTS = [
  { label: 'Collapse or expand navigation rail', keys: ['['] },
  { label: 'Show or hide right inspector panel', keys: [']'] },
  { label: 'Navigate directly between studio sections', keys: ['1', '5'] },
  { label: 'Dismiss mobile navigation or inspector drawer', keys: ['Esc'] },
];

export function OverviewWorkspace() {
  return (
    <WorkspaceShell
      activeSection="workspace"
      inspectorSections={OVERVIEW_INSPECTOR_SECTIONS}
      toolbar={
        <Toolbar
          leading={
            <div className="flex items-center gap-2">
              <Icon name="workspace" size={14} className="text-ink-muted" />
              <span className="text-[12px] font-medium text-ink">
                Studio Canvas
              </span>
              <Badge variant="neutral" mono>
                Shell Ready
              </Badge>
            </div>
          }
          trailing={
            <ButtonLink
              href="/foundation"
              variant="ghost"
              size="sm"
              leadingIcon={<Icon name="tokens" size={13} />}
            >
              UI Foundation
            </ButtonLink>
          }
        />
      }
    >
      <div className="space-y-6">
        <SectionHeader
          title="Workspace Overview"
          badge={
            <Badge variant="outline" mono>
              Phase 01 · Foundation
            </Badge>
          }
          description="Modular application shell and calibrated achromatic workspace designed for web and Android color engineering."
        />

        {/* Primary Canvas Slot */}
        <EmptyState
          icon="studio"
          meta="WORKSPACE STAGE · READY FOR MODULES"
          title="Workspace shell initialized"
          description="Navigation, responsive drawers, toolbar slots, and contextual inspector panels are established. Color generation, tonal scales, contrast checks, and export engines mount into this stage."
          action={
            <div className="flex flex-wrap items-center justify-center gap-2">
              <ButtonLink
                href="/foundation"
                variant="primary"
                size="md"
                leadingIcon={<Icon name="tokens" size={14} />}
              >
                Inspect UI Foundation
              </ButtonLink>
              <ButtonLink href="/palettes" variant="secondary" size="md">
                View Module Slots
              </ButtonLink>
            </div>
          }
        />

        {/* Target Platform Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Panel
            title="Web Platform Architecture"
            meta={
              <Badge variant="neutral" mono>
                CSS · Tailwind
              </Badge>
            }
          >
            <p className="text-[13px] text-ink-secondary leading-relaxed">
              Structured to support browser-native color spaces, semantic CSS
              custom properties, and utility token mappings without coupling UI
              components to raw color math.
            </p>
            <dl className="mt-3.5 pt-3 border-t border-line-subtle grid grid-cols-2 gap-2 text-[12px]">
              <div>
                <dt className="text-ink-muted text-[11px]">Token Output</dt>
                <dd className="font-mono text-[11px] text-ink mt-0.5">
                  --color-* / @theme
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted text-[11px]">Color Notation</dt>
                <dd className="font-mono text-[11px] text-ink mt-0.5">
                  Hex · RGB · OKLCH
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel
            title="Android Platform Architecture"
            meta={
              <Badge variant="neutral" mono>
                Compose · XML
              </Badge>
            }
          >
            <p className="text-[13px] text-ink-secondary leading-relaxed">
              Prepared for Android resource conventions, supporting both modern
              Jetpack Compose immutable color declarations and classic XML value
              resources.
            </p>
            <dl className="mt-3.5 pt-3 border-t border-line-subtle grid grid-cols-2 gap-2 text-[12px]">
              <div>
                <dt className="text-ink-muted text-[11px]">Compose Target</dt>
                <dd className="font-mono text-[11px] text-ink mt-0.5">
                  Color(0xFFRRGGBB)
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted text-[11px]">Resource Target</dt>
                <dd className="font-mono text-[11px] text-ink mt-0.5">
                  res/values/colors.xml
                </dd>
              </div>
            </dl>
          </Panel>
        </div>

        {/* Shell Keyboard Navigation Reference */}
        <Panel
          title="Workspace Keyboard Controls"
          meta={
            <Badge variant="outline" mono>
              Ergonomics
            </Badge>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SHORTCUTS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-sm bg-surface-subtle/70 border border-line-subtle"
              >
                <span className="text-[12px] text-ink-secondary">
                  {item.label}
                </span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  {item.keys.length === 2 ? (
                    <>
                      <Kbd>{item.keys[0]}</Kbd>
                      <span className="text-[10px] text-ink-muted">–</span>
                      <Kbd>{item.keys[1]}</Kbd>
                    </>
                  ) : (
                    <Kbd>{item.keys[0]}</Kbd>
                  )}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </WorkspaceShell>
  );
}
