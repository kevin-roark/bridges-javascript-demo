
var io = require('socket.io-client');
var TWEEN = require('tween.js');
var Tone = require('tone');
var THREE = require('three');

$(function() {

  var $bigButton = $('#my-big-button');
  var socket = io('http://localhost:6001');
  var synth = new Tone.SimpleSynth({
    "oscillator" : {
      "type" : "sine"
    },
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.2,
      "sustain" : 0.4,
      "release" : 0.2,
    }
  }).toMaster();

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 1000);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  scene.add(camera);

  var light = new THREE.AmbientLight(0x404040);
  scene.add(light);

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

    var possibleNotes = ["C4","D4","E4","F4","G4","A4","C5","D5","E5","F5","G5","A5"];
    var note = possibleNotes[Math.floor(Math.random() * possibleNotes.length)];
    synth.triggerAttackRelease(note, "32n");

    addBox(color);
  });

  update();
  function update() {
    requestAnimationFrame(update);

    TWEEN.update();

    renderer.render(scene, camera);
  }

  function addBox(color) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var material = new THREE.MeshBasicMaterial({
      color: color
    });

    var box = new THREE.Mesh(geometry, material);
    box.position.copy(randomMeshPosition());

    scene.add(box);
  }

  function randomMeshPosition() {
    var x = (Math.random() - 0.5) * 15;
    var y = (Math.random() - 0.5) * 10;
    var z = Math.random() * -40 - 5;
    return new THREE.Vector3(x, y, z);
  }

});
