import { default as i18n } from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    navbar: {
      home: "Home",
      properties: "Properties",
      about: "About Us",
    },
  },
  np: {
    navbar: {
      home: "गृहपृष्ठ",
      properties: "प्रोप्रति ",
      about: "हाम्रो बारेमा",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  defaultNS: "common",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export const languages = [
  { name: "English", value: "en" },
  { name: "नेपाली", value: "np" },
];
