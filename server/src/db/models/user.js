import { errorHandler, addMeta } from '../utils';

const defaultUserData = {
  email: '',
  name: '',
  password: '',
}

export default (r, connection) => ({
  find: (query) => {
    return r.table('users').filter(query ? query : {}).run(connection).then((cursor) => {
      return cursor.toArray();
    }).error(errorHandler);
  },

  create: (data = defaultUserData) => {
    return r.table('users')
      .insert(addMeta(data))
      .run(connection)
      .then(({ generated_keys, errors}) => ({
        errors,
        id: generated_keys[0]
      }))
      .error(errorHandler);
  }
})