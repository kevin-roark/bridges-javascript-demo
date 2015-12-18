
var io = require('socket.io-client');
var TWEEN = require('tween.js');

$(function() {

  var $bigButton = $('#my-big-button');
  var socket = io('http://localhost:6001');

  $bigButton.click(function() {
    socket.emit('new color please!');
  });

  socket.on('got you a color', function(color) {
    $bigButton.css('background-color', color);

    var scale = {value: 1};
    function updateButtonScale() {
      $bigButton.css('transform', 'scale(' + scale.value + ',' + scale.value + ')');
    }
    var bigTween = new TWEEN.Tween(scale).to({value: 1.5}, 100);
    bigTween.onUpdate(updateButtonScale);
    bigTween.onComplete(function() {
      var backToNormalTween = new TWEEN.Tween(scale).to({value: 1}, 100);
      backToNormalTween.onUpdate(updateButtonScale);
      backToNormalTween.start();
    });
    bigTween.start();
  });

  update();
  function update() {
    requestAnimationFrame(update);

    TWEEN.update();
  }

});
