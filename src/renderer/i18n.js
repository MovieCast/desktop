import i18n from 'i18next';
import resources from '../locales';

i18n.init({
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['common', 'views'],
  defaultNS: 'common',

  debug: true,

  react: {
    wait: true
  },
  resources
});

module.exports = i18n;
