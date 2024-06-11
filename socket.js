const { WebSocket } = require('ws')
const express = require('express')
const { createServer } = require('http')

const app = express()
const server = createServer(app)

const wss = new WebSocket.Server({ server });

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

app.get('/', (req, res) => {
  res.send('Websocket')
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log('Server is listening on PORT', PORT);
})