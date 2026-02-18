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
