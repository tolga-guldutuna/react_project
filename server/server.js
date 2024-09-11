const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use('/api', apiRoutes);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.emit('room-joined', roomId);
        console.log(`User joined room: ${roomId}`);
        sendRoomId({ roomId });
    });

    socket.on('offer', ({ offer, roomId }) => {
        socket.to(roomId).emit('offer', { offer, roomId });
    });

    socket.on('answer', ({ answer, roomId }) => {
        socket.to(roomId).emit('answer', { answer, roomId });
    });

    socket.on('ice-candidate', ({ candidate, roomId }) => {
        socket.to(roomId).emit('ice-candidate', { candidate, roomId });
    });

    socket.on('message', ({ message, roomId }) => {
        socket.to(roomId).emit('message', { message });
        console.log(`Message in room ${roomId}: ${message}`);
        sendChat({ roomId, message });
    });

    socket.on('leave-room', (roomId) => {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

function sendRoomId(roomId) {
    axios.post('http://localhost:8082/api/webrtc/sessions/saveRoomId', roomId)
        .then(response => {
            console.log('Log sent successfully');
        })
        .catch(error => {
            console.error('Error sending log:', error);
        });
}

function sendChat({ roomId, message }) {
    axios.post('http://localhost:8082/api/webrtc/chats/start?roomId=' + roomId, {
        message: message
    })
        .then(response => {
            console.log('Log sent successfully');
        })
        .catch(error => {
            console.error('Error sending log:', error);
        });
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
