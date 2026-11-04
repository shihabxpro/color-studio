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

export function OverviewWorkspace() {
  return (
    <WorkspaceShell
      activeSection="workspace"
      pageTitle={(t) => t.overview.pageTitle}
      inspectorSections={(t) => t.overview.inspectorSections}
      toolbar={(t) => (
        <Toolbar
          leading={
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <Icon name="workspace" size={14} className="text-ink-muted" />
              <span className="text-[12px] font-medium text-ink truncate">
                {t.overview.toolbarTitle}
              </span>
              <Badge variant="neutral">{t.overview.toolbarBadge}</Badge>
            </div>
          }
          trailing={
            <ButtonLink
              href="/foundation"
              variant="ghost"
              size="sm"
              leadingIcon={<Icon name="tokens" size={13} />}
            >
              {t.nav.items.foundation.label}
            </ButtonLink>
          }
        />
      )}
    >
      {(t) => (
        <div className="space-y-5 sm:space-y-6 min-w-0">
          <SectionHeader
            title={t.overview.heading}
            badge={<Badge variant="outline">{t.overview.phaseBadge}</Badge>}
            description={t.overview.description}
          />

          {/* Primary Canvas Slot */}
          <EmptyState
            icon="studio"
            meta={t.overview.emptyMeta}
            title={t.overview.emptyTitle}
            description={t.overview.emptyDescription}
            action={
              <div className="flex flex-wrap items-center justify-center gap-2">
                <ButtonLink
                  href="/foundation"
                  variant="primary"
                  size="md"
                  leadingIcon={<Icon name="tokens" size={14} />}
                >
                  {t.common.inspectFoundation}
                </ButtonLink>
                <ButtonLink href="/palettes" variant="secondary" size="md">
                  {t.common.viewModuleSlots}
                </ButtonLink>
              </div>
            }
          />

          {/* Target Platform Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            <Panel
              title={t.overview.webPanel.title}
              meta={
                <Badge variant="neutral" mono>
                  CSS · Tailwind
                </Badge>
              }
            >
              <p className="text-[13px] text-ink-secondary leading-relaxed break-words">
                {t.overview.webPanel.description}
              </p>
              <dl className="mt-3.5 pt-3 border-t border-line-subtle grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px]">
                <div className="min-w-0">
                  <dt className="text-ink-muted text-[11px]">
                    {t.overview.webPanel.tokenOutputLabel}
                  </dt>
                  <dd className="font-mono text-[11px] text-ink mt-0.5 truncate">
                    --color-* / @theme
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-ink-muted text-[11px]">
                    {t.overview.webPanel.colorNotationLabel}
                  </dt>
                  <dd className="font-mono text-[11px] text-ink mt-0.5 truncate">
                    HEX · RGB · HSL · OKLCH
                  </dd>
                </div>
              </dl>
            </Panel>

            <Panel
              title={t.overview.androidPanel.title}
              meta={
                <Badge variant="neutral" mono>
                  Compose · XML
                </Badge>
              }
            >
              <p className="text-[13px] text-ink-secondary leading-relaxed break-words">
                {t.overview.androidPanel.description}
              </p>
              <dl className="mt-3.5 pt-3 border-t border-line-subtle grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px]">
                <div className="min-w-0">
                  <dt className="text-ink-muted text-[11px]">
                    {t.overview.androidPanel.composeTargetLabel}
                  </dt>
                  <dd className="font-mono text-[11px] text-ink mt-0.5 truncate">
                    Color(0xFFRRGGBB)
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-ink-muted text-[11px]">
                    {t.overview.androidPanel.resourceTargetLabel}
                  </dt>
                  <dd className="font-mono text-[11px] text-ink mt-0.5 truncate">
                    res/values/colors.xml
                  </dd>
                </div>
              </dl>
            </Panel>
          </div>

          {/* Shell Keyboard Navigation Reference */}
          <Panel
            title={t.overview.shortcutsPanel.title}
            meta={
              <Badge variant="outline">
                {t.overview.shortcutsPanel.badge}
              </Badge>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0">
              {t.overview.shortcutsPanel.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 px-3 py-2 rounded-sm bg-surface-subtle/70 border border-line-subtle min-w-0"
                >
                  <span className="text-[12px] text-ink-secondary break-words min-w-0">
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
      )}
    </WorkspaceShell>
  );
}
