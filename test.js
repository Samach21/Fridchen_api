var io2 = require('socket.io-client');
var socket2 = io2.connect('http://ebfc-58-11-2-212.ngrok.io');

var msg2 = "hello";
socket2.emit('foo', msg2);

var delayInMilliseconds = 10000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
}, delayInMilliseconds);