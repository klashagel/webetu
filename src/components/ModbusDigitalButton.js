import React from 'react';
import { useContext } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider';

const ModbusDigitalButton = ({ text, registerPath, ip, register, isDarkMode }) => {
  const { getControllerField } = useContext(ControllersDataContext);

  const handleClick = () => {
    // Your click handler logic here
    console.log(`Button clicked: ${text}, IP: ${ip}, Register: ${register}`);
    // You might want to use getControllerField here or in a useEffect
  };

  const buttonStyle = {
    padding: '5px 10px',
    margin: '2px',
    backgroundColor: isDarkMode ? '#2c3e50' : '#f0f0f0',
    color: isDarkMode ? '#ecf0f1' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
};

export default ModbusDigitalButton;
