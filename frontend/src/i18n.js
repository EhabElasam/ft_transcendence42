

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./translations/en.json";
import frTranslations from "./translations/fr.json";
import trTranslations from "./translations/tr.json";
import bgTranslations from "./translations/bg.json";
import egTranslations from "./translations/eg.json";
import atTranslations from "./translations/at.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    tr: {
      translation: trTranslations,
    },
    bg: {
      translation: bgTranslations,
    },
    eg: {
      translation: egTranslations,
    },
    at: {
      translation: atTranslations,
    },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
