import { createI18n } from 'vue-i18n';
import ru from './locales/ru.json';
import en from './locales/en.json';

const messages = {
  ru,
  en,
};
const locale = (localStorage.getItem('location') as string) || 'en';

export const i18n = createI18n({
  locale,
  messages,
});
