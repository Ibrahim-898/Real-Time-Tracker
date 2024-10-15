const express = require('express');
const socketio = require("socket.io");
const http = require("http");
const path = require("path");


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 3000

app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));
app.use(express.static("public"));


io.on("connection",function(socket){
    console.log("Connected");
    socket.on("send-location",function(data){
      io.emit("receive-location",{
        id : socket.id,
        ...data,
      });
    });
});

app.get('/', function(req, res) {
  res.render("index")
})

server.listen(port, () => {
  console.log("Server Start")
})