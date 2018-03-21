export const errorHandler = err => {
  return { errors: [err.msg] };
}