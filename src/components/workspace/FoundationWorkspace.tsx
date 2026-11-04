import { useState } from 'react';
import { WorkspaceShell } from '@/components/layout';
import {
  Badge,
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  Input,
  Kbd,
  Panel,
  SegmentedControl,
  Toolbar,
} from '@/components/ui';

const SURFACE_TOKENS = [
  {
    name: '--cs-canvas',
    swatchStyle: { backgroundColor: 'var(--cs-canvas)' },
  },
  {
    name: '--cs-surface',
    swatchStyle: { backgroundColor: 'var(--cs-surface)' },
  },
  {
    name: '--cs-surface-subtle',
    swatchStyle: { backgroundColor: 'var(--cs-surface-subtle)' },
  },
  {
    name: '--cs-surface-muted',
    swatchStyle: { backgroundColor: 'var(--cs-surface-muted)' },
  },
  {
    name: '--cs-border-default',
    swatchStyle: { backgroundColor: 'var(--cs-border-default)' },
  },
  {
    name: '--cs-fg-primary',
    swatchStyle: { backgroundColor: 'var(--cs-fg-primary)' },
  },
  {
    name: '--cs-accent',
    swatchStyle: { backgroundColor: 'var(--cs-accent)' },
  },
  {
    name: '--cs-accent-subtle',
    swatchStyle: { backgroundColor: 'var(--cs-accent-subtle)' },
  },
] as const;

const SPACING_TOKENS = [
  { token: '--cs-space-1', px: '4px', width: '4px' },
  { token: '--cs-space-2', px: '8px', width: '8px' },
  { token: '--cs-space-3', px: '12px', width: '12px' },
  { token: '--cs-space-4', px: '16px', width: '16px' },
  { token: '--cs-space-5', px: '20px', width: '20px' },
  { token: '--cs-space-6', px: '24px', width: '24px' },
  { token: '--cs-space-8', px: '32px', width: '32px' },
  { token: '--cs-space-12', px: '48px', width: '48px' },
] as const;

