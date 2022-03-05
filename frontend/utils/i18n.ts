import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationFr from '../locales/fr.json';

const resources = {
  fr: {
    translation: translationFr,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    parseMissingKeyHandler: key => {
      console.log(`🌐 Missing translation: ${i18n.language} ${key}`);
      return key;
    },
  });

export default i18n;
