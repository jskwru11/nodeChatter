var socket = io();

socket.on('connect', function() {
    console.log(`Connected to server`);

    socket.on('newMessage', function(message) {
        console.log(`You have a new message: ${JSON.stringify(message, undefined, 2)}`);
    });

    socket.emit('createMessage', {
        from: 'Raven',
        text: 'What time is the show?'
    });
});

socket.on('disconnect', function() {
    console.log(`Disconnected from server`);
});



