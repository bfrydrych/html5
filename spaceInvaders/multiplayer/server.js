const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const COMMANDS = new Commands();

wss.on('connection', function connection(ws) {
	console.log("connection established");
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		var command = COMMANDS.findCommand(message).unmarshal(message);
		// handle command (NewShip for the start)
		ws.send("Got your message and that's the reply");
	});
});