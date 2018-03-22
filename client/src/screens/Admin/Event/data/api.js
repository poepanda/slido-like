import { postPrivate, getPrivate } from 'app/services/api';

export const createEventApi = ({ code, name, from, to }) => {
  return postPrivate('/event/create', {
    code,
    name,
    from,
    to
  });
}

export const adminFetchEventsApi = () => {
  return getPrivate('/event/fetch');
}