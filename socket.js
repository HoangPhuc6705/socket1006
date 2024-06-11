const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 5000 });
console.log('Websocket server is running on PORT 5000');

const client = []
wss.on('connection', (ws) => {
  console.log('A new client connected')

  client.push(ws)

  ws.on('message', message => {
    console.log('Received:', message.toString());

    client.forEach(conn => {
      if (conn !== ws && conn.readyState === WebSocket.OPEN) {
        conn.send(message.toString());
      }
    })
  })
})
