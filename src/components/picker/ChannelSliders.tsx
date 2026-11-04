import { useState } from 'react';
import type { HslColor, OklchColor, RgbColor } from '@/lib/color';
import { SegmentedControl } from '@/components/ui';

type ChannelMode = 'oklch' | 'rgb' | 'hsl';

export interface ChannelSlidersProps {
  rgb: RgbColor;
  hsl: HslColor;
  oklch: OklchColor;
  preservedHue: number;
  groupLabel: string;
  onRgbChange: (patch: Partial<RgbColor>) => void;
  onHslChange: (patch: Partial<HslColor>) => void;
  onOklchChange: (patch: Partial<OklchColor>) => void;
}

interface ChannelRowSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  displayValue: string;
  trackBackground: string;
  onChange: (val: number) => void;
}

export function ChannelSliders({
  rgb,
  hsl,
  oklch,
  preservedHue,
  groupLabel,
  onRgbChange,
  onHslChange,
  onOklchChange,
}: ChannelSlidersProps) {
  const [mode, setMode] = useState<ChannelMode>('oklch');

  const activeOklchHue = oklch.c > 0 ? oklch.h : preservedHue;
  const activeHslHue = hsl.s > 0 ? hsl.h : preservedHue;

  const rows: ChannelRowSpec[] =
    mode === 'oklch'
      ? [
          {
            key: 'oklch-l',
            label: 'L',
            min: 0,
            max: 1,
            step: 0.01,
            value: oklch.l,
            displayValue: oklch.l.toFixed(2),
            trackBackground: `linear-gradient(to right, #000000, oklch(0.55 ${Math.max(0.05, oklch.c)} ${activeOklchHue}), #ffffff)`,
            onChange: (l) => onOklchChange({ l }),
          },
          {
            key: 'oklch-c',
            label: 'C',
            min: 0,
            max: 0.37,
            step: 0.005,
            value: oklch.c,
            displayValue: oklch.c.toFixed(3),
            trackBackground: `linear-gradient(to right, oklch(${oklch.l} 0 ${activeOklchHue}), oklch(${oklch.l} 0.32 ${activeOklchHue}))`,
            onChange: (c) => onOklchChange({ c }),
          },
          {
            key: 'oklch-h',
            label: 'H',
            min: 0,
            max: 360,
            step: 1,
            value: Math.round(activeOklchHue),
            displayValue: `${Math.round(activeOklchHue)}°`,
            trackBackground:
              'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
            onChange: (h) => onOklchChange({ h }),
          },
        ]
      : mode === 'rgb'
        ? [
            {
              key: 'rgb-r',
              label: 'R',
              min: 0,
              max: 255,
              step: 1,
              value: rgb.r,
              displayValue: String(rgb.r),
              trackBackground: `linear-gradient(to right, rgb(0 ${rgb.g} ${rgb.b}), rgb(255 ${rgb.g} ${rgb.b}))`,
              onChange: (r) => onRgbChange({ r }),
            },
            {
              key: 'rgb-g',
              label: 'G',
              min: 0,
              max: 255,
              step: 1,
              value: rgb.g,
              displayValue: String(rgb.g),
              trackBackground: `linear-gradient(to right, rgb(${rgb.r} 0 ${rgb.b}), rgb(${rgb.r} 255 ${rgb.b}))`,
              onChange: (g) => onRgbChange({ g }),
            },
            {
              key: 'rgb-b',
              label: 'B',
              min: 0,
              max: 255,
              step: 1,
              value: rgb.b,
              displayValue: String(rgb.b),
              trackBackground: `linear-gradient(to right, rgb(${rgb.r} ${rgb.g} 0), rgb(${rgb.r} ${rgb.g} 255))`,
              onChange: (b) => onRgbChange({ b }),
            },
          ]
        : [
            {
              key: 'hsl-h',
              label: 'H',
              min: 0,
              max: 360,
              step: 1,
              value: Math.round(activeHslHue),
              displayValue: `${Math.round(activeHslHue)}°`,
              trackBackground:
                'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
              onChange: (h) => onHslChange({ h }),
            },
            {
              key: 'hsl-s',
              label: 'S',
              min: 0,
              max: 100,
              step: 1,
              value: Math.round(hsl.s),
              displayValue: `${Math.round(hsl.s)}%`,
              trackBackground: `linear-gradient(to right, hsl(${activeHslHue} 0% ${hsl.l}%), hsl(${activeHslHue} 100% ${hsl.l}%))`,
              onChange: (s) => onHslChange({ s }),
            },
            {
              key: 'hsl-l',
              label: 'L',
              min: 0,
              max: 100,
              step: 1,
              value: Math.round(hsl.l),
              displayValue: `${Math.round(hsl.l)}%`,
              trackBackground: `linear-gradient(to right, #000000, hsl(${activeHslHue} ${hsl.s}% 50%), #ffffff)`,
              onChange: (l) => onHslChange({ l }),
            },
          ];

  return (
    <div className="pt-2 border-t border-line-subtle space-y-3 min-w-0">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[12px] font-medium text-ink-secondary">
          {groupLabel}
        </span>
        <SegmentedControl
          label={groupLabel}
          options={[
            { value: 'oklch', label: 'OKLCH' },
            { value: 'rgb', label: 'RGB' },
            { value: 'hsl', label: 'HSL' },
          ]}
          value={mode}
          onChange={setMode}
          size="sm"
        />
      </div>

      <div className="space-y-2.5 min-w-0">
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[1.5rem_1fr_3.25rem] items-center gap-2.5 min-w-0"
          >
            <label
              htmlFor={`slider-${row.key}`}
              className="font-mono text-[11px] font-semibold text-ink-secondary select-none"
            >
              {row.label}
            </label>

            <input
              id={`slider-${row.key}`}
              type="range"
              min={row.min}
              max={row.max}
              step={row.step}
              value={row.value}
              onChange={(e) => row.onChange(Number(e.target.value))}
              style={{ background: row.trackBackground }}
              className="h-2.5 w-full min-w-0 appearance-none rounded-full border border-line cursor-pointer accent-ink"
            />

            <span className="font-mono text-[11px] text-ink-secondary text-right tabular-nums select-none">
              {row.displayValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
