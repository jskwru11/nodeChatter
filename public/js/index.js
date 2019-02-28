var socket = io();

socket.on('connect', function() {
    console.log(`Connected to server`);



});

socket.on('disconnect', function() {
    console.log(`Disconnected from server`);
});

socket.on('newMessage', function(message) {
    $('#chat').append($('<li>').text(`${message.from}: ${message.text}`));
    console.log(`You have a new message: ${JSON.stringify(message, undefined, 2)}`);
});

socket.on('newLocationMessage', function(locationData) {
    const li = $(`<li></li>`);
    const a = $(`<a target="_blank">My Current Location</a>`);
    li.text(`${locationData.from}: `);
    a.attr('href', locationData.url)
    li.append(a);
    $('#chat').append(li);

});



$('#formSubmit').on('submit', function(event) {
    event.preventDefault();
    const sender = $('#from').val();
    const message = $('#message').val();
    socket.emit('createMessage', {
        from: sender,
        text: message
    }, function(data) {
        console.log(`I have recieved the data: ${JSON.stringify(data, undefined, 2)}`);
    });
});

const locationBtn = $('#geoLocate');

locationBtn.on('click', function(event) {
    if (!navigator.geolocation) {
        return bootbox.alert('Geolocation not supported by your browser.', function () {
            console.log('you have an error');
        });
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function (error) {
        bootbox.alert('Unable to fetch location.', function () {
            console.log('you have an error');
        });
    });
});