export function FoundationWorkspace() {
  const [previewFormat, setPreviewFormat] = useState<'css' | 'compose' | 'xml'>(
    'css'
  );
  const [tokenPrefix, setTokenPrefix] = useState<string>('--color-surface');

  return (
    <WorkspaceShell
      activeSection="foundation"
      pageTitle={(t) => t.foundation.pageTitle}
      inspectorSections={(t) => t.foundation.inspectorSections}
      toolbar={(t) => (
        <Toolbar
          leading={
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <Icon name="tokens" size={14} className="text-ink-muted" />
              <span className="text-[12px] font-medium text-ink truncate">
                {t.foundation.toolbarTitle}
              </span>
              <Badge variant="accent">{t.foundation.toolbarBadge}</Badge>
            </div>
          }
          trailing={
            <span className="text-[11px] font-mono text-ink-muted hidden md:inline">
              src/styles/tokens.css · src/components/ui/*
            </span>
          }
        />
      )}
    >
      {(t) => {
        const f = t.foundation;
        const typographyRows = [
          {
            token: '--cs-text-2xl',
            spec: '24px / 1.5rem',
            sample: f.typographyPanel.samples.heading2xl,
            className: 'text-[22px] sm:text-[24px] font-semibold text-ink break-words',
          },
          {
            token: '--cs-text-xl',
            spec: '20px / 1.25rem',
            sample: f.typographyPanel.samples.headingXl,
            className: 'text-[18px] sm:text-[20px] font-semibold text-ink break-words',
          },
          {
            token: '--cs-text-lg',
            spec: '16px / 1rem',
            sample: f.typographyPanel.samples.headingLg,
            className: 'text-[16px] font-semibold text-ink break-words',
          },
          {
            token: '--cs-text-base',
            spec: '14px / 0.875rem',
            sample: f.typographyPanel.samples.bodyBase,
            className: 'text-[14px] text-ink-secondary break-words',
          },
          {
            token: '--cs-text-sm',
            spec: '13px / 0.8125rem',
            sample: f.typographyPanel.samples.controlSm,
            className: 'text-[13px] font-medium text-ink break-words',
          },
          {
            token: '--cs-text-xs',
            spec: '12px / 0.75rem',
            sample: f.typographyPanel.samples.monoXs,
            className: 'text-[12px] font-mono text-ink-secondary break-all sm:break-words',
          },
          {
            token: '--cs-text-2xs',
            spec: '11px / 0.6875rem',
            sample: f.typographyPanel.samples.micro2xs,
            className:
              'text-[11px] font-mono uppercase tracking-wider text-ink-muted break-words',
          },
        ] as const;

        return (
          <div className="space-y-4 min-w-0">
            {/* 1. Semantic Surface, Border & Restrained Accent Tokens */}
            <Panel
              title={f.tokensPanel.title}
              meta={<Badge variant="neutral">{f.tokensPanel.badge}</Badge>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 min-w-0">
                {SURFACE_TOKENS.map((token) => (
                  <Card
                    key={token.name}
                    padding="sm"
                    subtle
                    className="space-y-2.5"
                  >
                    <div
                      className="h-10 w-full rounded-sm border border-line-strong/70"
                      style={token.swatchStyle}
                    />
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-mono text-[11px] font-medium text-ink truncate">
                        {token.name}
                      </div>
                      <p className="text-[11px] text-ink-muted leading-snug break-words">
                        {f.tokensPanel.roles[token.name]}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </Panel>

            {/* 2. Reusable UI Components */}
            <Panel
              title={f.primitivesPanel.title}
              meta={
                <Badge variant="neutral" mono>
                  src/components/ui
                </Badge>
              }
            >
              <div className="space-y-5 min-w-0">
                {/* Buttons & IconButtons */}
                <div className="space-y-2 min-w-0">
                  <span className="block text-[11px] font-semibold text-ink-muted">
                    {f.primitivesPanel.buttonsHeading}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="primary" size="md">
                      {f.primitivesPanel.primaryBtn}
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      leadingIcon={<Icon name="sliders" size={14} />}
                    >
                      {f.primitivesPanel.secondaryBtn}
                    </Button>
                    <Button variant="ghost" size="md">
                      {f.primitivesPanel.ghostBtn}
                    </Button>
                    <Button variant="secondary" size="sm">
                      {f.primitivesPanel.smallBtn}
                    </Button>
                    <Button variant="secondary" size="md" disabled>
                      {f.primitivesPanel.disabledBtn}
                    </Button>
                    <Divider
                      orientation="vertical"
                      className="mx-1 hidden sm:block"
                    />
                    <IconButton
                      label={f.primitivesPanel.gridViewLabel}
                      bordered
                      size="md"
                    >
                      <Icon name="grid" size={14} />
                    </IconButton>
                    <IconButton
                      label={f.primitivesPanel.activeToggleLabel}
                      active
                      size="md"
                    >
                      <Icon name="check" size={14} />
                    </IconButton>
                  </div>
                </div>

                <Divider subtle />

                {/* Segmented Control, Badges & Kbd */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                  <div className="space-y-2 min-w-0">
                    <span className="block text-[11px] font-semibold text-ink-muted">
                      {f.primitivesPanel.segmentedHeading}
                    </span>
                    <SegmentedControl
                      label={f.primitivesPanel.notationAriaLabel}
                      options={[
                        { value: 'css', label: 'CSS' },
                        { value: 'compose', label: 'Compose' },
                        { value: 'xml', label: 'Android XML' },
                      ]}
                      value={previewFormat}
                      onChange={setPreviewFormat}
                      size="md"
                    />
                  </div>

                  <div className="space-y-2 min-w-0">
                    <span className="block text-[11px] font-semibold text-ink-muted">
                      {f.primitivesPanel.badgesHeading}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="neutral">
                        {f.primitivesPanel.badgeNeutral}
                      </Badge>
                      <Badge variant="accent">
                        {f.primitivesPanel.badgeAccent}
                      </Badge>
                      <Badge variant="outline">
                        {f.primitivesPanel.badgeOutline}
                      </Badge>
                      <Kbd>[</Kbd>
                      <Kbd>]</Kbd>
                      <Kbd>Esc</Kbd>
                    </div>
                  </div>
                </div>

                <Divider subtle />

                {/* Developer Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                  <Input
                    key={`ws-input-${f.primitivesPanel.workspaceInputDefault}`}
                    label={f.primitivesPanel.workspaceInputLabel}
                    placeholder={f.primitivesPanel.workspaceInputPlaceholder}
                    defaultValue={f.primitivesPanel.workspaceInputDefault}
                    hint={f.primitivesPanel.workspaceInputHint}
                  />
                  <Input
                    label={f.primitivesPanel.tokenInputLabel}
                    mono
                    value={tokenPrefix}
                    onChange={(e) => setTokenPrefix(e.target.value)}
                    suffix={previewFormat.toUpperCase()}
                    hint={f.primitivesPanel.tokenInputHint}
                  />
                </div>
              </div>
            </Panel>

            {/* 3. Typography & Spacing */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-w-0">
              <Panel
                title={f.typographyPanel.title}
                meta={
                  <Badge variant="outline" mono>
                    Sans + Mono
                  </Badge>
                }
                className="lg:col-span-7"
              >
                <div className="divide-y divide-line-subtle min-w-0">
                  {typographyRows.map((row) => (
                    <div
                      key={row.token}
                      className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-3 min-w-0"
                    >
                      <div className={`min-w-0 ${row.className}`}>
                        {row.sample}
                      </div>
                      <div className="shrink-0 font-mono text-[11px] text-ink-muted">
                        {row.spec}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel
                title={f.spacingPanel.title}
                meta={<Badge variant="outline">{f.spacingPanel.badge}</Badge>}
                className="lg:col-span-5"
              >
                <div className="space-y-4 min-w-0">
                  <div className="space-y-2 min-w-0">
                    {SPACING_TOKENS.map((item) => (
                      <div
                        key={item.token}
                        className="flex items-center justify-between gap-2 text-[11px] font-mono min-w-0"
                      >
                        <span className="text-ink-secondary w-24 shrink-0 truncate">
                          {item.token.replace('--cs-', '')}
                        </span>
                        <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
                          <span
                            className="h-2.5 rounded-xs bg-accent/80 shrink-0"
                            style={{ width: item.width }}
                          />
                        </div>
                        <span className="text-ink-muted w-9 text-right shrink-0">
                          {item.px}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Divider subtle />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 min-w-0">
                    {[
                      { label: 'xs · 4px', cls: 'rounded-xs' },
                      { label: 'sm · 6px', cls: 'rounded-sm' },
                      { label: 'md · 8px', cls: 'rounded-md' },
                      { label: 'lg · 10px', cls: 'rounded-lg' },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex flex-col items-center gap-1.5 min-w-0"
                      >
                        <div
                          className={`h-9 w-full bg-surface-subtle border border-line-strong ${r.cls}`}
                        />
                        <span className="font-mono text-[10px] text-ink-muted truncate">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        );
      }}
    </WorkspaceShell>
  );
}
