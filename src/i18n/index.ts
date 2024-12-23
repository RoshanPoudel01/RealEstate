import { default as i18n } from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    navbar: {
      home: "Home",
      properties: "Properties",
      about: "About Us",
      contact: "Contact Us",
    },
    faq: {
      heading: "Frequently Asked Questions",
      description:
        "Have any questions? We have answers to some of the most common queries.",
    },
    contact: {
      heading: "Contact Us",
      description: "Get in touch with us",
    },
    about: {
      heading: "About Us",
    },
    team: {
      heading: "Meet Our Team",
    },
    property: {
      heading: "Properties",
      description: "Choose from the most advantageous offers",
      searchText: "Search for properties",
      searchButton: "Search",
      filterText: "Filter Settings",
    },
    queries: {
      heading: "Have any questions?",
      description:
        "Our Team will try to address your query regarding this particular product as soon as you enquire about product",
    },
    related: {
      heading: "Related Properties",
      description: "You may also like these properties",
    },
  },
  np: {
    navbar: {
      home: "गृहपृष्ठ",
      properties: "प्रोप्रति ",
      about: "हाम्रो बारेमा",
      contact: "सम्पर्क",
    },
    faq: {
      heading: "सामान्य प्रश्नहरू",
      description:
        "कुनै प्रश्न छ? हामीले सबैभन्दा सामान्य प्रश्नहरूको उत्तर छ।",
    },
    contact: {
      heading: "हामीलाई सम्पर्क गर्नुहोस्",
      description: "हामीसँग सम्पर्क गर्नुहोस्",
    },
    about: {
      heading: "हाम्रो बारेमा",
    },
    team: {
      heading: "हाम्रो संघ",
    },
    property: {
      heading: "संपत्तिहरू",
      description: "सबैभन्दा लाभदायक प्रस्तावहरूबाट छनौट गर्नुहोस्",
      searchText: "संपत्तिहरूको लागि खोज्नुहोस्",
      searchButton: "खोजी गर्नुहोस्",
      filterText: "फिल्टर सेटिङहरू",
    },
    queries: {
      heading: "कुनै प्रश्न छ?",
      description:
        "तपाईंले उत्पादनको बारेमा सोधपुछ गर्ने बित्तिकै हाम्रो टोलीले यस विशेष उत्पादनको बारेमा तपाईंको प्रश्नलाई सम्बोधन गर्ने प्रयास गर्नेछ",
    },
    related: {
      heading: "सम्बन्धित संपत्तिहरू",
      description: "तपाईंलाई यी संपत्तिहरू पनि मन पर्न सक्छन्",
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
