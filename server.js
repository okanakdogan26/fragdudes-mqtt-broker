const http = require('http');
const aedes = require('aedes')();
const ws = require('ws');

const port = process.env.PORT || 3000;

const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('MQTT WebSocket Broker Active\n');
});

const wss = new ws.Server({ server: httpServer });

wss.on('connection', (socket, req) => {
  const stream = ws.createWebSocketStream(socket);
  aedes.handle(stream, req);
});

httpServer.listen(port, () => {
  console.log(`MQTT over WebSocket running on port ${port}`);
});
