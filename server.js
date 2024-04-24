const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (data) => {
        const { username, message } = JSON.parse(data);
        console.log(`message from ${username}: ${message}`);
        io.emit('chat message', data);
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});