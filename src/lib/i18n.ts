import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEN from '@/locales/en/common.json';
import landingEN from '@/locales/en/landing.json';
import pricingEN from '@/locales/en/pricing.json';
import analyticsEN from '@/locales/en/analytics.json';

import commonPL from '@/locales/pl/common.json';
import landingPL from '@/locales/pl/landing.json';
import pricingPL from '@/locales/pl/pricing.json';
import analyticsPL from '@/locales/pl/analytics.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        landing: landingEN,
        pricing: pricingEN,
        analytics: analyticsEN,
      },
      pl: {
        common: commonPL,
        landing: landingPL,
        pricing: pricingPL,
        analytics: analyticsPL,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'landing', 'pricing', 'analytics'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'marketnav-language',
    },
  });

export default i18n;
