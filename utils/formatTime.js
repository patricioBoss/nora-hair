import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function fDateShort(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export const daysFromNow = (dateString) => {
  let today = new Date();
  let date_to_reply = new Date(dateString);
  let timeinmilisec = date_to_reply.getTime() - today.getTime();
  return Math.abs(Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24)));
};
