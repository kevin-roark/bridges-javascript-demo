
var io = require('socket.io-client');

$(function() {

  var $bigButton = $('#my-big-button');
  var socket = io('http://localhost:6001');

  $bigButton.click(function() {
    socket.emit('new color please!');
  });

  socket.on('got you a color', function(color) {
    $bigButton.css('background-color', color);
  });

});
