import { bn } from './locales/bn';
import { en } from './locales/en';
import type { Language, TranslationDictionary } from './types';

export const DEFAULT_LANGUAGE: Language = 'bn';

export const SUPPORTED_LANGUAGES: readonly {
  code: Language;
  label: string;
  shortLabel: string;
}[] = [
  { code: 'bn', label: 'বাংলা', shortLabel: 'বাং' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
] as const;

const DICTIONARIES: Record<Language, TranslationDictionary> = {
  bn,
  en,
};

export function isSupportedLanguage(value: unknown): value is Language {
  return value === 'bn' || value === 'en';
}

export function getDictionary(lang: Language = DEFAULT_LANGUAGE): TranslationDictionary {
  return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANGUAGE];
}

export type { Language, ModuleTranslation, TranslationDictionary } from './types';
