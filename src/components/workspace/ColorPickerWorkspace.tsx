import { useCallback, useRef, useState } from 'react';
import {
  createPickerState,
  DEFAULT_PICKER_HEX,
  getContrastingInk,
  toAndroidComposeLiteral,
  updatePickerFromHsl,
  updatePickerFromHsv,
  updatePickerFromOklch,
  updatePickerFromRgb,
  type HslColor,
  type OklchColor,
  type PickerColorState,
  type RgbColor,
} from '@/lib/color';
import { copyToClipboard } from '@/lib/clipboard';
import { cn } from '@/lib/cn';
import { useWorkspace, WorkspaceShell } from '@/components/layout';
import {
  ChannelSliders,
  FormatInputsPanel,
  HueSlider,
  SaturationValueCanvas,
} from '@/components/picker';
import { Badge, Button, Icon, Toolbar } from '@/components/ui';

interface PickerStageProps {
  pickerState: PickerColorState;
  resetSignal: number;
  onStateChange: (next: PickerColorState) => void;
  onErrorStateChange: (hasErrors: boolean) => void;
  onHsvChange: (patch: { h?: number; s?: number; v?: number }) => void;
  onRgbChange: (patch: Partial<RgbColor>) => void;
  onHslChange: (patch: Partial<HslColor>) => void;
  onOklchChange: (patch: Partial<OklchColor>) => void;
}

function PickerStage({
  pickerState,
  resetSignal,
  onStateChange,
  onErrorStateChange,
  onHsvChange,
  onRgbChange,
  onHslChange,
  onOklchChange,
}: PickerStageProps) {
  const { platformTarget, t } = useWorkspace();
  const [swatchCopied, setSwatchCopied] = useState(false);

  const { color, hsv, preservedHue } = pickerState;
  const contrastTone = getContrastingInk(color);

  const handleSwatchCopy = async () => {
    const ok = await copyToClipboard(color.hex);
    if (ok) {
      setSwatchCopied(true);
      window.setTimeout(() => setSwatchCopied(false), 1400);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start min-w-0">
      {/* Left: Live Swatch + 2D Picker + Hue + Channel Sliders */}
      <section className="lg:col-span-6 min-w-0 max-w-full rounded-md border border-line bg-surface shadow-xs overflow-hidden">
        {/* Live Color Preview */}
        <div
          style={{ backgroundColor: color.hex }}
          className={cn(
            'h-16 sm:h-20 w-full px-3.5 flex items-center justify-between gap-2 border-b border-line transition-colors duration-75',
            contrastTone === 'dark' ? 'text-[#09090B]' : 'text-[#FAFAFA]'
          )}
        >
          <button
            type="button"
            onClick={handleSwatchCopy}
            title={`${color.hex} — ${t.picker.copy}`}
            className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 rounded-xs font-mono text-[13px] font-semibold tracking-tight cursor-pointer transition-colors',
              contrastTone === 'dark'
                ? 'bg-black/8 hover:bg-black/14'
                : 'bg-white/12 hover:bg-white/20'
            )}
          >
            <span>{color.hex}</span>
            <Icon name={swatchCopied ? 'check' : 'copy'} size={13} />
          </button>

          <span className="text-[13px] font-medium select-none truncate opacity-90">
            {t.picker.previewSample}
          </span>
        </div>

        {/* Interactive Controls */}
        <div className="p-3.5 space-y-3.5 min-w-0">
          <SaturationValueCanvas
            hue={hsv.h}
            saturation={hsv.s}
            value={hsv.v}
            previewHex={color.hex}
            ariaLabel={t.picker.canvasAria}
            onChange={({ s, v }) => onHsvChange({ s, v })}
          />

          <HueSlider
            hue={hsv.h}
            label={t.picker.hueLabel}
            onChange={(h) => onHsvChange({ h })}
          />

          <ChannelSliders
            rgb={color.rgb}
            hsl={color.hsl}
            oklch={color.oklch}
            preservedHue={preservedHue}
            groupLabel={t.picker.channelsLabel}
            onRgbChange={onRgbChange}
            onHslChange={onHslChange}
            onOklchChange={onOklchChange}
          />
        </div>
      </section>

      {/* Right: Real-time Format Inputs, Validation & One-Click Copy */}
      <div className="lg:col-span-6 min-w-0 max-w-full">
        <FormatInputsPanel
          pickerState={pickerState}
          platformTarget={platformTarget}
          t={t}
          onValidStateChange={onStateChange}
          onErrorStateChange={onErrorStateChange}
          resetSignal={resetSignal}
        />
      </div>
    </div>
  );
}

