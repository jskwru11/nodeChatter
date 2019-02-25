const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');



const publicPath = path.join(__dirname, '../../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New User connected`);

    socket.emit('newMessage', {
        from: 'jerry',
        text: 'hey you still on for next week?',
        createdAt: 1234
    });

    socket.on('createMessage', (message => console.log(`Received a new message: ${JSON.stringify(message, undefined, 2)}`)));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



server.listen(port, () => console.log(`nodeChatter started on port: ${port}`));

