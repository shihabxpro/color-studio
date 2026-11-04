import { describe, expect, it } from 'vitest';
import {
  clampToSrgbGamut,
  isInSrgbGamut,
  isValidHex,
  isValidHsl,
  isValidOklch,
  isValidRgb,
  validateColorInput,
} from '@/lib/color';

describe('Color input validation', () => {
  it('validates 3, 4, 6, and 8 digit HEX strings with or without leading #', () => {
    expect(isValidHex('#2563EB')).toBe(true);
    expect(isValidHex('2563eb')).toBe(true);
    expect(isValidHex('#fff')).toBe(true);
    expect(isValidHex('#ffff')).toBe(true);
    expect(isValidHex('#2563EB80')).toBe(true);

    expect(isValidHex('')).toBe(false);
    expect(isValidHex('#12')).toBe(false);
    expect(isValidHex('#12345')).toBe(false);
    expect(isValidHex('#GGGGGG')).toBe(false);
    expect(isValidHex('rgb(0,0,0)')).toBe(false);
  });

  it('validates RGB objects and CSS strings within [0, 255]', () => {
    expect(isValidRgb({ r: 37, g: 99, b: 235 })).toBe(true);
    expect(isValidRgb({ r: 0, g: 255, b: 128, alpha: 0.5 })).toBe(true);
    expect(isValidRgb({ r: 256, g: 0, b: 0 })).toBe(false);
    expect(isValidRgb({ r: -1, g: 0, b: 0 })).toBe(false);
    expect(isValidRgb({ r: 10, g: 10, b: 10, alpha: 1.2 })).toBe(false);

    expect(validateColorInput('rgb(37, 99, 235)')).toEqual({
      valid: true,
      format: 'rgb',
    });
    expect(validateColorInput('rgb(37 99 235 / 0.5)')).toEqual({
      valid: true,
      format: 'rgb',
    });
    expect(validateColorInput('rgb(300, 0, 0)').valid).toBe(false);
    expect(validateColorInput('rgb(-10, 20, 30)').valid).toBe(false);
  });

  it('validates HSL objects and CSS strings', () => {
    expect(isValidHsl({ h: 221, s: 83, l: 53 })).toBe(true);
    expect(isValidHsl({ h: -30, s: 50, l: 50 })).toBe(true); // hue wraps cleanly
    expect(isValidHsl({ h: 120, s: 120, l: 50 })).toBe(false);
    expect(isValidHsl({ h: 120, s: 50, l: -5 })).toBe(false);

    expect(validateColorInput('hsl(221.2 83.2% 53.3%)')).toEqual({
      valid: true,
      format: 'hsl',
    });
    expect(validateColorInput('hsl(120, 150%, 50%)').valid).toBe(false);
    expect(validateColorInput('hsl(120 50 50)').valid).toBe(false);
  });

  it('validates OKLCH objects and CSS strings', () => {
    expect(isValidOklch({ l: 0.55, c: 0.21, h: 262 })).toBe(true);
    expect(isValidOklch({ l: 1.2, c: 0.1, h: 90 })).toBe(false);
    expect(isValidOklch({ l: 0.5, c: -0.05, h: 90 })).toBe(false);

    expect(validateColorInput('oklch(0.55 0.21 262)')).toEqual({
      valid: true,
      format: 'oklch',
    });
    expect(validateColorInput('oklch(55% 0.21 262 / 0.8)')).toEqual({
      valid: true,
      format: 'oklch',
    });
    expect(validateColorInput('oklch(1.5 0.2 120)').valid).toBe(false);
    expect(validateColorInput('oklch(0.5 -0.1 120)').valid).toBe(false);
    expect(validateColorInput('not-a-color').valid).toBe(false);
  });
});

describe('sRGB gamut detection and perceptual mapping', () => {
  it('identifies standard sRGB colors as in-gamut without modification', () => {
    expect(isInSrgbGamut('#2563EB')).toBe(true);
    expect(isInSrgbGamut('#FFFFFF')).toBe(true);
    expect(isInSrgbGamut('#000000')).toBe(true);

    const report = clampToSrgbGamut('#2563EB');
    expect(report.inSrgb).toBe(true);
    expect(report.wasMapped).toBe(false);
    expect(report.mappedOklch).toEqual(report.originalOklch);
  });

  it('detects wide-gamut OKLCH colors and maps chroma into displayable sRGB', () => {
    const wideGreen = { l: 0.78, c: 0.36, h: 145 };
    expect(isInSrgbGamut(wideGreen)).toBe(false);

    const report = clampToSrgbGamut(wideGreen);
    expect(report.inSrgb).toBe(false);
    expect(report.wasMapped).toBe(true);
    expect(report.originalOklch.c).toBe(0.36);
    expect(report.mappedOklch.c).toBeLessThan(report.originalOklch.c);
    expect(report.mappedOklch.c).toBeGreaterThan(0.15);
    expect(isInSrgbGamut(report.mappedOklch)).toBe(true);
    // Perceptual lightness stays closely aligned
    expect(Math.abs(report.mappedOklch.l - wideGreen.l)).toBeLessThan(0.03);
  });
});
