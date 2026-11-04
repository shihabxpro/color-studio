import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LANGUAGE,
  getDictionary,
  isSupportedLanguage,
} from '@/i18n';

describe('Centralized i18n dictionary', () => {
  it('defaults to Bengali (bn)', () => {
    expect(DEFAULT_LANGUAGE).toBe('bn');
    expect(getDictionary().overview.heading).toBe('ওয়ার্কস্পেস ওভারভিউ');
  });

  it('validates supported language codes', () => {
    expect(isSupportedLanguage('bn')).toBe(true);
    expect(isSupportedLanguage('en')).toBe(true);
    expect(isSupportedLanguage('fr')).toBe(false);
    expect(isSupportedLanguage(null)).toBe(false);
  });

  it('preserves technical terms (HEX, RGB, HSL, OKLCH, CSS) in English inside Bengali copy', () => {
    const bnDict = getDictionary('bn');
    const serialized = JSON.stringify(bnDict);
    expect(serialized).toContain('HEX');
    expect(serialized).toContain('RGB');
    expect(serialized).toContain('HSL');
    expect(serialized).toContain('OKLCH');
    expect(serialized).toContain('CSS');
  });

  it('provides complete English dictionary when requested', () => {
    const enDict = getDictionary('en');
    expect(enDict.overview.heading).toBe('Workspace Overview');
    expect(enDict.nav.items.palettes.label).toBe('Palettes');
  });
});
