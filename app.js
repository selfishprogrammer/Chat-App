const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app)
const socketio = require("socket.io");
const io = socketio(server)

const path = require("path")
const port = 3000 || process.env.port
const pathStatic = path.join(__dirname, './public')
app.use(express.static(pathStatic))
const users = {};
io.on('connection', socket => {
    console.log("Connected")

    socket.on("user_joined", name1 => {
        console.log(name1)
        users[socket.id] = name1;

        socket.broadcast.emit("new_user", name1);
    })
    socket.on("send", message => {


        socket.broadcast.emit("receive", { message: message, name1: users[socket.id] });
    })
})

server.listen(port, () => {
    console.log(`Connected in ${port}`)
})