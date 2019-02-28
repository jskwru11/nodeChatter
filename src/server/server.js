const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const locationGenerator = require("../server/utils/location");
const messageGenerator = require("../server/utils/message");
const publicPath = path.join(__dirname, '../../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New User connected`);

    socket.emit('newMessage', messageGenerator('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', messageGenerator('Admin', 'New User Joined'));

    socket.on('createMessage', ((message, callback) => {
        console.log(`Received a new message: ${JSON.stringify(message, undefined, 2)}`);

        io.emit('newMessage', messageGenerator(message.from, message.text));
        callback();

        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     })
    }));

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', locationGenerator('Admin', coords));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



server.listen(port, () => console.log(`nodeChatter started on port: ${port}`));

