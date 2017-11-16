const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connection = [];

server.listen(process.env.PORT || 3000);

console.log('Server running');

app.get('/', function(req, res) {
	res .sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	//Disconnect
	connections.splice(connections.indexof(socket), 1);
	console.log('Disconnected: %s sockets connected', connections.length);
})