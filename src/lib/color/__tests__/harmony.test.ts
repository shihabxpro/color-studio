import { describe, expect, it } from 'vitest';
import {
  generateHarmony,
  getAnalogousHarmony,
  getComplementaryHarmony,
  getMonochromaticHarmony,
  getSplitComplementaryHarmony,
  getTetradicHarmony,
  getTriadicHarmony,
  HARMONY_TYPES,
  isInSrgbGamut,
} from '@/lib/color';

describe('Six color harmony algorithms', () => {
  const baseHex = '#2563EB';

  it('exposes all six supported harmony algorithms', () => {
    expect(HARMONY_TYPES).toHaveLength(6);
    expect(HARMONY_TYPES).toEqual([
      'complementary',
      'analogous',
      'triadic',
      'split-complementary',
      'tetradic',
      'monochromatic',
    ]);
  });

  it('1. generates complementary harmony (0°, +180°)', () => {
    const result = getComplementaryHarmony(baseHex);
    expect(result.type).toBe('complementary');
    expect(result.steps).toHaveLength(2);
    expect(result.steps[0].angleOffset).toBe(0);
    expect(result.steps[0].hex).toBe(baseHex);
    expect(result.steps[1].angleOffset).toBe(180);
    expect(result.steps[1].hex).not.toBe(baseHex);
  });

  it('2. generates analogous harmony (-30°, 0°, +30°) with proper 360° wrap-around', () => {
    const result = getAnalogousHarmony({ l: 0.6, c: 0.16, h: 10 }, 30);
    expect(result.steps).toHaveLength(3);
    expect(result.steps.map((s) => s.angleOffset)).toEqual([-30, 0, 30]);
    // 10° - 30° wraps cleanly near 340°
    expect(result.steps[0].oklch.h).toBeGreaterThan(335);
    expect(result.steps[0].oklch.h).toBeLessThan(345);
    // 10° + 30° lands near 40°
    expect(result.steps[2].oklch.h).toBeGreaterThan(35);
    expect(result.steps[2].oklch.h).toBeLessThan(45);
  });

  it('3. generates triadic harmony (0°, +120°, +240°)', () => {
    const result = getTriadicHarmony(baseHex);
    expect(result.steps).toHaveLength(3);
    expect(result.steps.map((s) => s.angleOffset)).toEqual([0, 120, 240]);
    const uniqueHexes = new Set(result.steps.map((s) => s.hex));
    expect(uniqueHexes.size).toBe(3);
  });

  it('4. generates split-complementary harmony (0°, +150°, +210°)', () => {
    const result = getSplitComplementaryHarmony(baseHex);
    expect(result.steps).toHaveLength(3);
    expect(result.steps.map((s) => s.angleOffset)).toEqual([0, 150, 210]);
  });

  it('5. generates tetradic harmony (0°, +60°, +180°, +240°) and supports 90° square', () => {
    const rect = getTetradicHarmony(baseHex);
    expect(rect.steps).toHaveLength(4);
    expect(rect.steps.map((s) => s.angleOffset)).toEqual([0, 60, 180, 240]);

    const square = getTetradicHarmony(baseHex, 90);
    expect(square.steps.map((s) => s.angleOffset)).toEqual([0, 90, 180, 270]);
  });

  it('6. generates monochromatic harmony with distinct lightness steps on the same hue', () => {
    const mono = getMonochromaticHarmony(baseHex, 5);
    expect(mono.steps).toHaveLength(5);
    expect(mono.steps[2].hex).toBe(baseHex);
    // First step is lighter than last step
    expect(mono.steps[0].oklch.l).toBeGreaterThan(mono.steps[4].oklch.l);
    const uniqueHexes = new Set(mono.steps.map((s) => s.hex));
    expect(uniqueHexes.size).toBe(5);
  });

  it('ensures every step across all 6 harmonies is mapped into displayable sRGB', () => {
    const vivid = { l: 0.7, c: 0.32, h: 265 };
    for (const harmonyType of HARMONY_TYPES) {
      const res = generateHarmony(vivid, harmonyType);
      for (const step of res.steps) {
        expect(isInSrgbGamut(step.hex)).toBe(true);
        expect(step.hex).toMatch(/^#[0-9A-F]{6}$/);
      }
    }
  });

  it('handles neutral achromatic colors gracefully across harmonies', () => {
    const grayTriad = getTriadicHarmony('#71717A');
    expect(grayTriad.steps).toHaveLength(3);
    const grayMono = getMonochromaticHarmony('#808080', 5);
    expect(grayMono.steps).toHaveLength(5);
    for (const step of grayMono.steps) {
      expect(step.oklch.c).toBe(0);
    }
  });
});
