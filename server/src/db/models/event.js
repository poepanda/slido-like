import { errorHandler } from '../utils';

const defaultEventData = {
  code: '',
  node: '',
}

export default (r, connection) => ({
  create: (data = defaultEventData) => {
    return r.table('events')
      .insert(data)
      .run(connection)
      .error(errorHandler);
  },
  find: (query) => {
    return r.table('events')
      .filter(query)
      .run(connection)
      .error(errorHandler);
  }
})