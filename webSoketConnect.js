// const WebSocket = require('websocket').server;
// const http = require('http');
// const server = http.createServer();

// const wsServer = new WebSocket({
//   httpServer: server,
// });

// const connectedClients = new Set();

// wsServer.on('request', (request) => {
//   const userID = getUniqueID();
//   const connection = request.accept(null, request.origin);
//   clients[userID] = connection;
//   connectedClients.add(connection);

//   connection.on('message', (message) => {
//     if (message.type === 'utf8') {
//       console.log('Received Message:', message.utf8Data);
//       // Handle CRUD operations here and respond
//       // For example, update your database and then broadcast updates to all connected clients
//     }
//   });

//   connection.on('close', () => {
//     console.log(`Connection closed for user ${userID}`);
//     clients[userID] = null;
//     connectedClients.delete(connection);
//   });
// });

// server.listen(8080);
// console.log('WebSocket server listening on port 8080');

// module.exports = {
//   connectedClients,
//   broadcastMenuItemUpdate: (updatedItem) => {
//     connectedClients.forEach((client) => {
//       if (client.connected) {
//         client.send(JSON.stringify(updatedItem));
//       }
//     });
//   },
// };
// const WebSocket = require('websocket').server;
// const http = require('http');
// const server = http.createServer();

// const wsServer = new WebSocket({
//   httpServer: server,
// });

// const connectedClients = new Set();

// wsServer.on('request', (request) => {
//   const connection = request.accept(null, request.origin);
//   connectedClients.add(connection);

//   connection.on('message', (message) => {
//     if (message.type === 'utf8') {
//       console.log('Received Message:', message.utf8Data);
//     }
//   });

//   connection.on('close', () => {
//     connectedClients.delete(connection);
//   });
// });

// server.listen(8080);
// function broadUpdate(updatedItem) {
//     connectedClients.forEach((client) => {
//       if (client.connected) {
//         client.send(JSON.stringify(updatedItem));
//       }
//     });
//   }
  
//   module.exports = {
    
//     broadUpdate
//   }

const WebSocket = require('websocket').server;
const http = require('http');
const server = http.createServer();
const port=process.env.PORT||8080
const wsServer = new WebSocket({
  httpServer: server,
});

const connectedClients = new Set();

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  connectedClients.add(connection);

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log('Received Message:', message.utf8Data);
    }
  });

  connection.on('close', () => {
    connectedClients.delete(connection);
  });
});

server.listen(port);

function broadUpdate(updatedItem, updateType) {
  connectedClients.forEach((client) => {
    if (client.connected) {
      client.send(JSON.stringify({ updateType, data: updatedItem }));
    }
  });
}

module.exports = {
  broadUpdate,
};
