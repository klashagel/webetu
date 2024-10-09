import React, { createContext, useEffect, useState, useRef } from 'react';
import { useConfigContext } from './ConfigContext'; // Import useConfigContext

export const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { websocketUrl } = useConfigContext(); // Access WebSocket URL from context
  const [messages, setMessages] = useState([]); // Array to hold incoming messages
  const [socket, setSocket] = useState(null);
  const messageIdSet = useRef(new Set()); // Ref to track processed message IDs
  const queue = useRef([]); // Ref to manage the message queue

  useEffect(() => {
    if (!websocketUrl) {
      console.error("WebSocket URL is undefined");
      return;
    }

    const ws = new WebSocket(websocketUrl);
    setSocket(ws);

    ws.onmessage = (event) => {
      const rawData = event.data;
      console.log('Raw WebSocket data received:', rawData);

      try {
        const messagesArray = rawData.split('\n').filter(Boolean); // Split by newline
        messagesArray.forEach(message => {
          try {
            const parsedData = JSON.parse(message);
            console.log('Parsed WebSocket data:', parsedData);
            if (!messageIdSet.current.has(parsedData.messageid)) {
              messageIdSet.current.add(parsedData.messageid); // Add to the set of processed messages
              queue.current.push(parsedData); // Add to the queue
              console.log(`Queue length after push: ${queue.current.length}`); // Log queue length
            }
          } catch (parseError) {
            console.error('Error parsing JSON from message:', parseError);
            console.error('Message content:', message);
          }
        });
      } catch (err) {
        console.error('Error handling WebSocket message:', err);
        console.error('Received data:', rawData);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    ws.onclose = () => {
      console.error("WebSocket closed, attempting to reconnect...");
      setTimeout(() => {
        setSocket(new WebSocket(websocketUrl)); // Reconnect after delay
      }, 5000); // Adjust reconnection delay as needed
    };

    return () => {
      ws.close();
    };
  }, [websocketUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.current.length > 0) {
        console.log(`Queue length before processing: ${queue.current.length}`); // Log queue length before processing
        setMessages(prevMessages => [...prevMessages, ...queue.current]);
        queue.current = []; // Clear the queue after processing
        console.log('Queue cleared'); // Log queue cleared
      }
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
