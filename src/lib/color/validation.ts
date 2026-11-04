import { parse, parseHex, type Color } from 'culori';
import type {
  ColorFormat,
  ColorInput,
  HslColor,
  OklchColor,
  RgbColor,
  ValidationResult,
} from './types';

const HEX_PATTERN =
  /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const MAX_REASONABLE_CHROMA = 0.5;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidAlpha(alpha: unknown): boolean {
  return alpha === undefined || (isFiniteNumber(alpha) && alpha >= 0 && alpha <= 1);
}

export function normalizeHue(hue: number): number {
  const mod = ((hue % 360) + 360) % 360;
  return Object.is(mod, -0) || Math.abs(mod - 360) < 1e-9 ? 0 : mod;
}

export function isRgbObject(input: unknown): input is RgbColor {
  return (
    typeof input === 'object' &&
    input !== null &&
    'r' in input &&
    'g' in input &&
    'b' in input
  );
}

export function isHslObject(input: unknown): input is HslColor {
  return (
    typeof input === 'object' &&
    input !== null &&
    'h' in input &&
    's' in input &&
    'l' in input &&
    !('c' in input)
  );
}

export function isOklchObject(input: unknown): input is OklchColor {
  return (
    typeof input === 'object' &&
    input !== null &&
    'l' in input &&
    'c' in input &&
    'h' in input
  );
}

export function isValidHex(input: string): boolean {
  if (typeof input !== 'string') return false;
  return HEX_PATTERN.test(input.trim());
}

export function isValidRgb(input: RgbColor): boolean {
  return (
    isRgbObject(input) &&
    isFiniteNumber(input.r) &&
    input.r >= 0 &&
    input.r <= 255 &&
    isFiniteNumber(input.g) &&
    input.g >= 0 &&
    input.g <= 255 &&
    isFiniteNumber(input.b) &&
    input.b >= 0 &&
    input.b <= 255 &&
    isValidAlpha(input.alpha)
  );
}

export function isValidHsl(input: HslColor): boolean {
  return (
    isHslObject(input) &&
    isFiniteNumber(input.h) &&
    isFiniteNumber(input.s) &&
    input.s >= 0 &&
    input.s <= 100 &&
    isFiniteNumber(input.l) &&
    input.l >= 0 &&
    input.l <= 100 &&
    isValidAlpha(input.alpha)
  );
}

export function isValidOklch(input: OklchColor): boolean {
  return (
    isOklchObject(input) &&
    isFiniteNumber(input.l) &&
    input.l >= 0 &&
    input.l <= 1 &&
    isFiniteNumber(input.c) &&
    input.c >= 0 &&
    input.c <= MAX_REASONABLE_CHROMA &&
    isFiniteNumber(input.h) &&
    isValidAlpha(input.alpha)
  );
}

/**
 * Checks raw numeric tokens inside CSS functional color strings so out-of-bounds
 * values (e.g. `rgb(300, -5, 0)`, `hsl(120, 140%, 50%)`, `oklch(1.4 -0.1 90)`)
 * are rejected rather than silently clamped by downstream parsers.
 */
function validateFunctionalBounds(
  fnName: 'rgb' | 'hsl' | 'oklch',
  raw: string
): string | null {
  const innerMatch = raw.match(/^[a-zA-Z]+\((.+)\)$/);
  if (!innerMatch) return `Malformed ${fnName.toUpperCase()} syntax.`;

  const body = innerMatch[1].trim();
  const slashParts = body.split('/');
  if (slashParts.length > 2) {
    return `Invalid alpha separator in ${fnName.toUpperCase()} string.`;
  }

  const channelTokens = slashParts[0]
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);

  if (slashParts.length === 1 && channelTokens.length === 4 && fnName !== 'oklch') {
    const alphaToken = channelTokens.pop()!;
    if (!isValidAlphaToken(alphaToken)) {
      return `Alpha value "${alphaToken}" must be in [0, 1] or [0%, 100%].`;
    }
  } else if (slashParts.length === 2) {
    const alphaToken = slashParts[1].trim();
    if (!alphaToken || !isValidAlphaToken(alphaToken)) {
      return `Alpha value "${alphaToken}" must be in [0, 1] or [0%, 100%].`;
    }
  }

  if (channelTokens.length !== 3) {
    return `${fnName.toUpperCase()} requires exactly 3 color channels.`;
  }

  if (fnName === 'rgb') {
    for (const token of channelTokens) {
      if (token.endsWith('%')) {
        const pct = Number(token.slice(0, -1));
        if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
          return `RGB percentage "${token}" must be between 0% and 100%.`;
        }
      } else {
        const num = Number(token);
        if (!Number.isFinite(num) || num < 0 || num > 255) {
          return `RGB channel "${token}" must be between 0 and 255.`;
        }
      }
    }
  } else if (fnName === 'hsl') {
    for (let i = 1; i <= 2; i++) {
      const token = channelTokens[i];
      if (!token.endsWith('%')) {
        return `HSL saturation and lightness must be percentages.`;
      }
      const pct = Number(token.slice(0, -1));
      if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
        return `HSL channel "${token}" must be between 0% and 100%.`;
      }
    }
  } else if (fnName === 'oklch') {
    const [lTok, cTok] = channelTokens;
    if (lTok.endsWith('%')) {
      const pct = Number(lTok.slice(0, -1));
      if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
        return `OKLCH lightness "${lTok}" must be between 0% and 100%.`;
      }
    } else {
      const l = Number(lTok);
      if (!Number.isFinite(l) || l < 0 || l > 1) {
        return `OKLCH lightness "${lTok}" must be between 0 and 1.`;
      }
    }

    if (cTok.endsWith('%')) {
      const pct = Number(cTok.slice(0, -1));
      if (!Number.isFinite(pct) || pct < 0 || pct > 125) {
        return `OKLCH chroma "${cTok}" is out of range.`;
      }
    } else {
      const c = Number(cTok);
      if (!Number.isFinite(c) || c < 0 || c > MAX_REASONABLE_CHROMA) {
        return `OKLCH chroma "${cTok}" must be between 0 and ${MAX_REASONABLE_CHROMA}.`;
      }
    }
  }

  return null;
}

