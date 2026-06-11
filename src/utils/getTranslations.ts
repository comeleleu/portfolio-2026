import en from '@locales/en.json';
import fr from '@locales/fr.json';
import { getLocale, type Locale } from '@utils/getLocale';

/**
 * Shape of a simple translation dictionary.
 * Keys are the translation identifiers used in the UI.
 */
export type Translations = Record<string, string>;

/**
 * Load the correct translation object based on the locale header.
 *
 * The JSON files are imported statically – Next.js bundles them at build time.
 * At request time we simply pick the right object, which is a cheap O(1) lookup.
 */
export async function getTranslations(): Promise<Translations> {
    const locale: Locale = await getLocale();
    
    switch (locale) {
        case "fr":
            return fr as Translations;
        case "en":
        default:
            return en as Translations;
    }
}

/**
 * Helper to fetch a single translation value.
 * Returns the key itself when the translation is missing – useful as a fallback.
 */
export async function t(key: string): Promise<string> {
    const dict = await getTranslations();

    return dict[key] ?? key;
}
