import React, { createContext, useContext, useState } from 'react';

const SelectedIpContext = createContext();

export const useSelectedIp = () => useContext(SelectedIpContext);

export const SelectedIpProvider = ({ children }) => {
  const [selectedIp, setSelectedIp] = useState('');

  return (
    <SelectedIpContext.Provider value={{ selectedIp, setSelectedIp }}>
      {children}
    </SelectedIpContext.Provider>
  );
};
