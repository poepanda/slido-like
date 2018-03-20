const r = require('rethinkdb');

r.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
  if (err) throw err;
  // Do something with RethinkDB ;)
});