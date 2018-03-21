export const errors = (errors) => {
  if (errors.constructor === Array) return { errors };
  return { errors: [errors] };
}