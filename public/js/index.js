var socket = io();

socket.on('connect', function() {
    console.log(`Connected to server`);



});

socket.on('disconnect', function() {
    console.log(`Disconnected from server`);
});

socket.on('newMessage', function(message) {
    $('#messages').append($('<li>').text(`${message.from}: ${message.text}`));
    console.log(`You have a new message: ${JSON.stringify(message, undefined, 2)}`);
});

socket.on('newLocationMessage', function(locationData) {
    const li = $(`<li></li>`);
    const a = $(`<a target="_blank">My Current Location</a>`);
    li.text(`${locationData.from}: `);
    a.attr('href', locationData.url)
    li.append(a);
    $('#messages').append(li);

});



$('#message-form').on('submit', function(event) {
    event.preventDefault();
    const message = $('#message');
    socket.emit('createMessage', {
        from: 'User',
        text: message.val()
    }, function() {
        message.val('');
    });
});

const locationBtn = $('#geoLocate');

locationBtn.on('click', function(event) {
    if (!navigator.geolocation) {
        return bootbox.alert('Geolocation not supported by your browser.', function () {
            console.log('you have an error');
        });
    }
    locationBtn.text('Sending Location...');
    locationBtn.attr('disabled', true);
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        locationBtn.removeAttr('disabled');
        locationBtn.text('Send Location');
    }, function (error) {
        bootbox.alert('Unable to fetch location.', function () {
            locationBtn.removeAttr('disabled');
            locationBtn.text('Send Location');
            console.log('you have an error');
        });
    });
});



