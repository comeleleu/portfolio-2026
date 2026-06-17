import React from 'react';
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

/** Async helper returning the translation string (or the key itself if missing) with JSX interpolation. */
export async function t(
    key: string,
    params?: Record<string, React.ReactNode>
): Promise<React.ReactNode> {
    const dict = await getTranslations();
    const value = resolveKey(dict, key);

    if (typeof value !== 'string') {
        return key; // fallback
    }

    if (!params) {
        return value;
    }

    // Build parts array with static text and interpolated values
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    const regex = /{(\w+)}/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(value)) !== null) {
        const [placeholder, name] = match;
        const index = match.index;
        if (index > lastIndex) {
            parts.push(value.slice(lastIndex, index));
        }
        parts.push(params[name] ?? placeholder);
        lastIndex = index + placeholder.length;
    }
    if (lastIndex < value.length) {
        parts.push(value.slice(lastIndex));
    }
    // If all parts are plain strings, join them to avoid commas when converted to string elsewhere
    if (parts.every(p => typeof p === 'string')) {
        return parts.join('');
    }
    // Otherwise return a React fragment preserving React nodes
    return <>{parts}</>;
}
