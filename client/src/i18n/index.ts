import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import guTranslations from './locales/gu.json';
import mrTranslations from './locales/mr.json';
import taTranslations from './locales/ta.json';
import bnTranslations from './locales/bn.json';

const resources = {
  en: {
    translation: enTranslations
  },
  hi: {
    translation: hiTranslations
  },
  gu: {
    translation: guTranslations
  },
  mr: {
    translation: mrTranslations
  },
  ta: {
    translation: taTranslations
  },
  bn: {
    translation: bnTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
