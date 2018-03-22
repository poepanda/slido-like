export const responsedEvent = (event) => {
  const {
    id, code, name, to, from,
  } = event ? event : {};
  console.log(id, code, name);
  return { event: { id, code, name, to, from }};
}