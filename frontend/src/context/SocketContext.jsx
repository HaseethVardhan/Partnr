import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
        autoConnect: true,
        reconnection: true
    });

    useEffect(() => {
        socket.on('connect', async() => {
            try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/update-socket-id`, 
          { socketId: socket.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
      } catch (error) {
        console.error('Error updating socket ID:', error);
      }
    });


        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        

    }, []);



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;