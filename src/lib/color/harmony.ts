import { convertColor } from './convert';
import { roundTo } from './gamut';
import type {
  ColorInput,
  HarmonyOptions,
  HarmonyResult,
  HarmonyStep,
  HarmonyType,
  OklchColor,
} from './types';
import { normalizeHue } from './validation';

export const HARMONY_TYPES: readonly HarmonyType[] = [
  'complementary',
  'analogous',
  'triadic',
  'split-complementary',
  'tetradic',
  'monochromatic',
] as const;

function rotateOklchStep(
  baseOklch: OklchColor,
  angleOffset: number,
  role: string
): HarmonyStep {
  const rotated: OklchColor = {
    l: baseOklch.l,
    c: baseOklch.c,
    h: baseOklch.c === 0 ? 0 : normalizeHue(baseOklch.h + angleOffset),
    ...(baseOklch.alpha !== undefined ? { alpha: baseOklch.alpha } : {}),
  };

  return {
    ...convertColor(rotated),
    role,
    angleOffset,
  };
}

/**
 * Generates perceptually balanced monochromatic steps across OKLCH lightness
 * while gently tapering chroma near extreme highlights and shadows.
 */
function buildMonochromaticSteps(
  baseOklch: OklchColor,
  count: number
): HarmonyStep[] {
  const clampedCount = Math.min(9, Math.max(3, Math.round(count)));
  const minL = 0.24;
  const maxL = 0.88;
  const roles =
    clampedCount === 5
      ? ['shade-2', 'shade-1', 'base', 'tint-1', 'tint-2']
      : Array.from({ length: clampedCount }, (_, idx) => `step-${idx + 1}`);

  const midIndex = Math.floor(clampedCount / 2);

  return Array.from({ length: clampedCount }, (_, index) => {
    if (index === midIndex && clampedCount % 2 === 1) {
      return {
        ...convertColor(baseOklch),
        role: roles[index],
        angleOffset: 0,
      };
    }

    const t = clampedCount === 1 ? 0.5 : index / (clampedCount - 1);
    const targetL = roundTo(maxL - t * (maxL - minL), 4);
    // Taper chroma slightly near extremes so tints/shades remain natural in sRGB
    const extremity = Math.abs(targetL - 0.55) / 0.45;
    const chromaScale = Math.max(0.45, 1 - extremity * 0.35);
    const targetC = roundTo(baseOklch.c * chromaScale, 4);

    const stepColor: OklchColor = {
      l: targetL,
      c: targetC,
      h: baseOklch.c === 0 ? 0 : baseOklch.h,
      ...(baseOklch.alpha !== undefined ? { alpha: baseOklch.alpha } : {}),
    };

    return {
      ...convertColor(stepColor),
      role: roles[index],
      angleOffset: 0,
    };
  });
}

/**
 * Computes one of six perceptual color harmonies in OKLCH space with automatic
 * sRGB gamut mapping on every generated step:
 *  1. complementary       (0°, +180°)
 *  2. analogous           (-30°, 0°, +30°)
 *  3. triadic             (0°, +120°, +240°)
 *  4. split-complementary (0°, +150°, +210°)
 *  5. tetradic            (0°, +60°, +180°, +240°)
 *  6. monochromatic       (coordinated OKLCH lightness & chroma variations)
 */
export function generateHarmony(
  input: ColorInput,
  type: HarmonyType,
  options: HarmonyOptions = {}
): HarmonyResult {
  const base = convertColor(input);
  const baseOklch = base.oklch;

  const analogousAngle = options.analogousAngle ?? 30;
  const splitAngle = options.splitAngle ?? 30;
  const tetradicAngle = options.tetradicAngle ?? 60;
  const monochromaticSteps = options.monochromaticSteps ?? 5;

  let steps: HarmonyStep[];

  switch (type) {
    case 'complementary':
      steps = [
        rotateOklchStep(baseOklch, 0, 'base'),
        rotateOklchStep(baseOklch, 180, 'complement'),
      ];
      break;

    case 'analogous':
      steps = [
        rotateOklchStep(baseOklch, -analogousAngle, 'analogous-left'),
        rotateOklchStep(baseOklch, 0, 'base'),
        rotateOklchStep(baseOklch, analogousAngle, 'analogous-right'),
      ];
      break;

    case 'triadic':
      steps = [
        rotateOklchStep(baseOklch, 0, 'base'),
        rotateOklchStep(baseOklch, 120, 'triad-secondary'),
        rotateOklchStep(baseOklch, 240, 'triad-tertiary'),
      ];
      break;

    case 'split-complementary':
      steps = [
        rotateOklchStep(baseOklch, 0, 'base'),
        rotateOklchStep(baseOklch, 180 - splitAngle, 'split-left'),
        rotateOklchStep(baseOklch, 180 + splitAngle, 'split-right'),
      ];
      break;

    case 'tetradic':
      steps = [
        rotateOklchStep(baseOklch, 0, 'base'),
        rotateOklchStep(baseOklch, tetradicAngle, 'accent-pair'),
        rotateOklchStep(baseOklch, 180, 'complement'),
        rotateOklchStep(baseOklch, 180 + tetradicAngle, 'complement-pair'),
      ];
      break;

    case 'monochromatic':
      steps = buildMonochromaticSteps(baseOklch, monochromaticSteps);
      break;

    default: {
      const exhaustiveCheck: never = type;
      throw new Error(`Unsupported harmony type: ${String(exhaustiveCheck)}`);
    }
  }

  return {
    type,
    base,
    steps,
  };
}

export const getComplementaryHarmony = (input: ColorInput) =>
  generateHarmony(input, 'complementary');

export const getAnalogousHarmony = (input: ColorInput, angle = 30) =>
  generateHarmony(input, 'analogous', { analogousAngle: angle });

export const getTriadicHarmony = (input: ColorInput) =>
  generateHarmony(input, 'triadic');

export const getSplitComplementaryHarmony = (
  input: ColorInput,
  splitAngle = 30
) => generateHarmony(input, 'split-complementary', { splitAngle });

export const getTetradicHarmony = (input: ColorInput, tetradicAngle = 60) =>
  generateHarmony(input, 'tetradic', { tetradicAngle });

export const getMonochromaticHarmony = (input: ColorInput, steps = 5) =>
  generateHarmony(input, 'monochromatic', { monochromaticSteps: steps });
