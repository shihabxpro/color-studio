import { useEffect, useState, type KeyboardEvent } from 'react';
import {
  parseFormatInput,
  toAndroidComposeLiteral,
  type ColorFormat,
  type ConvertedColor,
  type FormatValidationErrorKey,
  type PickerColorState,
} from '@/lib/color';
import type { TranslationDictionary } from '@/i18n';
import { copyToClipboard } from '@/lib/clipboard';
import { cn } from '@/lib/cn';
import type { PlatformTarget } from '@/types/ui';
import { Badge, Button, Divider, Icon } from '@/components/ui';

const FORMAT_ORDER: readonly { format: ColorFormat; label: string }[] = [
  { format: 'hex', label: 'HEX' },
  { format: 'rgb', label: 'RGB' },
  { format: 'hsl', label: 'HSL' },
  { format: 'oklch', label: 'OKLCH' },
];

function getFormattedString(color: ConvertedColor, format: ColorFormat): string {
  return color.css[format];
}

export interface FormatInputsPanelProps {
  pickerState: PickerColorState;
  platformTarget: PlatformTarget;
  t: TranslationDictionary;
  onValidStateChange: (next: PickerColorState) => void;
  onErrorStateChange?: (hasErrors: boolean) => void;
  resetSignal: number;
}

export function FormatInputsPanel({
  pickerState,
  platformTarget,
  t,
  onValidStateChange,
  onErrorStateChange,
  resetSignal,
}: FormatInputsPanelProps) {
  const { color, preservedHue } = pickerState;

  const [activeField, setActiveField] = useState<ColorFormat | null>(null);
  const [drafts, setDrafts] = useState<Partial<Record<ColorFormat, string>>>({});
  const [errors, setErrors] = useState<
    Partial<Record<ColorFormat, FormatValidationErrorKey>>
  >({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Clear all transient drafts and validation errors when Reset is triggered
  useEffect(() => {
    setActiveField(null);
    setDrafts({});
    setErrors({});
    onErrorStateChange?.(false);
  }, [resetSignal, onErrorStateChange]);

  const handleCopy = async (key: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1500);
    }
  };

  const handleInputChange = (format: ColorFormat, value: string) => {
    setDrafts((prev) => ({ ...prev, [format]: value }));

    const result = parseFormatInput(format, value, preservedHue);
    if (result.ok) {
      setErrors({});
      setDrafts({ [format]: value });
      onErrorStateChange?.(false);
      onValidStateChange(result.state);
    } else {
      setErrors((prev) => {
        const next = { ...prev, [format]: result.errorKey };
        onErrorStateChange?.(Object.keys(next).length > 0);
        return next;
      });
    }
  };

  const handleFocus = (format: ColorFormat) => {
    setActiveField(format);
    if (drafts[format] === undefined) {
      setDrafts((prev) => ({
        ...prev,
        [format]: getFormattedString(color, format),
      }));
    }
  };

  const handleBlur = (format: ColorFormat) => {
    setActiveField((current) => (current === format ? null : current));
    if (!errors[format]) {
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[format];
        return next;
      });
    }
  };

  const handleKeyDown = (
    format: ColorFormat,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setErrors((prev) => {
        const next = { ...prev };
        delete next[format];
        onErrorStateChange?.(Object.keys(next).length > 0);
        return next;
      });
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[format];
        return next;
      });
      event.currentTarget.blur();
    }
  };

  const platformSnippet =
    platformTarget === 'android'
      ? toAndroidComposeLiteral(color.hex)
      : `--color-primary: ${color.hex};`;

  const platformLabel = platformTarget === 'android' ? 'Compose' : 'CSS';

  return (
    <section className="min-w-0 max-w-full rounded-md border border-line bg-surface shadow-xs overflow-hidden">
      <header className="px-3.5 py-2.5 border-b border-line-subtle bg-surface-subtle/60 flex items-center justify-between gap-2">
        <h2 className="text-[12px] font-semibold text-ink truncate">
          {t.picker.formatsTitle}
        </h2>
        <Badge variant={color.gamut.wasMapped ? 'accent' : 'outline'} mono>
          {color.gamut.wasMapped ? t.picker.mappedToSrgb : t.picker.inSrgb}
        </Badge>
      </header>

      <div className="p-3.5 space-y-3 min-w-0">
        {FORMAT_ORDER.map(({ format, label }) => {
          const canonical = getFormattedString(color, format);
          const errorKey = errors[format];
          const hasError = Boolean(errorKey);
          const displayValue =
            activeField === format || hasError
              ? (drafts[format] ?? canonical)
              : canonical;
          const isCopied = copiedKey === format;

          return (
            <div key={format} className="space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <label
                  htmlFor={`format-input-${format}`}
                  className="w-12 sm:w-13 shrink-0 font-mono text-[11px] font-semibold text-ink-secondary select-none"
                >
                  {label}
                </label>

                <input
                  id={`format-input-${format}`}
                  type="text"
                  spellCheck={false}
                  autoComplete="off"
                  aria-invalid={hasError}
                  aria-describedby={
                    hasError ? `format-error-${format}` : undefined
                  }
                  value={displayValue}
                  onFocus={() => handleFocus(format)}
                  onBlur={() => handleBlur(format)}
                  onChange={(e) => handleInputChange(format, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(format, e)}
                  className={cn(
                    'h-8.5 flex-1 min-w-0 px-2.5 rounded-sm bg-surface-subtle/50 border font-mono text-[12px] text-ink transition-colors focus:outline-none focus:bg-surface',
                    hasError
                      ? 'border-[#dc2626] focus:border-[#dc2626]'
                      : 'border-line hover:border-line-strong focus:border-accent'
                  )}
                />

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(format, canonical)}
                  aria-label={`${label} ${t.picker.copy}`}
                  className={cn(
                    'h-8.5 px-2.5 shrink-0',
                    isCopied && 'border-accent-border bg-accent-subtle text-accent-ink'
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon
                      name={isCopied ? 'check' : 'copy'}
                      size={13}
                      className={isCopied ? 'text-accent' : undefined}
                    />
                    <span className="hidden sm:inline">
                      {isCopied ? t.picker.copied : t.picker.copy}
                    </span>
                  </span>
                </Button>
              </div>

              {hasError && errorKey && (
                <p
                  id={`format-error-${format}`}
                  role="alert"
                  className="pl-13.5 sm:pl-15 text-[11px] text-[#dc2626] leading-snug break-words"
                >
                  {t.picker.errors[errorKey]}
                </p>
              )}
            </div>
          );
        })}

        <Divider subtle />

        {/* Single compact platform snippet row matching Web/Android switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pt-0.5">
          <span className="w-12 sm:w-13 shrink-0 font-mono text-[11px] font-semibold text-ink-muted select-none">
            {platformLabel}
          </span>
          <code className="h-8 flex-1 min-w-0 px-2.5 rounded-sm bg-surface-subtle border border-line-subtle flex items-center text-[11px] text-ink-secondary truncate">
            {platformSnippet}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy('platform', platformSnippet)}
            aria-label={`${platformLabel} ${t.picker.copy}`}
            className="h-8 px-2.5 shrink-0"
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon
                name={copiedKey === 'platform' ? 'check' : 'copy'}
                size={13}
                className={copiedKey === 'platform' ? 'text-accent' : undefined}
              />
              <span className="hidden sm:inline">
                {copiedKey === 'platform' ? t.picker.copied : t.picker.copy}
              </span>
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
