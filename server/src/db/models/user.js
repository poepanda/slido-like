import { errorHandler } from '../utils';

export default (r, connection) => ({
  find: (query) => {
    return r.table('users').filter(query ? query : {}).run(connection).then((cursor) => {
      return cursor.toArray();
    }).error(errorHandler);
  },

  create: (data) => {
    return r.table('users')
      .insert(data).run(connection)
      .then(({ generated_keys, errors}) => ({
        errors,
        id: generated_keys[0]
      }))
      .error(errorHandler);
  }
})