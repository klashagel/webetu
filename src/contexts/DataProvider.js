// src/contexts/DataProvider.js
import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import { WebSocketContext } from './WebSocketProvider'; // Import WebSocketContext
import { EVENT_ID_CONTROLLERS_UPDATED } from '../constants'; // Adjust the path as needed

// Create a Context for the data
export const DataContext = createContext();

const DataProvider = ({ children, url }) => {
  const webSocketContext = useContext(WebSocketContext);
  const websocketData = webSocketContext?.data || null; // Use optional chaining to handle undefined context
  const [data, setData] = useState(null); // Initialize data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialMount = useRef(true); // Track initial mount

  // Function to fetch data from API
  const fetchData = useCallback(async () => {
    if (!url) {
      console.error("Error fetching data: URL is undefined");
      setError(new Error("URL is undefined"));
      setLoading(false);
      return;
    }

    console.log("Fetching data from:", url);
    setLoading(true);
    try {
      const response = await axios.get(url); // Use the URL prop here
      setData(response.data);
      setError(null); // Clear previous error
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Fetch data on mount
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      fetchData();
    }
  }, [fetchData]);

  // Refresh data when WebSocket message is received and eventid is 12
  useEffect(() => {
    if (websocketData) {
      console.log(websocketData);

      try {
        if (websocketData.eventid === EVENT_ID_CONTROLLERS_UPDATED) { // Check for eventid 12
          fetchData(); // Refresh data from REST API
        }
      } catch (err) {
        console.error("Error processing WebSocket data: ", err);
      }
    }
  }, [websocketData, fetchData]);

  // Provide context value
  return (
    <DataContext.Provider value={{ data, loading, error, refresh: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
