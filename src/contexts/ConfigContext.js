import React, { createContext, useContext } from 'react';
import useConfig from '../hooks/useConfig';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const { config, loading, error } = useConfig();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  return useContext(ConfigContext);
};
