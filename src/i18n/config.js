import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_zh from './zh.json';
import translation_en from './en.json';

const resources = {
  en: {
      translation: translation_en,
  },
  zh: {
      translation: translation_zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
      escapeValue: false,
  },
});

export default i18n;
