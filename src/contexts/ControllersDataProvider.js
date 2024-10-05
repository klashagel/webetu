import React, { createContext, useState, useEffect, useCallback, useMemo, useRef, useContext } from 'react';
import axios from 'axios';
import { useConfigContext } from './ConfigContext'; // Import useConfigContext
import { WebSocketContext } from './WebSocketProvider'; // Import WebSocketContext
import { EVENT_ID_CONTROLLERS_UPDATED } from '../constants'; // Adjust the path as needed

// Create a Context for the data
export const ControllersDataContext = createContext();

const ControllersDataProvider = ({ children }) => {
  const { restUrl } = useConfigContext(); // Access configuration directly
  const { messages } = useContext(WebSocketContext); // Use WebSocketContext to get messages
  const [data, setData] = useState(null); // Initialize data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialMount = useRef(true); // Track initial mount
  const processedMessageIdsRef = useRef(new Set()); // Track processed message IDs

  // Function to fetch data from API
  const fetchData = useCallback(async () => {
    if (!restUrl) {
      console.error("Error fetching data: REST URL is undefined");
      setError(new Error("REST URL is undefined"));
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${restUrl}/etu/getallcontrollers`); // Use the REST URL from context
      setData(response.data);
      setError(null); // Clear previous error
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [restUrl]);

  // Fetch data on initial mount
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      fetchData();
    }
  }, [fetchData]);

  // Process WebSocket messages to trigger data refresh
  useEffect(() => {
    messages.forEach((message) => {
      if (message.eventid === EVENT_ID_CONTROLLERS_UPDATED) {
        if (!processedMessageIdsRef.current.has(message.messageid)) {
          processedMessageIdsRef.current.add(message.messageid);
          fetchData(); // Refresh data from REST API
        }
      }
    });
  }, [messages, fetchData]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => {
    const getControllerField = (ip, registerPath) => {
      if (!data || !Array.isArray(data)) return null;

      const filteredData = ip
        ? data.filter((item) => item.Controller && item.Controller.ip === ip)
        : data;

      if (filteredData.length > 0) {
        const controller = filteredData[0].Controller;
        if (controller && controller.fields) {
          return registerPath.reduce(
            (acc, key) => (acc ? acc[key] : null),
            controller.fields
          );
        }
      }
      return null;
    };

    return {
      data,
      loading,
      error,
      refresh: fetchData,
      getControllerField,
    };
  }, [data, loading, error, fetchData]);

  return (
    <ControllersDataContext.Provider value={contextValue}>
      {children}
    </ControllersDataContext.Provider>
  );
};

export default ControllersDataProvider;
