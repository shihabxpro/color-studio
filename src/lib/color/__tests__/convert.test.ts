import { describe, expect, it } from 'vitest';
import {
  convertColor,
  hexToHsl,
  hexToOklch,
  hexToRgb,
  hslToHex,
  hslToOklch,
  hslToRgb,
  oklchToHex,
  oklchToHsl,
  oklchToRgb,
  rgbToHex,
  rgbToHsl,
  rgbToOklch,
  toOklch,
} from '@/lib/color';

describe('Color space conversions (HEX, RGB, HSL, OKLCH)', () => {
  it('converts accurately between HEX and RGB', () => {
    expect(hexToRgb('#2563EB')).toEqual({ r: 37, g: 99, b: 235 });
    expect(rgbToHex({ r: 37, g: 99, b: 235 })).toBe('#2563EB');
    expect(hexToRgb('#09f')).toEqual({ r: 0, g: 153, b: 255 });
    expect(rgbToHex({ r: 0, g: 153, b: 255 })).toBe('#0099FF');
  });

  it('converts accurately between HEX and HSL', () => {
    const hsl = hexToHsl('#FF0000');
    expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
    expect(hslToHex({ h: 0, s: 100, l: 50 })).toBe('#FF0000');

    const blueHsl = hexToHsl('#2563EB');
    expect(blueHsl.h).toBeCloseTo(221.21, 1);
    expect(blueHsl.s).toBeCloseTo(83.19, 1);
    expect(blueHsl.l).toBeCloseTo(53.33, 1);
    expect(hslToHex(blueHsl)).toBe('#2563EB');
  });

  it('round-trips cleanly through OKLCH', () => {
    const samples = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#18181B'];
    for (const hex of samples) {
      const oklch = hexToOklch(hex);
      const roundTripped = oklchToHex(oklch);
      expect(roundTripped).toBe(hex);
    }
  });

  it('handles pure black, pure white, and achromatic neutrals cleanly', () => {
    const black = convertColor('#000000');
    expect(black.oklch).toEqual({ l: 0, c: 0, h: 0 });
    expect(black.hsl).toEqual({ h: 0, s: 0, l: 0 });

    const white = convertColor('#FFFFFF');
    expect(white.oklch).toEqual({ l: 1, c: 0, h: 0 });
    expect(white.hsl).toEqual({ h: 0, s: 0, l: 100 });

    const neutral = rgbToOklch({ r: 113, g: 113, b: 113 });
    expect(neutral.c).toBe(0);
    expect(neutral.h).toBe(0);
  });

  it('preserves wide-gamut OKLCH when requested and clamps safely for RGB/HEX', () => {
    const wide = { l: 0.72, c: 0.34, h: 150 };
    const preserved = toOklch(wide, { preserveWideGamut: true });
    expect(preserved.c).toBe(0.34);

    const safeRgb = oklchToRgb(wide);
    expect(safeRgb.r).toBeGreaterThanOrEqual(0);
    expect(safeRgb.r).toBeLessThanOrEqual(255);
    expect(safeRgb.g).toBeGreaterThanOrEqual(0);
    expect(safeRgb.g).toBeLessThanOrEqual(255);
    expect(safeRgb.b).toBeGreaterThanOrEqual(0);
    expect(safeRgb.b).toBeLessThanOrEqual(255);
  });

  it('formats CSS Color 4 strings including alpha when below 1', () => {
    const snapshot = convertColor('rgb(37 99 235 / 0.5)');
    expect(snapshot.hex).toBe('#2563EB80');
    expect(snapshot.css.rgb).toBe('rgb(37 99 235 / 0.5)');
    expect(snapshot.css.hsl).toContain('/ 0.5)');
    expect(snapshot.css.oklch).toContain('/ 0.5)');
  });

  it('supports RGB <-> HSL and HSL <-> OKLCH pairwise helpers and CSS deg units', () => {
    const rgb = { r: 16, g: 185, b: 129 };
    const hsl = rgbToHsl(rgb);
    expect(hslToRgb(hsl)).toEqual(rgb);

    const oklch = hslToOklch(hsl);
    const backToHsl = oklchToHsl(oklch);
    expect(backToHsl.h).toBeCloseTo(hsl.h, 0);
    expect(backToHsl.s).toBeCloseTo(hsl.s, 0);
    expect(backToHsl.l).toBeCloseTo(hsl.l, 0);

    expect(convertColor('hsl(221.2deg 83.2% 53.3%)').hex).toBe('#2563EB');
    expect(convertColor('oklch(0.5461 0.2152 262.88deg)').hex).toBe('#2563EB');
  });
});
