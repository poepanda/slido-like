import moment from 'moment';

export const errorHandler = err => {
  return { errors: [err.msg] };
}

export const addMeta = data => ({
  ...data,
  createdAt: moment().toISOString()
})