function isValidAlphaToken(token: string): boolean {
  if (token.endsWith('%')) {
    const pct = Number(token.slice(0, -1));
    return Number.isFinite(pct) && pct >= 0 && pct <= 100;
  }
  const num = Number(token);
  return Number.isFinite(num) && num >= 0 && num <= 1;
}

export interface ParsedInternalColor {
  format: ColorFormat;
  culoriColor: Color;
}

/**
 * Parses and strictly validates any supported ColorInput (HEX, RGB, HSL, OKLCH)
 * into a Culori Color object. Throws an Error if invalid.
 */
export function parseValidColor(input: ColorInput): ParsedInternalColor {
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) {
      throw new Error('Color input string cannot be empty.');
    }

    if (isValidHex(trimmed)) {
      const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
      const parsed = parseHex(withHash);
      if (!parsed) {
        throw new Error(`Invalid HEX color "${input}".`);
      }
      return { format: 'hex', culoriColor: parsed };
    }

    const lower = trimmed.toLowerCase();
    if (lower.startsWith('rgb(') || lower.startsWith('rgba(')) {
      const err = validateFunctionalBounds('rgb', trimmed);
      if (err) throw new Error(err);
      const parsed = parse(trimmed);
      if (!parsed) throw new Error(`Invalid RGB color "${input}".`);
      return { format: 'rgb', culoriColor: parsed };
    }

    if (lower.startsWith('hsl(') || lower.startsWith('hsla(')) {
      const err = validateFunctionalBounds('hsl', trimmed);
      if (err) throw new Error(err);
      const parsed = parse(trimmed);
      if (!parsed) throw new Error(`Invalid HSL color "${input}".`);
      return { format: 'hsl', culoriColor: parsed };
    }

    if (lower.startsWith('oklch(')) {
      const err = validateFunctionalBounds('oklch', trimmed);
      if (err) throw new Error(err);
      const parsed = parse(trimmed);
      if (!parsed) throw new Error(`Invalid OKLCH color "${input}".`);
      return { format: 'oklch', culoriColor: parsed };
    }

    throw new Error(
      `Unsupported or invalid color string "${input}". Expected HEX, RGB, HSL, or OKLCH.`
    );
  }

  if (isRgbObject(input)) {
    if (!isValidRgb(input)) {
      throw new Error(
        'Invalid RGB object: r, g, b must be finite numbers in [0, 255] and alpha in [0, 1].'
      );
    }
    return {
      format: 'rgb',
      culoriColor: {
        mode: 'rgb',
        r: input.r / 255,
        g: input.g / 255,
        b: input.b / 255,
        ...(input.alpha !== undefined ? { alpha: input.alpha } : {}),
      },
    };
  }

  if (isHslObject(input)) {
    if (!isValidHsl(input)) {
      throw new Error(
        'Invalid HSL object: s and l must be in [0, 100], h finite, and alpha in [0, 1].'
      );
    }
    return {
      format: 'hsl',
      culoriColor: {
        mode: 'hsl',
        h: normalizeHue(input.h),
        s: input.s / 100,
        l: input.l / 100,
        ...(input.alpha !== undefined ? { alpha: input.alpha } : {}),
      },
    };
  }

  if (isOklchObject(input)) {
    if (!isValidOklch(input)) {
      throw new Error(
        `Invalid OKLCH object: l must be in [0, 1], c in [0, ${MAX_REASONABLE_CHROMA}], h finite, and alpha in [0, 1].`
      );
    }
    return {
      format: 'oklch',
      culoriColor: {
        mode: 'oklch',
        l: input.l,
        c: input.c,
        h: input.c === 0 ? 0 : normalizeHue(input.h),
        ...(input.alpha !== undefined ? { alpha: input.alpha } : {}),
      },
    };
  }

  throw new Error('Unsupported color input value.');
}

/**
 * Non-throwing validation helper for UI forms and external callers.
 */
export function validateColorInput(input: unknown): ValidationResult {
  try {
    const parsed = parseValidColor(input as ColorInput);
    return { valid: true, format: parsed.format };
  } catch (err) {
    return {
      valid: false,
      error: err instanceof Error ? err.message : 'Invalid color input.',
    };
  }
}
