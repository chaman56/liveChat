const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set("view engine","ejs");

app.get('/',(req,res)=>{
  res.render("index");
})
var users = 0;
var user=0;
io.on('connection',(socket)=>{
  users++;user++;
  io.sockets.emit('online', {text:users + " online"});
  socket.emit('user', {user:"user"+user});

  socket.on('message',(data)=>{
    socket.emit('broadcastme',data);
    socket.broadcast.emit('broadcast', data);
    console.log(data);
  })
  
  socket.on('disconnect',function(){
    users--;
    io.sockets.emit('online',{text:users+" online"})
  })
})

http.listen(3000,()=>{
  console.log(`listening on http://localhost:3000`);
})
