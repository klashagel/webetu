// Not used , yet

import React, { createContext, useState, useEffect, useCallback, useContext, useRef, useMemo } from 'react';
import axios from 'axios';
import { useConfigContext } from './ConfigContext';
import { WebSocketContext } from './WebSocketProvider';
import { EVENT_ID_SERIAL_ANALOG_UPDATE, EVENT_ID_SERIAL_DIGITAL_UPDATE } from '../constants';

// Create a Context for the combined data
export const SerialDataContext = createContext();

const SerialDataProvider = ({ children }) => {
  const { restUrl } = useConfigContext();
  const webSocketContext = useContext(WebSocketContext);
  const websocketData = webSocketContext?.data || null;

  // Initialize states for both datasets
  const [analogData, setAnalogData] = useState(null);
  const [digitalData, setDigitalData] = useState(null);
  const [loading, setLoading] = useState({ analog: true, digital: true });
  const [error, setError] = useState({ analog: null, digital: null });
  const initialMount = useRef(true);

  // Function to fetch analog data
  const fetchAnalogData = useCallback(async () => {
    if (!restUrl) {
      console.error("Error fetching analog data: REST URL is undefined");
      setError(prev => ({ ...prev, analog: new Error("REST URL is undefined") }));
      setLoading(prev => ({ ...prev, analog: false }));
      return;
    }

    setLoading(prev => ({ ...prev, analog: true }));
    try {
      const response = await axios.get(`${restUrl}/serial/analog/getall`);
      setAnalogData(response.data);
      setError(prev => ({ ...prev, analog: null }));
    } catch (err) {
      console.error("Error fetching analog data: ", err);
      setError(prev => ({ ...prev, analog: err }));
    } finally {
      setLoading(prev => ({ ...prev, analog: false }));
    }
  }, [restUrl]);

  // Function to fetch digital data
  const fetchDigitalData = useCallback(async () => {
    if (!restUrl) {
      console.error("Error fetching digital data: REST URL is undefined");
      setError(prev => ({ ...prev, digital: new Error("REST URL is undefined") }));
      setLoading(prev => ({ ...prev, digital: false }));
      return;
    }

    setLoading(prev => ({ ...prev, digital: true }));
    try {
      const response = await axios.get(`${restUrl}/serial/digital/getall`);
      setDigitalData(response.data);
      setError(prev => ({ ...prev, digital: null }));
    } catch (err) {
      console.error("Error fetching digital data: ", err);
      setError(prev => ({ ...prev, digital: err }));
    } finally {
      setLoading(prev => ({ ...prev, digital: false }));
    }
  }, [restUrl]);

  // Fetch both datasets on mount
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      fetchAnalogData();
      fetchDigitalData();
    }
  }, [fetchAnalogData, fetchDigitalData]);

  // Refresh datasets when corresponding WebSocket events are received
  useEffect(() => {
    if (websocketData) {
      try {
        if (websocketData.eventid === EVENT_ID_SERIAL_ANALOG_UPDATE) {
          fetchAnalogData();
        } else if (websocketData.eventid === EVENT_ID_SERIAL_DIGITAL_UPDATE) {
          fetchDigitalData();
        }
      } catch (err) {
        console.error("Error processing WebSocket data: ", err);
      }
    }
  }, [websocketData, fetchAnalogData, fetchDigitalData]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    analogData,
    digitalData,
    loading,
    error,
    refreshAnalog: fetchAnalogData,
    refreshDigital: fetchDigitalData,
  }), [analogData, digitalData, loading, error, fetchAnalogData, fetchDigitalData]);

  return (
    <SerialDataContext.Provider value={contextValue}>
      {children}
    </SerialDataContext.Provider>
  );
};

export default SerialDataProvider;
