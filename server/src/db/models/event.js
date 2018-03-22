import { errorHandler, addMeta } from '../utils';

const defaultEventData = {
  code: '',
  node: '',
}

export default (r, connection) => ({
  create: (data = defaultEventData) => {
    return r.table('events')
      .insert(addMeta(data))
      .run(connection)
      .then(({ errors, generated_keys }) => ({
        errors,
        id: generated_keys ? generated_keys[0] : null
      }))
      .error(errorHandler);
  },
  
  find: (query) => {
    return r.table('events')
      .filter(query ? query : {})
      .run(connection)
      .then(cursor => cursor.toArray())
      .error(errorHandler);
  }
})