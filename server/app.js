
var socketIO = require('socket.io');

var io = socketIO(6001);
io.on('connection', function(socket) {
  console.log('got a new client...');

  socket.on('new color please!', function() {
    var color = randomColor();
    socket.emit('got you a color', color);
  });

  socket.on('disconnect', function() {
    console.log('lost a client...');
  });
});

function randomColor() {
  function randomColorValue() { return Math.floor(Math.random() * 256); }
  return 'rgb(' + [randomColorValue(), randomColorValue(), randomColorValue()].join(',') + ')';
}


console.log('all set up and ready to go...');
