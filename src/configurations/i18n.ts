import { createI18n } from 'vue-i18n';
import ru from '@/configurations/locales/ru.json';

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages: {
    ru,
  }
});

export default i18n;
