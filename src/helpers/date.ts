import { Locations } from '@/resource/i18n';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

const locales = { enUS, ru };
const currentLocation = localStorage.getItem('location') as Locations;
const locale = locales[currentLocation];

function timeDistanceToNow(date: Date) {
  return formatDistanceToNow(new Date(date), { locale });
}

export { timeDistanceToNow };
