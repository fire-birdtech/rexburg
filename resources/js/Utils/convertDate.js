import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function convertDateWithDay(date) {
  return dayjs(date).format('dddd, D MMMM YYYY');
}

export function convertDate(date) {
  return dayjs(date).format('MMMM D, YYYY');
}

export function convertDateTime(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

export function convertDateFromNow(date) {
  return dayjs(date).fromNow();
}

export function convertDateFromNowNoSuffix(date) {
  return dayjs(date).fromNow(true);
}
