export const checkAndCreateTables = (r, connection) => {
  r.table('users').run(connection).error(() => {
    // Table 'users'
    r.tableCreate('users')
      .run(connection)
      .error(err => console.error('There is error when create table "users"',  err.msg));
    
    // Table 'events'
    r.tableCreate('events')
      .run(connection)
      .error(err => console.error('There is error when create table "events"',  err.msg));

    // Table 'questions'
    r.tableCreate('questions')
      .run(connection)
      .error(err => console.error('There is error when create table "questions"',  err.msg));
  })
}