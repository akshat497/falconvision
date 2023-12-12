// // Import the WebSocket server and other dependencies
// const WebSocket = require('websocket').server;
// const https = require('https'); // Use https module for SSL
// const fs = require('fs'); // Require the filesystem module
// const path = require('path');

// const port = process.env.PORT || 9090;

// // Load SSL certificate and private key
// const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, 'certificate.crt'), 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// // Create an HTTPS server
// const httpsServer = https.createServer(credentials);
const WebSocket = require('websocket').server;

const http= require('http');



const server = http.createServer();
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
