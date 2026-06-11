import { headers } from 'next/headers';

// Allowed locale values used across the app
export type Locale = "en" | "fr";

/**
 * Retrieves the locale that was injected by the middleware.
 * Returns "en" | "fr" when the header is present and valid,
 * otherwise returns undefined (caller can fallback to a default).
 */
export async function getLocale(): Promise<Locale> {
    const headerList = await headers();
    const raw = headerList.get('x-locale');

    if (raw === 'en' || raw === 'fr') {
        return raw as Locale;
    }

    // Default to English if header missing or invalid
    return 'en';
}
