import { describe, expect, it } from 'vitest';
import {
  createPickerState,
  DEFAULT_PICKER_HEX,
  getContrastingInk,
  getNormalizedPointerPosition,
  parseFormatInput,
  toAndroidComposeLiteral,
  updatePickerFromHsl,
  updatePickerFromHsv,
  updatePickerFromOklch,
  updatePickerFromRgb,
} from '@/lib/color';

describe('Headless Color Picker state & interactions', () => {
  it('initializes cleanly to DEFAULT_PICKER_HEX (#2563EB)', () => {
    const initial = createPickerState();
    expect(initial.color.hex).toBe(DEFAULT_PICKER_HEX);
    expect(initial.color.rgb).toEqual({ r: 37, g: 99, b: 235 });
    expect(initial.hsv.h).toBeCloseTo(221.21, 1);
  });

  it('preserves active hue when dragging 2D SV picker to pure black or pure white', () => {
    const start = createPickerState('#10B981'); // emerald hue ~160°
    const originalHue = start.hsv.h;

    const atWhite = updatePickerFromHsv(start, { s: 0, v: 100 });
    expect(atWhite.color.hex).toBe('#FFFFFF');
    expect(atWhite.hsv.h).toBe(originalHue);
    expect(atWhite.preservedHue).toBe(originalHue);

    const atBlack = updatePickerFromHsv(atWhite, { s: 0, v: 0 });
    expect(atBlack.color.hex).toBe('#000000');
    expect(atBlack.preservedHue).toBe(originalHue);

    // Dragging back into chromatic territory resumes the preserved hue
    const restored = updatePickerFromHsv(atBlack, { s: 80, v: 75 });
    expect(restored.hsv.h).toBe(originalHue);
  });

  it('updates cleanly from RGB, HSL, and OKLCH channel controls', () => {
    const base = createPickerState('#2563EB');

    const rgbUpdated = updatePickerFromRgb(base, { r: 239, g: 68, b: 68 });
    expect(rgbUpdated.color.hex).toBe('#EF4444');

    const hslUpdated = updatePickerFromHsl(base, { h: 120, s: 100, l: 50 });
    expect(hslUpdated.color.hex).toBe('#00FF00');

    const oklchUpdated = updatePickerFromOklch(base, {
      l: 0.75,
      c: 0.35,
      h: 145,
    });
    expect(oklchUpdated.color.gamut.wasMapped).toBe(true);
    expect(oklchUpdated.color.hex).toMatch(/^#[0-9A-F]{6}$/);
  });

  it('parses both CSS strings and bare tuples across HEX, RGB, HSL, and OKLCH inputs', () => {
    const hexShort = parseFormatInput('hex', '#0f8');
    expect(hexShort.ok && hexShort.state.color.hex).toBe('#00FF88');

    const hexNoHash = parseFormatInput('hex', '10b981');
    expect(hexNoHash.ok && hexNoHash.state.color.hex).toBe('#10B981');

    const rgbCss = parseFormatInput('rgb', 'rgb(16 185 129)');
    expect(rgbCss.ok && rgbCss.state.color.hex).toBe('#10B981');

    const rgbTuple = parseFormatInput('rgb', '16, 185, 129');
    expect(rgbTuple.ok && rgbTuple.state.color.hex).toBe('#10B981');

    const hslCss = parseFormatInput('hsl', 'hsl(0 100% 50%)');
    expect(hslCss.ok && hslCss.state.color.hex).toBe('#FF0000');

    const hslTuple = parseFormatInput('hsl', '0, 100%, 50%');
    expect(hslTuple.ok && hslTuple.state.color.hex).toBe('#FF0000');

    const oklchCss = parseFormatInput('oklch', 'oklch(0.5461 0.2152 262.88)');
    expect(oklchCss.ok && oklchCss.state.color.hex).toBe('#2563EB');

    const oklchTuple = parseFormatInput('oklch', '0.5461 0.2152 262.88');
    expect(oklchTuple.ok && oklchTuple.state.color.hex).toBe('#2563EB');
  });

  it('synchronizes real-time format outputs across all 4 formats on valid edit', () => {
    const edited = parseFormatInput('hex', '#F59E0B');
    expect(edited.ok).toBe(true);
    if (!edited.ok) return;

    const { css } = edited.state.color;
    expect(css.hex).toBe('#F59E0B');
    expect(css.rgb).toBe('rgb(245 158 11)');
    expect(css.hsl).toMatch(/^hsl\(37\.7 92\.1% 50\.2%\)$/);
    expect(css.oklch).toMatch(/^oklch\(/);
  });

  it('rejects invalid inputs with format-specific error keys and never crashes', () => {
    expect(parseFormatInput('hex', '')).toEqual({
      ok: false,
      errorKey: 'invalidHex',
    });
    expect(parseFormatInput('hex', '#GGGGGG')).toEqual({
      ok: false,
      errorKey: 'invalidHex',
    });
    expect(parseFormatInput('hex', 'rgb(0,0,0)')).toEqual({
      ok: false,
      errorKey: 'invalidHex',
    });
    expect(parseFormatInput('rgb', '300, -10, 0')).toEqual({
      ok: false,
      errorKey: 'invalidRgb',
    });
    expect(parseFormatInput('hsl', '120, 180%, 50%')).toEqual({
      ok: false,
      errorKey: 'invalidHsl',
    });
    expect(parseFormatInput('oklch', '1.8 -0.2 90')).toEqual({
      ok: false,
      errorKey: 'invalidOklch',
    });
  });

  it('resets cleanly back to DEFAULT_PICKER_HEX after arbitrary edits', () => {
    const modified = createPickerState('#EC4899');
    expect(modified.color.hex).toBe('#EC4899');
    const reset = createPickerState(DEFAULT_PICKER_HEX);
    expect(reset.color.hex).toBe('#2563EB');
  });

  it('computes contrasting foreground ink, Android Compose literals, and pointer ratios', () => {
    expect(getContrastingInk(createPickerState('#FFFFFF').color)).toBe('dark');
    expect(getContrastingInk(createPickerState('#09090B').color)).toBe('light');

    expect(toAndroidComposeLiteral('#2563EB')).toBe('Color(0xFF2563EB)');
    expect(toAndroidComposeLiteral('#2563EB80')).toBe('Color(0x802563EB)');

    expect(
      getNormalizedPointerPosition(150, -20, {
        left: 50,
        top: 0,
        width: 200,
        height: 100,
      })
    ).toEqual({ x: 0.5, y: 0 });
  });
});
