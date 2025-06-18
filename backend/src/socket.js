import { Server } from "socket.io";
import http from 'http'
import {app} from './app.js'

const server = http.createServer(app)

let io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

export { server };
