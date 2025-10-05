🖱️ Realtime Cursor Tracker

A realtime collaborative cursor tracking app built with React, Node.js, and WebSockets.
Each user’s mouse movement is broadcast live to all connected clients — perfect for understanding how realtime communication works on the web.

🚀 Features

🔁 Live mouse cursor updates for all connected users

🧑‍🤝‍🧑 Each user gets a unique session with their username

⚡ Built using native WebSockets for low-latency realtime communication

🧠 Throttled updates using lodash.throttle for better performance

🧩 Clean React structure with reusable components

🧰 Technologies Used

Frontend: React, react-use-websocket, lodash.throttle, Pure CSS

Backend: Node.js, ws (WebSocket library), uuid

Realtime Protocol: WebSocket

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/YOUR_USERNAME/realtime-cursor-tracker.git
cd realtime-cursor-tracker

2️⃣ Install dependencies

Backend:

cd server
npm install


Frontend:

cd client
npm install

3️⃣ Start the servers

Backend:

node index.js


Frontend:

npm run dev


Then open 👉 http://localhost:5173
 (or your dev port).

🧠 How It Works

Each user connects to the Node.js WebSocket server with a username.

The server assigns a unique UUID and keeps track of all connected users.

Whenever a user moves their mouse, their position (x, y) is sent to the server.

The server broadcasts these updates to all other clients in realtime.

The frontend updates each cursor’s position instantly using React components.




📄 License

This project is open-source and available under the MIT License
.