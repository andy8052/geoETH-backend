var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("chat message", (data) => {
    console.log(data.journey)

    io.sockets.emit(data.journey, data)
  }
  );
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
