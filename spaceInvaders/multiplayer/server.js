const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	console.log("connection established");
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		ws.send("Got your message and that's the reply");
	});
});