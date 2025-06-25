import { Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { Chat } from "./models/chat.model.js";

const server = http.createServer(app);

let io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("setup", (userId) => {
    userSocketMap.set(userId, socket.id);
    socket.userId = userId; // Store it on the socket object too
  });

  // Handle sending a message
  socket.on("send_message", async (data) => {
    const { conversationId, senderId, receiverId, text, replyTo, _id, clientSentAt } =
      data;

    let replyMessage = null;
    if (replyTo) {
      const replyToId = typeof replyTo === "object" ? replyTo._id : replyTo;
      replyMessage = await Chat.findById(replyToId).select("text senderId");
    }

    const messagePayload = {
      conversationId,
      _id,
      senderId,
      text,
      createdAt: new Date(),
      clientSentAt,
      serverReceivedAt: now,
      ...(replyMessage && { replyTo: replyMessage }),
    };

    const payloadWithDelivery = {
      ...messagePayload,
      serverDeliveredAt: Date.now(), // right before emit
    };

    // Emit to everyone in that conversation room (including receiver)
    io.to(conversationId).emit("receive_message", payloadWithDelivery);

    const socketsInRoom = await io.in(conversationId).fetchSockets();

    const receiverIsInRoom = socketsInRoom.some((s) => s.userId === receiverId);

    // If receiver is not already in the conversation room, emit directly
    if (!receiverIsInRoom) {
      const receiverSocketId = userSocketMap.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
        ...messagePayload,
        serverDeliveredAt: Date.now(),
      });
      }
    }
  });

  socket.on("typing", ({ conversationId, senderId }) => {
    socket.to(conversationId).emit("typing", { conversationId, senderId });
  });

  socket.on("stop_typing", ({ conversationId, senderId }) => {
    socket.to(conversationId).emit("stop_typing", { conversationId, senderId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { server };
