export const validateEvent = ({ name, code, from, to }) => {
  const errors = [];
  if (!name || !code || !from || !to) {
    errors.push("Missing field!")
  }
  return { name, code, from, to, errors };
}