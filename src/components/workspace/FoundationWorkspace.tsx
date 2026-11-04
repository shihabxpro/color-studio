import { useState } from 'react';
import type { InspectorSection } from '@/types/navigation';
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
  SectionHeader,
  SegmentedControl,
  Toolbar,
} from '@/components/ui';

const FOUNDATION_INSPECTOR_SECTIONS: InspectorSection[] = [
  {
    title: 'Token Architecture',
    properties: [
      { label: 'Namespace', value: '--cs-*', mono: true },
      { label: 'Neutral Chroma', value: '0.000 (Achromatic)', mono: true },
      { label: 'Base Grid', value: '4px (0.25rem)', mono: true },
      { label: 'Border Hairline', value: '1px solid', mono: true },
    ],
  },
  {
    title: 'Component Primitives',
    properties: [
      { label: 'Controls', value: 'Button, IconButton, Input', mono: false },
      { label: 'Selection', value: 'SegmentedControl', mono: false },
      { label: 'Surfaces', value: 'Panel, Card, Toolbar', mono: false },
      { label: 'Metadata', value: 'Badge, Kbd, EmptyState', mono: false },
    ],
  },
];

const SURFACE_TOKENS = [
  {
    name: '--cs-canvas',
    role: 'Primary workspace backdrop',
    swatchStyle: { backgroundColor: 'var(--cs-canvas)' },
  },
  {
    name: '--cs-surface',
    role: 'Elevated panels, header, cards',
    swatchStyle: { backgroundColor: 'var(--cs-surface)' },
  },
  {
    name: '--cs-surface-subtle',
    role: 'Sidebar rail, recessed control wells',
    swatchStyle: { backgroundColor: 'var(--cs-surface-subtle)' },
  },
  {
    name: '--cs-surface-muted',
    role: 'Interactive hover & active fills',
    swatchStyle: { backgroundColor: 'var(--cs-surface-muted)' },
  },
  {
    name: '--cs-border-default',
    role: 'Standard 1px structural hairline',
    swatchStyle: { backgroundColor: 'var(--cs-border-default)' },
  },
  {
    name: '--cs-fg-primary',
    role: 'Primary high-contrast ink',
    swatchStyle: { backgroundColor: 'var(--cs-fg-primary)' },
  },
  {
    name: '--cs-accent',
    role: 'Restrained focus & primary action',
    swatchStyle: { backgroundColor: 'var(--cs-accent)' },
  },
  {
    name: '--cs-accent-subtle',
    role: 'Restrained active tint surface',
    swatchStyle: { backgroundColor: 'var(--cs-accent-subtle)' },
  },
] as const;

const TYPOGRAPHY_SCALE = [
  {
    token: '--cs-text-2xl',
    spec: '24px / 1.5rem',
    sample: 'Workspace Heading',
    className: 'text-[24px] font-semibold tracking-tight text-ink',
  },
  {
    token: '--cs-text-xl',
    spec: '20px / 1.25rem',
    sample: 'Section Title',
    className: 'text-[20px] font-semibold tracking-tight text-ink',
  },
  {
    token: '--cs-text-lg',
    spec: '16px / 1rem',
    sample: 'Panel Header',
    className: 'text-[16px] font-semibold text-ink',
  },
  {
    token: '--cs-text-base',
    spec: '14px / 0.875rem',
    sample: 'Standard developer documentation and body copy.',
    className: 'text-[14px] text-ink-secondary',
  },
  {
    token: '--cs-text-sm',
    spec: '13px / 0.8125rem',
    sample: 'Dense studio UI control, navigation item, and toolbar label.',
    className: 'text-[13px] font-medium text-ink',
  },
  {
    token: '--cs-text-xs',
    spec: '12px / 0.75rem',
    sample: 'color.surface.primary · Color(0xFF18181B) · #18181B',
    className: 'text-[12px] font-mono text-ink-secondary',
  },
  {
    token: '--cs-text-2xs',
    spec: '11px / 0.6875rem',
    sample: 'INSPECTOR METADATA · STATUS BAR · SHORTCUTS',
    className: 'text-[11px] font-mono uppercase tracking-wider text-ink-muted',
  },
] as const;

const SPACING_TOKENS = [
  { token: '--cs-space-1', px: '4px', rem: '0.25rem', width: '4px' },
  { token: '--cs-space-2', px: '8px', rem: '0.5rem', width: '8px' },
  { token: '--cs-space-3', px: '12px', rem: '0.75rem', width: '12px' },
  { token: '--cs-space-4', px: '16px', rem: '1rem', width: '16px' },
  { token: '--cs-space-5', px: '20px', rem: '1.25rem', width: '20px' },
  { token: '--cs-space-6', px: '24px', rem: '1.5rem', width: '24px' },
  { token: '--cs-space-8', px: '32px', rem: '2rem', width: '32px' },
  { token: '--cs-space-12', px: '48px', rem: '3rem', width: '48px' },
] as const;

