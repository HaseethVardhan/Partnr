import { Server } from "socket.io";
import http from 'http'
import {app} from './app.js'

const server = http.createServer(app)

let io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  // Handle sending a message
  socket.on("send_message", (data) => {
    const { conversationId, senderId, receiverId, text } = data;

    // Emit to everyone in that conversation room (including receiver)
    io.to(conversationId).emit("receive_message", {
      senderId,
      text,
      timestamp: new Date()
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { server };
