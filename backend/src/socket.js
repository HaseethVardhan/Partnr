import {Server} from "socket.io"

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export {initializeSocket}