export function FoundationWorkspace() {
  const [previewFormat, setPreviewFormat] = useState<'css' | 'compose' | 'xml'>(
    'css'
  );
  const [tokenPrefix, setTokenPrefix] = useState<string>('--color-surface');

  return (
    <WorkspaceShell
      activeSection="foundation"
      inspectorSections={FOUNDATION_INSPECTOR_SECTIONS}
      toolbar={
        <Toolbar
          leading={
            <div className="flex items-center gap-2">
              <Icon name="tokens" size={14} className="text-ink-muted" />
              <span className="text-[12px] font-medium text-ink">
                UI Foundation & Design Tokens
              </span>
              <Badge variant="accent" mono>
                System Reference
              </Badge>
            </div>
          }
          trailing={
            <span className="text-[11px] font-mono text-ink-muted hidden sm:inline">
              src/styles/tokens.css · src/components/ui/*
            </span>
          }
        />
      }
    >
      <div className="space-y-6">
        <SectionHeader
          title="UI Foundation"
          badge={
            <Badge variant="outline" mono>
              v0.1.0
            </Badge>
          }
          description="Semantic surface tokens, typography hierarchy, 4px spacing rhythm, and reusable React UI primitives powering Color Studio."
        />

        {/* 1. Semantic Surface, Border & Restrained Accent Tokens */}
        <Panel
          title="Semantic Color Tokens"
          meta={
            <Badge variant="neutral" mono>
              Light & Dark Adaptive
            </Badge>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SURFACE_TOKENS.map((token) => (
              <Card key={token.name} padding="sm" subtle className="space-y-2.5">
                <div
                  className="h-10 w-full rounded-sm border border-line-strong/70"
                  style={token.swatchStyle}
                />
                <div className="space-y-0.5">
                  <div className="font-mono text-[11px] font-medium text-ink truncate">
                    {token.name}
                  </div>
                  <p className="text-[11px] text-ink-muted leading-snug">
                    {token.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Panel>

        {/* 2. Reusable UI Components */}
        <Panel
          title="Reusable UI Primitives"
          meta={
            <Badge variant="neutral" mono>
              src/components/ui
            </Badge>
          }
        >
          <div className="space-y-5">
            {/* Buttons & IconButtons */}
            <div className="space-y-2">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                Buttons & Icon Buttons
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="primary" size="md">
                  Primary Action
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  leadingIcon={<Icon name="sliders" size={14} />}
                >
                  Secondary
                </Button>
                <Button variant="ghost" size="md">
                  Ghost Action
                </Button>
                <Button variant="secondary" size="sm">
                  Small (28px)
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled
                </Button>
                <Divider orientation="vertical" className="mx-1" />
                <IconButton label="Grid view" bordered size="md">
                  <Icon name="grid" size={14} />
                </IconButton>
                <IconButton label="Active toggle" active size="md">
                  <Icon name="check" size={14} />
                </IconButton>
              </div>
            </div>

            <Divider subtle />

            {/* Segmented Control, Badges & Kbd */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                  Segmented Control
                </span>
                <SegmentedControl
                  label="Notation preview"
                  options={[
                    { value: 'css', label: 'CSS Vars' },
                    { value: 'compose', label: 'Compose' },
                    { value: 'xml', label: 'Android XML' },
                  ]}
                  value={previewFormat}
                  onChange={setPreviewFormat}
                  size="md"
                />
              </div>

              <div className="space-y-2">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                  Badges & Keyboard Caps
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="accent" mono>
                    Accent Mono
                  </Badge>
                  <Badge variant="outline" mono>
                    Outline
                  </Badge>
                  <Kbd>[</Kbd>
                  <Kbd>]</Kbd>
                  <Kbd>Esc</Kbd>
                </div>
              </div>
            </div>

            <Divider subtle />

            {/* Developer Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Workspace Name"
                placeholder="e.g. Core Neutral System"
                defaultValue="Android & Web Core"
                hint="Standard UI sans input for labels and metadata."
              />
              <Input
                label="Token Identifier"
                mono
                value={tokenPrefix}
                onChange={(e) => setTokenPrefix(e.target.value)}
                suffix={previewFormat.toUpperCase()}
                hint="Monospace tabular input for token keys and color literals."
              />
            </div>
          </div>
        </Panel>

        {/* 3. Typography & Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Panel
            title="Typography Scale"
            meta={
              <Badge variant="outline" mono>
                Sans + Mono
              </Badge>
            }
            className="lg:col-span-7"
          >
            <div className="divide-y divide-line-subtle">
              {TYPOGRAPHY_SCALE.map((row) => (
                <div
                  key={row.token}
                  className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div className={row.className}>{row.sample}</div>
                  <div className="shrink-0 font-mono text-[11px] text-ink-muted">
                    {row.spec}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Spacing & Radius Rhythm"
            meta={
              <Badge variant="outline" mono>
                4px Base
              </Badge>
            }
            className="lg:col-span-5"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                {SPACING_TOKENS.map((item) => (
                  <div
                    key={item.token}
                    className="flex items-center justify-between gap-3 text-[11px] font-mono"
                  >
                    <span className="text-ink-secondary w-28 shrink-0">
                      {item.token.replace('--cs-', '')}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <span
                        className="h-2.5 rounded-xs bg-accent/80"
                        style={{ width: item.width }}
                      />
                    </div>
                    <span className="text-ink-muted w-10 text-right shrink-0">
                      {item.px}
                    </span>
                  </div>
                ))}
              </div>

              <Divider subtle />

              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { label: 'xs · 4px', cls: 'rounded-xs' },
                  { label: 'sm · 6px', cls: 'rounded-sm' },
                  { label: 'md · 8px', cls: 'rounded-md' },
                  { label: 'lg · 10px', cls: 'rounded-lg' },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={`h-9 w-full bg-surface-subtle border border-line-strong ${r.cls}`}
                    />
                    <span className="font-mono text-[10px] text-ink-muted">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </WorkspaceShell>
  );
}
