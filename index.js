const express = require('express');
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let markers = {};

io.on("connection", (socket) => {
    socket.emit("receive-location", markers);

    socket.on("send-location", (data) => {
        markers[socket.id] = { latitude: data.latitude, longitude: data.longitude };
        io.emit("receive-location", markers);
    });

    socket.on("disconnect", () => {
        delete markers[socket.id];
        io.emit("user disconnected", socket.id);
    });
});

app.get('/', (req, res) => {
    res.render("index");
});

server.listen(port);
