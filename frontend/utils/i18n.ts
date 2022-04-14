import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEn from '../locales/en.json';
import timezonesEn from '../locales/timezones-en.json';
import localesEn from '../locales/locales-en.json';

const resources = {
  en: {
    translation: {...translationEn, ...localesEn, ...timezonesEn},
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    parseMissingKeyHandler: key => {
      console.log(`🌐 Missing translation: ${i18n.language} ${key}`);
      return key;
    },
  });

export default i18n;
