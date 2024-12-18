
const http = require('http');

const express = require('express');
const path = require('path');
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

// io ka mtlb hai jitne bhi mere connections hai
io.on("connection" , (socket) => {
    //console.log("A new user has connected", socket.id);
            socket.on("user-message" , (message) => {
                //io.emit("message" , message);
                socket.broadcast.emit("message", message);
                console.log('A new User Message' , message);
            })
})
app.use(express.static(path.resolve("./public")))

server.listen(9000 , () => {
    console.log('server started at port 9000  ');
    
})

app.get("/" , (req , res) => {
    return res.sendFile("/public/index.html");
})