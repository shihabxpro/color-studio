import { oklch as toCuloriOklch, rgb as toCuloriRgb, toGamut, type Color, type Rgb } from 'culori';
import type { ColorInput, GamutReport, OklchColor } from './types';
import { normalizeHue, parseValidColor } from './validation';

/**
 * Tolerance used when checking sRGB [0, 1] channel bounds to avoid false
 * out-of-gamut flags caused by IEEE-754 round-trip precision drift.
 */
const SRGB_GAMUT_EPSILON = 1e-4;
const ACHROMATIC_CHROMA_THRESHOLD = 1e-5;

const mapOklchToSrgb = toGamut('rgb', 'oklch');

function clampUnit(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function culoriToOklchColor(color: Color): OklchColor {
  const converted = toCuloriOklch(color);
  const rawC = converted.c ?? 0;
  const isAchromatic = rawC < ACHROMATIC_CHROMA_THRESHOLD;
  const l = clampUnit(converted.l ?? 0);
  const c = isAchromatic ? 0 : roundTo(rawC, 4);
  const h = isAchromatic ? 0 : roundTo(normalizeHue(converted.h ?? 0), 2);

  return {
    l: roundTo(l, 4),
    c,
    h,
    ...(converted.alpha !== undefined && converted.alpha < 1
      ? { alpha: roundTo(clampUnit(converted.alpha), 4) }
      : {}),
  };
}

export function isCuloriColorInSrgb(color: Color): boolean {
  const srgb = toCuloriRgb(color);
  return (
    srgb.r >= -SRGB_GAMUT_EPSILON &&
    srgb.r <= 1 + SRGB_GAMUT_EPSILON &&
    srgb.g >= -SRGB_GAMUT_EPSILON &&
    srgb.g <= 1 + SRGB_GAMUT_EPSILON &&
    srgb.b >= -SRGB_GAMUT_EPSILON &&
    srgb.b <= 1 + SRGB_GAMUT_EPSILON
  );
}

/**
 * Checks whether a valid color input lies within the displayable sRGB gamut.
 */
export function isInSrgbGamut(input: ColorInput): boolean {
  const { culoriColor } = parseValidColor(input);
  return isCuloriColorInSrgb(culoriColor);
}

/**
 * Maps any valid color into the sRGB gamut using CSS Color 4 perceptual OKLCH
 * chroma reduction while preserving perceived lightness and hue.
 */
export function mapColorToSrgb(color: Color): {
  srgb: Rgb;
  gamut: GamutReport;
} {
  const originalOklch = culoriToOklchColor(color);
  const inSrgb = isCuloriColorInSrgb(color);

  if (inSrgb) {
    const directRgb = toCuloriRgb(color);
    const clampedDirect: Rgb = {
      mode: 'rgb',
      r: clampUnit(directRgb.r),
      g: clampUnit(directRgb.g),
      b: clampUnit(directRgb.b),
      ...(directRgb.alpha !== undefined ? { alpha: clampUnit(directRgb.alpha) } : {}),
    };

    return {
      srgb: clampedDirect,
      gamut: {
        inSrgb: true,
        wasMapped: false,
        originalOklch,
        mappedOklch: originalOklch,
      },
    };
  }

  const gamutMapped = mapOklchToSrgb(color);
  const clampedMapped: Rgb = {
    mode: 'rgb',
    r: clampUnit(gamutMapped.r),
    g: clampUnit(gamutMapped.g),
    b: clampUnit(gamutMapped.b),
    ...(color.alpha !== undefined ? { alpha: clampUnit(color.alpha) } : {}),
  };

  const mappedOklch = culoriToOklchColor(clampedMapped);

  return {
    srgb: clampedMapped,
    gamut: {
      inSrgb: false,
      wasMapped: true,
      originalOklch,
      mappedOklch,
    },
  };
}

/**
 * Public convenience utility returning an sRGB-gamut-safe OKLCH color and report.
 */
export function clampToSrgbGamut(input: ColorInput): GamutReport {
  const { culoriColor } = parseValidColor(input);
  return mapColorToSrgb(culoriColor).gamut;
}
