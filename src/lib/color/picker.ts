import { hsv as toCuloriHsv, rgb as toCuloriRgb } from 'culori';
import { convertColor } from './convert';
import { roundTo } from './gamut';
import type {
  ColorFormat,
  ColorInput,
  ConvertedColor,
  HslColor,
  OklchColor,
  RgbColor,
} from './types';
import {
  isValidHex,
  isValidHsl,
  isValidOklch,
  isValidRgb,
  normalizeHue,
  validateColorInput,
} from './validation';

export const DEFAULT_PICKER_HEX = '#2563EB';

export interface HsvColor {
  /** Hue angle in degrees [0, 360) */
  h: number;
  /** Saturation percentage [0, 100] */
  s: number;
  /** Value / brightness percentage [0, 100] */
  v: number;
  alpha?: number;
}

export interface PickerColorState {
  color: ConvertedColor;
  hsv: HsvColor;
  /** Preserves hue angle when saturation/chroma reaches 0 (white/black/gray). */
  preservedHue: number;
}

export type FormatValidationErrorKey =
  | 'invalidHex'
  | 'invalidRgb'
  | 'invalidHsl'
  | 'invalidOklch';

export type FormatParseResult =
  | { ok: true; state: PickerColorState }
  | { ok: false; errorKey: FormatValidationErrorKey };

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Converts a ColorInput into a synchronized PickerColorState while preserving
 * fallback hue for achromatic colors.
 */
export function createPickerState(
  input: ColorInput = DEFAULT_PICKER_HEX,
  fallbackHue = 221.21
): PickerColorState {
  const color = convertColor(input);
  const culoriHsv = toCuloriHsv({
    mode: 'rgb',
    r: color.rgb.r / 255,
    g: color.rgb.g / 255,
    b: color.rgb.b / 255,
  });

  const s = roundTo((culoriHsv.s ?? 0) * 100, 2);
  const v = roundTo((culoriHsv.v ?? 0) * 100, 2);
  const hasChroma = s > 0.01 && v > 0.01;
  const resolvedHue = hasChroma
    ? roundTo(normalizeHue(culoriHsv.h ?? fallbackHue), 2)
    : roundTo(normalizeHue(fallbackHue), 2);

  return {
    color,
    hsv: {
      h: resolvedHue,
      s,
      v,
      ...(color.rgb.alpha !== undefined ? { alpha: color.rgb.alpha } : {}),
    },
    preservedHue: resolvedHue,
  };
}

/**
 * Updates picker state from 2D Saturation-Value area or Hue strip changes.
 */
export function updatePickerFromHsv(
  prev: PickerColorState,
  patch: Partial<HsvColor>
): PickerColorState {
  const h =
    patch.h !== undefined ? roundTo(normalizeHue(patch.h), 2) : prev.preservedHue;
  const s = clamp(patch.s ?? prev.hsv.s, 0, 100);
  const v = clamp(patch.v ?? prev.hsv.v, 0, 100);
  const alpha = patch.alpha ?? prev.hsv.alpha;

  const srgb = toCuloriRgb({
    mode: 'hsv',
    h,
    s: s / 100,
    v: v / 100,
    ...(alpha !== undefined ? { alpha } : {}),
  });

  const rgbInput: RgbColor = {
    r: clamp(srgb.r * 255, 0, 255),
    g: clamp(srgb.g * 255, 0, 255),
    b: clamp(srgb.b * 255, 0, 255),
    ...(alpha !== undefined ? { alpha } : {}),
  };

  const color = convertColor(rgbInput);

  return {
    color,
    hsv: {
      h,
      s: roundTo(s, 2),
      v: roundTo(v, 2),
      ...(alpha !== undefined ? { alpha } : {}),
    },
    preservedHue: h,
  };
}

export function updatePickerFromRgb(
  prev: PickerColorState,
  patch: Partial<RgbColor>
): PickerColorState {
  const nextRgb: RgbColor = {
    r: clamp(Math.round(patch.r ?? prev.color.rgb.r), 0, 255),
    g: clamp(Math.round(patch.g ?? prev.color.rgb.g), 0, 255),
    b: clamp(Math.round(patch.b ?? prev.color.rgb.b), 0, 255),
    ...(prev.color.rgb.alpha !== undefined ? { alpha: prev.color.rgb.alpha } : {}),
  };
  return createPickerState(nextRgb, prev.preservedHue);
}

export function updatePickerFromHsl(
  prev: PickerColorState,
  patch: Partial<HslColor>
): PickerColorState {
  const nextHue =
    patch.h !== undefined
      ? normalizeHue(patch.h)
      : prev.color.hsl.s > 0
        ? prev.color.hsl.h
        : prev.preservedHue;

  const nextHsl: HslColor = {
    h: roundTo(nextHue, 2),
    s: roundTo(clamp(patch.s ?? prev.color.hsl.s, 0, 100), 2),
    l: roundTo(clamp(patch.l ?? prev.color.hsl.l, 0, 100), 2),
    ...(prev.color.hsl.alpha !== undefined ? { alpha: prev.color.hsl.alpha } : {}),
  };

  const created = createPickerState(nextHsl, nextHue);
  return {
    ...created,
    preservedHue: roundTo(nextHue, 2),
  };
}

