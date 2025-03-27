const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Notify when user connects
    io.emit('message', { username: 'System', message: 'A user connected' });

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Notify when user disconnects
        io.emit('message', { username: 'System', message: 'A user left the terminal' });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
