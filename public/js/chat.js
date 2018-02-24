let socket = io();

function scrollToBottom(messageScroll) {
  let messages = messageScroll;
  let newMessage = messages.children('li:last-child');
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  let ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom(jQuery('#messages'));
});

socket.on('adminMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#adminMessages').append(html);
  scrollToBottom(jQuery('#adminMessages'));
});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');

  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom(jQuery('#messages'));
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.attr('disabled', 'disabled').text('Out of order :)');
    alert('Unable to fetch location.');
  });
});
