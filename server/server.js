const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.send('Server is on!');
});

io.on('connection', socket => {
  console.log('Socket ready!');
});

http.listen(port, () => {
  console.log(`The server is on at port ${port}`);
});