export function ColorPickerWorkspace() {
  const [pickerState, setPickerState] = useState<PickerColorState>(() =>
    createPickerState(DEFAULT_PICKER_HEX)
  );
  const [resetSignal, setResetSignal] = useState<number>(0);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const nativePickerRef = useRef<HTMLInputElement | null>(null);

  const { color } = pickerState;
  const isDefaultColor = color.hex === DEFAULT_PICKER_HEX;

  const handleHsvChange = useCallback(
    (patch: { h?: number; s?: number; v?: number }) => {
      setPickerState((prev) => updatePickerFromHsv(prev, patch));
    },
    []
  );

  const handleRgbChange = useCallback((patch: Partial<RgbColor>) => {
    setPickerState((prev) => updatePickerFromRgb(prev, patch));
  }, []);

  const handleHslChange = useCallback((patch: Partial<HslColor>) => {
    setPickerState((prev) => updatePickerFromHsl(prev, patch));
  }, []);

  const handleOklchChange = useCallback((patch: Partial<OklchColor>) => {
    setPickerState((prev) => updatePickerFromOklch(prev, patch));
  }, []);

  const handleReset = useCallback(() => {
    setPickerState(createPickerState(DEFAULT_PICKER_HEX));
    setHasErrors(false);
    setResetSignal((n) => n + 1);
  }, []);

  return (
    <WorkspaceShell
      activeSection="workspace"
      pageTitle={(t) => t.picker.pageTitle}
      inspectorSections={(t) => [
        {
          title: t.picker.inspectorColorSection,
          properties: [
            { label: 'HEX', value: color.hex, mono: true },
            {
              label: t.picker.inspectorLightnessLabel,
              value: `${(color.oklch.l * 100).toFixed(1)}%`,
              mono: true,
            },
            {
              label: t.picker.inspectorChromaLabel,
              value: color.oklch.c.toFixed(4),
              mono: true,
            },
            {
              label: t.picker.inspectorHueLabel,
              value: `${color.oklch.h.toFixed(1)}°`,
              mono: true,
            },
            {
              label: t.picker.inspectorGamutLabel,
              value: color.gamut.wasMapped
                ? t.picker.mappedToSrgb
                : t.picker.inSrgb,
              mono: true,
            },
            {
              label: t.picker.inspectorComposeLabel,
              value: toAndroidComposeLiteral(color.hex),
              mono: true,
            },
          ],
        },
      ]}
      toolbar={(t) => (
        <Toolbar
          leading={
            <div className="flex items-center gap-2 min-w-0">
              <span
                aria-hidden="true"
                style={{ backgroundColor: color.hex }}
                className="h-3.5 w-3.5 rounded-xs border border-line-strong shrink-0"
              />
              <span className="text-[12px] font-semibold text-ink truncate">
                {t.picker.toolbarTitle}
              </span>
              <Badge variant="outline" mono>
                {color.hex.slice(0, 7)}
              </Badge>
            </div>
          }
          trailing={
            <div className="flex items-center gap-1.5">
              <input
                ref={nativePickerRef}
                type="color"
                aria-label={t.picker.systemPicker}
                value={color.hex.slice(0, 7)}
                onChange={(e) =>
                  setPickerState((prev) =>
                    createPickerState(e.target.value, prev.preservedHue)
                  )
                }
                className="sr-only"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => nativePickerRef.current?.click()}
                aria-label={t.picker.systemPicker}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="pipette" size={13} />
                  <span className="hidden sm:inline">
                    {t.picker.systemPicker}
                  </span>
                </span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                disabled={isDefaultColor && !hasErrors}
                onClick={handleReset}
                aria-label={t.picker.resetAria}
                leadingIcon={<Icon name="reset" size={13} />}
              >
                {t.picker.reset}
              </Button>
            </div>
          }
        />
      )}
    >
      {() => (
        <PickerStage
          pickerState={pickerState}
          resetSignal={resetSignal}
          onStateChange={setPickerState}
          onErrorStateChange={setHasErrors}
          onHsvChange={handleHsvChange}
          onRgbChange={handleRgbChange}
          onHslChange={handleHslChange}
          onOklchChange={handleOklchChange}
        />
      )}
    </WorkspaceShell>
  );
}
