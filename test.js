var io2 = require('socket.io-client');
var socket2 = io2.connect('http://39a2-180-183-103-29.ngrok.io');

var delayInMilliseconds = 100000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
  var msg2 = "hello";
  socket2.emit('newfridge', msg2);
}, delayInMilliseconds);