// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import svTranslations from './locales/sv/translation.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      sv: {
        translation: svTranslations
      }
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the translation is not found
    interpolation: {
      escapeValue: false // React already safely escapes
    }
  });

export default i18n;
