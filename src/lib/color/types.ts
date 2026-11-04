export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

/**
 * Standard 8-bit sRGB channels (r, g, b in [0, 255], alpha in [0, 1]).
 */
export interface RgbColor {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

/**
 * Cylindrical sRGB HSL representation (h in [0, 360), s & l in [0, 100], alpha in [0, 1]).
 */
export interface HslColor {
  h: number;
  s: number;
  l: number;
  alpha?: number;
}

/**
 * Perceptual OKLCH representation (l in [0, 1], c >= 0, h in [0, 360), alpha in [0, 1]).
 */
export interface OklchColor {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

export type ColorInput = string | RgbColor | HslColor | OklchColor;

export type ValidationResult =
  | {
      valid: true;
      format: ColorFormat;
    }
  | {
      valid: false;
      error: string;
    };

export interface GamutReport {
  /** Whether the input color lies within the standard sRGB cube (within floating-point tolerance). */
  inSrgb: boolean;
  /** Whether chroma reduction was applied to map an out-of-gamut color into sRGB. */
  wasMapped: boolean;
  /** Original perceptual OKLCH coordinates prior to sRGB gamut mapping. */
  originalOklch: OklchColor;
  /** sRGB-displayable OKLCH coordinates after gamut mapping. */
  mappedOklch: OklchColor;
}

export interface CssColorStrings {
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
}

export interface ConvertedColor {
  /** Uppercase sRGB HEX string (#RRGGBB or #RRGGBBAA when alpha < 1). */
  hex: string;
  /** sRGB 0–255 channel values (gamut-safe). */
  rgb: RgbColor;
  /** sRGB HSL values (gamut-safe). */
  hsl: HslColor;
  /** sRGB-safe perceptual OKLCH coordinates (see `gamut.originalOklch` for unmapped wide-gamut input). */
  oklch: OklchColor;
  /** Ready-to-use CSS Color 4 strings. */
  css: CssColorStrings;
  /** sRGB gamut diagnostic metadata. */
  gamut: GamutReport;
}

export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic';

export interface HarmonyOptions {
  /** Hue offset in degrees for analogous neighbors (default: 30). */
  analogousAngle?: number;
  /** Deviation from 180° for split-complementary (default: 30 -> 150° & 210°). */
  splitAngle?: number;
  /** Secondary pair offset for tetradic harmony (default: 60 for rectangular; use 90 for square). */
  tetradicAngle?: number;
  /** Number of tonal variations for monochromatic harmony (default: 5, range: 3–9). */
  monochromaticSteps?: number;
}

export interface HarmonyStep extends ConvertedColor {
  role: string;
  angleOffset: number;
}

export interface HarmonyResult {
  type: HarmonyType;
  base: ConvertedColor;
  steps: HarmonyStep[];
}
