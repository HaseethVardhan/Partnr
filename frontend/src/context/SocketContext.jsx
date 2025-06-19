import React, { createContext, useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { UserDataContext } from "./UserContext";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const {user} = useContext(UserDataContext)

  useEffect(() => {

    const socketInstance = io(import.meta.env.VITE_BASE_URL, {
      autoConnect: true,
    });
    
    socketInstance.emit("setup", user._id);
    

    // socketInstance.on("connect", () => {
    //   console.log("Socket connected:", socketInstance.id);
    // });

    socketInstance.on("receive_message", (message) => {
      setIncomingMessage(message);
    });

    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [user._id]);

  return (
    <SocketContext.Provider value={{ socket, incomingMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
