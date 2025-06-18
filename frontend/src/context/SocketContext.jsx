import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  let socket = io(`${import.meta.env.VITE_BASE_URL}`, {
        autoConnect: false,
        reconnection: true,
      });
  

  const connectSocket = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
      
      socket.on("connect", async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/user/update-socket-id`,
            { socketId: socket.id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error("Error updating socket ID:", error);
        }
      });
    }
  };

  const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

   useEffect(() => {
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
