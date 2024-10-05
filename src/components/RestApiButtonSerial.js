import React from 'react';
import { ConfigProvider, useConfigContext } from '../contexts/ConfigContext';

const RestApiButtonSerial = ({ buttonText, command }) => {
  const { restUrl } = useConfigContext(); // Get URLs from context
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${restUrl}/api/serial/write`, { // Replace with your actual backend URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }), // Send command in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to send command');
      }

      console.log(`Command "${command}" sent successfully.`);
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <button 
      onClick={handleButtonClick}
      className="globalButton"
    >
      {buttonText}
    </button>
  );
};

export default RestApiButtonSerial;
