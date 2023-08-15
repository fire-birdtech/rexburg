import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function convertDateWithDay(date: string) {
  return dayjs(date).format('dddd, D MMMM YYYY');
}

export function convertDate(date: string) {
  return dayjs(date).format('MMMM D, YYYY');
}

export function convertDateTime(date: string) {
  return dayjs(date).format('YYYY-MM-DD');
}

export function convertDateFromNow(date: string) {
  return dayjs(date).fromNow();
}

export function convertDateFromNowNoSuffix(date: string) {
  return dayjs(date).fromNow(true);
}
