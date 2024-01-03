
const WebSocket = require('websocket').server;
const https = require('https');
const fs = require('fs');

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/api.falcon-vision.in/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/api.falcon-vision.in/privkey.pem'),
};

const server = https.createServer(options);
const port = process.env.PORT || 443;
const wsServer = new WebSocket({
  httpServer: server,
});

const roomClients = new Map();

wsServer.on('request', (request) => {
  // Extract room information from the request (modify this as per your use case)
  const room = request.resourceURL.query.room || 'default';
  console.log(`Connected to room: ${room}`);
  const connection = request.accept(null, request.origin);

  if (!roomClients.has(room)) {
    roomClients.set(room, new Set());
  }
  roomClients.get(room).add(connection);

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('Received Message:', message.utf8Data);
      // Process the message here
    }
  });

  connection.on('close', () => {
    roomClients.get(room).delete(connection);
  });
});

function broadUpdate(room, updatedItem, updateType) {
  if (roomClients.has(room)) {
    roomClients.get(room).forEach((client) => {
      if (client.connected) {
        client.send(JSON.stringify({ updateType, data: updatedItem }));
      }
    });
  }
}

server.listen(port, () => {
  console.log("WebSocket server is running at " + port);
});

module.exports = {
  broadUpdate,
};
