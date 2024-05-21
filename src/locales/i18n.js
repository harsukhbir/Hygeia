import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import fr from './fr';

// the translations file path
// (tip: move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  });

export function translate(text, extra = {}) {
  return i18n.t(text, extra);
}

export default i18n;
