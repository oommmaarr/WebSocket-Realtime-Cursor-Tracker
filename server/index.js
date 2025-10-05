const http = require("http");
const url = require("url");
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const port = 8000;
const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const connections = {};
const users = {};

// 🔄 Broadcast updated users list to everyone
const broadcast = () => {
  const message = JSON.stringify(users);
  Object.values(connections).forEach((connection) => {
    if (connection.readyState === 1) {
      connection.send(message);
    }
  });
};

// 💬 Handle incoming message from a client
const handleMessage = (bytes, uuid) => {
  try {
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];
    if (!user) return;

    // Update user state (e.g., cursor position)
    user.state = message;
    console.log(`${user.username} sent:`, message);

    // Notify all clients of new state
    broadcast();
  } catch (err) {
    console.error("❌ Invalid JSON from client:", bytes.toString());
  }
};

// ❌ Handle user disconnect
const handleClose = (uuid) => {
  console.log(`🔌 ${users[uuid]?.username || "Unknown user"} disconnected`);
  delete connections[uuid];
  delete users[uuid];
  broadcast();
};

// ⚡ Handle new WebSocket connection
wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;

  if (!username) {
    connection.close();
    console.log("❌ Connection closed: missing username");
    return;
  }

  const uuid = uuidv4();
  connections[uuid] = connection;
  users[uuid] = {
    username,
    state: { x: 0, y: 0 },
  };

  console.log(`✅ ${username} connected with UUID: ${uuid}`);

  // Listen for messages & close events
  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));

  // Send current state to the new user
  broadcast();
});

// 🚀 Start the server
server.listen(port, () => {
  console.log(`🟢 WebSocket Server is running on ws://127.0.0.1:${port}`);
});
