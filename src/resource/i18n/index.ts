import { createI18n } from 'vue-i18n';
import ru from './locales/ru.json';
import enUS from './locales/enUS.json';

export type Locations = 'enUS' | 'ru';

const messages = {
  ru,
  enUS,
};
const locale = (localStorage.getItem('location') as string) || 'enUS';

export const i18n = createI18n({
  locale,
  messages,
});
