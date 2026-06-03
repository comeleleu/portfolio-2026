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
            options = { month: 'short', year: 'numeric' };
            break;
        case "long":
            options = { day: 'numeric', month: 'long', year: 'numeric' };
            break;
        default:
            options = { day: 'numeric', month: 'short', year: 'numeric' };
    }

    return date.toLocaleDateString(locale, options);
};
