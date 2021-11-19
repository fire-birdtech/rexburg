import dayjs from "dayjs";

export function convertDate(date) {
    return dayjs(date).format('dddd, D MMMM YYYY');
}