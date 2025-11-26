import { resolveBrowserLocale } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from "../i18n/en";
import spanishMessages from "../i18n/sp";

const translations = { en: englishMessages, sp: spanishMessages };

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale] ? translations[locale] : translations.sp,
    resolveBrowserLocale('sp'), //'sp', // default locale
    [{ locale: 'en', name: 'English' }, 
     { locale: 'sp', name: 'Español' }],
);
