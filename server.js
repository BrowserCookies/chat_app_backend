const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const app = express();
const server = require("http").createServer(app);
const port = 5000;

app.use(cors());

const wss = new WebSocket.Server({ server: server });

let clients = [];
let messageClient;
let msg;

wss.on("connection", function connection(ws) {
  clients.push(ws);
  ws.send("Hello listener wsg g,server")
  console.log("A new client connected");
  ws.on("message", function incoming(message) {
    console.log(`Recieved a msg: ${message}`);
    messageClient = new String(message);
    msg = messageClient.split(",");
    //console.log(messageClient.split(",")[0]);
    clients.forEach((client) => {
      if (client != ws) {
        // client.send(`${msg[1]} says: ${msg[0]}`);
        client.send(`${messageClient}`);
      }
    });
  });
});

server.listen(port, () => {
  console.log(`An example server is listening on port ${port}`);
});

app.post("/newRoom", (req, res) => {
  res.send({
    payload: "Hello from the server!",
  });
});
