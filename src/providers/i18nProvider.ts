import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import spanishMessages from "@blackbox-vision/ra-language-spanish";

const translations = { en: englishMessages, sp: spanishMessages };

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale],
    'sp', // default locale
    [{ locale: 'en', name: 'English' }, { locale: 'sp', name: 'Español' }],
);
