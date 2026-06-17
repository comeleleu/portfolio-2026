/**
 * Formats an ISO date string into a localized date.
 * Supports various formatting presets (short, long, default).
 * 
 * @param dateString - The ISO date string to format.
 * @param format - The preset format option ("short" | "long" | default/medium).
 * @param locale - The BCP 47 language tag for formatting. Defaults to 'en-CA'.
 * @returns The formatted date string, or an empty string if the date is invalid.
 * 
 * @example
 * formatDate("2026-06-03", "short")    // returns "Jun 2026"
 * formatDate("2026-06-03", "long")     // returns "June 3, 2026"
 * formatDate("2026-06-03")             // returns "Jun 3, 2026"
 */
export const formatDate = (
    dateString: string = '',
    format: string = '',
    locale: string = 'en-CA'
): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    let options: Intl.DateTimeFormatOptions;

    switch (format) {
        case "short":
        case "shortNoDay":
            // Month and year, e.g., "Jun 2026"
            options = { month: 'short', year: 'numeric' };
            break;
        case "shortWithDay":
            // Day, month, and year, e.g., "3 Jun 2026"
            options = { day: 'numeric', month: 'short', year: 'numeric' };
            break;
        case "long":
        case "longWithDay":
            // Full day, month name, and year, e.g., "June 3, 2026"
            options = { day: 'numeric', month: 'long', year: 'numeric' };
            break;
        case "longNoDay":
            // Month name and year only, e.g., "June 2026"
            options = { month: 'long', year: 'numeric' };
            break;
        default:
            // Preserve original default: short month with day
            options = { day: 'numeric', month: 'short', year: 'numeric' };
    }

    let formatted = date.toLocaleDateString(locale, options);
    
    // Capitalize month abbreviation for French short format (e.g., "oct." → "Oct.")
    if (locale.startsWith('fr') && (format === 'short' || format === 'shortNoDay')) {
        formatted = formatted.replace(/^([a-zéàâû])/ , (m) => m.toUpperCase());
    }

    return formatted;
};
