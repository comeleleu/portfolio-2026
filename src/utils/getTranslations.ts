import en from '@locales/en.json';
import fr from '@locales/fr.json';
import { getLocale, type Locale } from '@utils/getLocale';

/** Translation dictionary type (may be nested). */
export type Translations = Record<string, unknown>;

/** Load the appropriate translation dictionary based on the locale header. */
export async function getTranslations(): Promise<Translations> {
  const locale: Locale = await getLocale();
  return locale === 'fr' ? (fr as Translations) : (en as Translations);
}

/** Resolve dot‑notation keys (e.g., "about.fullname") within a possibly nested dictionary. */
function resolveKey(dict: unknown, key: string): unknown {
  if (typeof dict !== 'object' || dict === null) return undefined;
  let result: unknown = dict;
  for (const part of key.split('.')) {
    if (result && typeof result === 'object' && part in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return result;
}

/** Async helper returning the translation string (or the key itself if missing). */
export async function t(key: string): Promise<string> {
  const dict = await getTranslations();
  const value = resolveKey(dict, key);
  return typeof value === 'string' ? value : key;
}