export function updatePickerFromOklch(
  prev: PickerColorState,
  patch: Partial<OklchColor>
): PickerColorState {
  const nextHue =
    patch.h !== undefined
      ? normalizeHue(patch.h)
      : prev.color.oklch.c > 0
        ? prev.color.oklch.h
        : prev.preservedHue;

  const nextOklch: OklchColor = {
    l: roundTo(clamp(patch.l ?? prev.color.oklch.l, 0, 1), 4),
    c: roundTo(clamp(patch.c ?? prev.color.oklch.c, 0, 0.4), 4),
    h: roundTo(nextHue, 2),
    ...(prev.color.oklch.alpha !== undefined
      ? { alpha: prev.color.oklch.alpha }
      : {}),
  };

  const created = createPickerState(nextOklch, nextHue);
  return {
    ...created,
    preservedHue: roundTo(nextHue, 2),
  };
}

/**
 * Parses and validates user-typed text for a specific color format field.
 * Supports both full CSS syntax (`rgb(37 99 235)`) and bare channel tuples (`37, 99, 235`).
 */
export function parseFormatInput(
  format: ColorFormat,
  rawValue: string,
  fallbackHue = 221.21
): FormatParseResult {
  const trimmed = rawValue.trim();

  if (format === 'hex') {
    if (!isValidHex(trimmed)) {
      return { ok: false, errorKey: 'invalidHex' };
    }
    return { ok: true, state: createPickerState(trimmed, fallbackHue) };
  }

  if (format === 'rgb') {
    const lower = trimmed.toLowerCase();
    if (lower.startsWith('rgb(') || lower.startsWith('rgba(')) {
      const check = validateColorInput(trimmed);
      if (!check.valid || check.format !== 'rgb') {
        return { ok: false, errorKey: 'invalidRgb' };
      }
      return { ok: true, state: createPickerState(trimmed, fallbackHue) };
    }

    const parts = trimmed.split(/[\s,]+/).filter(Boolean);
    if (parts.length === 3) {
      const [r, g, b] = parts.map(Number);
      const candidate: RgbColor = { r, g, b };
      if (isValidRgb(candidate)) {
        return { ok: true, state: createPickerState(candidate, fallbackHue) };
      }
    }
    return { ok: false, errorKey: 'invalidRgb' };
  }

  if (format === 'hsl') {
    const lower = trimmed.toLowerCase();
    if (lower.startsWith('hsl(') || lower.startsWith('hsla(')) {
      const check = validateColorInput(trimmed);
      if (!check.valid || check.format !== 'hsl') {
        return { ok: false, errorKey: 'invalidHsl' };
      }
      return { ok: true, state: createPickerState(trimmed, fallbackHue) };
    }

    const parts = trimmed.split(/[\s,]+/).filter(Boolean);
    if (parts.length === 3) {
      const h = Number(parts[0].replace(/deg$/i, ''));
      const s = Number(parts[1].replace(/%$/, ''));
      const l = Number(parts[2].replace(/%$/, ''));
      const candidate: HslColor = { h, s, l };
      if (isValidHsl(candidate)) {
        return { ok: true, state: createPickerState(candidate, fallbackHue) };
      }
    }
    return { ok: false, errorKey: 'invalidHsl' };
  }

  // format === 'oklch'
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('oklch(')) {
    const check = validateColorInput(trimmed);
    if (!check.valid || check.format !== 'oklch') {
      return { ok: false, errorKey: 'invalidOklch' };
    }
    return { ok: true, state: createPickerState(trimmed, fallbackHue) };
  }

  const parts = trimmed.split(/[\s,]+/).filter(Boolean);
  if (parts.length === 3) {
    const rawL = parts[0];
    const l = rawL.endsWith('%')
      ? Number(rawL.slice(0, -1)) / 100
      : Number(rawL);
    const c = Number(parts[1]);
    const h = Number(parts[2].replace(/deg$/i, ''));
    const candidate: OklchColor = { l, c, h };
    if (isValidOklch(candidate)) {
      return { ok: true, state: createPickerState(candidate, fallbackHue) };
    }
  }

  return { ok: false, errorKey: 'invalidOklch' };
}

/**
 * Returns whether light or dark foreground ink provides clearer contrast on top
 * of the given color swatch.
 */
export function getContrastingInk(color: ConvertedColor): 'light' | 'dark' {
  return color.oklch.l > 0.64 ? 'dark' : 'light';
}

/**
 * Formats a HEX string (#RRGGBB or #RRGGBBAA) as a Jetpack Compose Color literal
 * using Android's ARGB byte order (0xAARRGGBB).
 */
export function toAndroidComposeLiteral(hex: string): string {
  const clean = hex.replace(/^#/, '').toUpperCase();
  if (clean.length === 8) {
    const rrggbb = clean.slice(0, 6);
    const aa = clean.slice(6, 8);
    return `Color(0x${aa}${rrggbb})`;
  }
  return `Color(0xFF${clean})`;
}

/**
 * Normalizes pointer coordinates within a bounding box into [0, 1] ratios.
 */
export function getNormalizedPointerPosition(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): { x: number; y: number } {
  const x = rect.width > 0 ? clamp((clientX - rect.left) / rect.width, 0, 1) : 0;
  const y =
    rect.height > 0 ? clamp((clientY - rect.top) / rect.height, 0, 1) : 0;
  return { x, y };
}
