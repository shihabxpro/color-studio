import { formatHex, formatHex8, hsl as toCuloriHsl } from 'culori';
import { culoriToOklchColor, mapColorToSrgb, roundTo } from './gamut';
import type {
  ColorInput,
  ConvertedColor,
  HslColor,
  OklchColor,
  RgbColor,
} from './types';
import { normalizeHue, parseValidColor } from './validation';

const ACHROMATIC_SATURATION_THRESHOLD = 1e-4;

export function formatRgbCss(rgb: RgbColor): string {
  const r = Math.round(rgb.r);
  const g = Math.round(rgb.g);
  const b = Math.round(rgb.b);
  if (rgb.alpha !== undefined && rgb.alpha < 1) {
    return `rgb(${r} ${g} ${b} / ${roundTo(rgb.alpha, 3)})`;
  }
  return `rgb(${r} ${g} ${b})`;
}

export function formatHslCss(hsl: HslColor): string {
  const h = roundTo(hsl.h, 1);
  const s = roundTo(hsl.s, 1);
  const l = roundTo(hsl.l, 1);
  if (hsl.alpha !== undefined && hsl.alpha < 1) {
    return `hsl(${h} ${s}% ${l}% / ${roundTo(hsl.alpha, 3)})`;
  }
  return `hsl(${h} ${s}% ${l}%)`;
}

export function formatOklchCss(oklch: OklchColor): string {
  const l = roundTo(oklch.l, 4);
  const c = roundTo(oklch.c, 4);
  const h = roundTo(oklch.h, 2);
  if (oklch.alpha !== undefined && oklch.alpha < 1) {
    return `oklch(${l} ${c} ${h} / ${roundTo(oklch.alpha, 3)})`;
  }
  return `oklch(${l} ${c} ${h})`;
}

/**
 * Converts any valid ColorInput (HEX, RGB, HSL, OKLCH) into a complete,
 * sRGB-gamut-safe ConvertedColor snapshot with CSS strings and gamut report.
 */
export function convertColor(input: ColorInput): ConvertedColor {
  const { culoriColor } = parseValidColor(input);
  const { srgb, gamut } = mapColorToSrgb(culoriColor);

  const hasSubUnitAlpha = srgb.alpha !== undefined && srgb.alpha < 1;
  const alphaValue = hasSubUnitAlpha ? roundTo(srgb.alpha!, 4) : undefined;

  const hex = (hasSubUnitAlpha ? formatHex8(srgb) : formatHex(srgb)).toUpperCase();

  const rgb: RgbColor = {
    r: Math.round(srgb.r * 255),
    g: Math.round(srgb.g * 255),
    b: Math.round(srgb.b * 255),
    ...(alphaValue !== undefined ? { alpha: alphaValue } : {}),
  };

  const culoriHsl = toCuloriHsl(srgb);
  const rawS = culoriHsl.s ?? 0;
  const isGray = rawS < ACHROMATIC_SATURATION_THRESHOLD;
  const hsl: HslColor = {
    h: isGray ? 0 : roundTo(normalizeHue(culoriHsl.h ?? 0), 2),
    s: isGray ? 0 : roundTo(rawS * 100, 2),
    l: roundTo((culoriHsl.l ?? 0) * 100, 2),
    ...(alphaValue !== undefined ? { alpha: alphaValue } : {}),
  };

  const oklch = gamut.mappedOklch;

  return {
    hex,
    rgb,
    hsl,
    oklch,
    css: {
      hex,
      rgb: formatRgbCss(rgb),
      hsl: formatHslCss(hsl),
      oklch: formatOklchCss(oklch),
    },
    gamut,
  };
}

export function toHex(input: ColorInput): string {
  return convertColor(input).hex;
}

export function toRgb(input: ColorInput): RgbColor {
  return convertColor(input).rgb;
}

/**
 * Converts a valid input to OKLCH while preserving wide-gamut coordinates if
 * `preserveWideGamut` is true (default: false -> sRGB-safe OKLCH).
 */
export function toOklch(
  input: ColorInput,
  options?: { preserveWideGamut?: boolean }
): OklchColor {
  if (options?.preserveWideGamut) {
    const { culoriColor } = parseValidColor(input);
    return culoriToOklchColor(culoriColor);
  }
  return convertColor(input).oklch;
}

export function toHsl(input: ColorInput): HslColor {
  return convertColor(input).hsl;
}

// Explicit pairwise helpers for ergonomic developer imports
export const hexToRgb = (hex: string): RgbColor => toRgb(hex);
export const rgbToHex = (rgb: RgbColor): string => toHex(rgb);

export const hexToHsl = (hex: string): HslColor => toHsl(hex);
export const hslToHex = (hsl: HslColor): string => toHex(hsl);

export const hexToOklch = (hex: string): OklchColor => toOklch(hex);
export const oklchToHex = (oklch: OklchColor): string => toHex(oklch);

export const rgbToHsl = (rgb: RgbColor): HslColor => toHsl(rgb);
export const hslToRgb = (hsl: HslColor): RgbColor => toRgb(hsl);

export const rgbToOklch = (rgb: RgbColor): OklchColor => toOklch(rgb);
export const oklchToRgb = (oklch: OklchColor): RgbColor => toRgb(oklch);

export const hslToOklch = (hsl: HslColor): OklchColor => toOklch(hsl);
export const oklchToHsl = (oklch: OklchColor): HslColor => toHsl(oklch);
