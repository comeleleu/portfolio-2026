import { getRequestConfig } from 'next-intl/server';
import { getLocale } from '@utils/getLocale';

export default getRequestConfig(async () => {
    const locale = await getLocale();

    return {
        locale,
        messages: (await import(`../../locales/${locale}.json`)).default,
    };
});