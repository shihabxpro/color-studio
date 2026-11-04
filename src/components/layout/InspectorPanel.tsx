import { useEffect } from 'react';
import { SITE_CONFIG } from '@/config/site';
import type { TranslationDictionary } from '@/i18n';
import type { InspectorSection } from '@/types/navigation';
import type { PlatformTarget, ThemeMode } from '@/types/ui';
import { cn } from '@/lib/cn';
import { Badge, Divider, Icon, IconButton, Kbd } from '@/components/ui';

export interface InspectorPanelProps {
  desktopOpen: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleDesktop: () => void;
  sectionTitle: string;
  platformTarget: PlatformTarget;
  theme: ThemeMode;
  t: TranslationDictionary;
  sections?: InspectorSection[];
}

export function InspectorPanel({
  desktopOpen,
  mobileOpen,
  onCloseMobile,
  onToggleDesktop,
  sectionTitle,
  platformTarget,
  theme,
  t,
  sections = [],
}: InspectorPanelProps) {
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseMobile();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen, onCloseMobile]);

  const platformSpec = SITE_CONFIG.platforms[platformTarget];

  const panelBody = (
    <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 min-w-0">
      {/* Primary View-Specific Properties First */}
      {sections.map((section, idx) => (
        <div key={section.title} className="space-y-2.5">
          {idx > 0 && <Divider subtle />}
          <span className="block text-[11px] font-semibold text-ink-muted">
            {section.title}
          </span>
          <dl className="space-y-2 text-[12px]">
            {section.properties.map((prop) => (
              <div
                key={prop.label}
                className="flex items-center justify-between gap-2.5 min-w-0"
              >
                <dt className="text-ink-muted truncate shrink-0">
                  {prop.label}
                </dt>
                <dd
                  className={cn(
                    'text-ink text-right truncate min-w-0',
                    prop.mono && 'font-mono text-[11px]'
                  )}
                >
                  {prop.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      {sections.length > 0 && <Divider subtle />}

      {/* Compact Context Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-ink-muted truncate">
            {t.inspector.workspaceContext}
          </span>
          <Badge variant="accent" mono>
            {platformSpec.label}
          </Badge>
        </div>

        <dl className="space-y-1.5 text-[12px]">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-ink-muted shrink-0">{t.inspector.activeView}</dt>
            <dd className="font-medium text-ink-secondary text-right truncate">
              {sectionTitle}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-ink-muted shrink-0">{t.inspector.themeMode}</dt>
            <dd className="text-[11px] text-ink-secondary text-right">
              {theme === 'light' ? t.inspector.themeLight : t.inspector.themeDark}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Inline Inspector */}
      {desktopOpen && (
        <aside
          aria-label={t.inspector.ariaLabel}
          className="hidden xl:flex w-64 shrink-0 flex-col bg-surface border-l border-line"
        >
          <div className="h-10 px-3.5 border-b border-line flex items-center justify-between gap-2 shrink-0">
            <span className="text-[12px] font-semibold text-ink">
              {t.inspector.title}
            </span>
            <div className="flex items-center gap-1.5">
              <Kbd>{SITE_CONFIG.shortcuts.toggleInspector}</Kbd>
              <IconButton
                label={t.inspector.collapseLabel}
                size="sm"
                onClick={onToggleDesktop}
              >
                <Icon name="close" size={14} />
              </IconButton>
            </div>
          </div>
          {panelBody}
        </aside>
      )}

      {/* Mobile / Tablet / Compact Laptop Slide-over Inspector */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.inspector.ariaLabel}
          className="fixed inset-0 z-40 flex justify-end xl:hidden"
        >
          <div
            aria-hidden="true"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-overlay backdrop-blur-[1px]"
          />
          <aside className="relative z-10 flex w-72 max-w-[88vw] flex-col bg-surface-elevated border-l border-line shadow-overlay">
            <div className="h-12 px-3.5 border-b border-line flex items-center justify-between gap-2 shrink-0">
              <span className="text-[13px] font-semibold text-ink">
                {t.inspector.title}
              </span>
              <IconButton
                label={t.inspector.closeLabel}
                size="sm"
                onClick={onCloseMobile}
              >
                <Icon name="close" size={16} />
              </IconButton>
            </div>
            {panelBody}
          </aside>
        </div>
      )}
    </>
  );
}
