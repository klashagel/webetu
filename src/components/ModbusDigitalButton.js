import React, { useContext, useEffect, useState } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider'; // Replace with your actual data provider
import { useConfigContext } from '../contexts/ConfigContext'; // Assuming you have a ConfigContext for REST URL



const ModbusDigitalButton = ({ text, registerPath, ip, register }) => {
  const { data, error } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext(); // Get the REST URL from context
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredData = ip
        ? data.filter((item) => item.Controller && item.Controller.ip === ip)
        : data;

      if (filteredData.length > 0) {
        const controller = filteredData[0].Controller;
        if (controller && controller.fields) {
          const extractedValue = registerPath.reduce(
            (acc, key) => (acc ? acc[key] : null),
            controller.fields
          );
          setValue(extractedValue);
        }
      }
    }
  }, [data, ip, registerPath]);

  if (error) return <div>Error: {error.message}</div>;

  // Function to handle button click
  const handleButtonClick = async () => {
    const newValue = value === 1 ? 0 : 65280; // Toggle the value

    try {
      const body = {
        ip,
        register, // Assuming DI_64 is the correct register to be updated
        value: newValue,
      };

      const response = await fetch(`${restUrl}/modbus/write`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state with the new value if the API call is successful
      setValue(newValue);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  // Determine the background color based on the value
  const backgroundColor = value === 1 ? 'green' : 'gray';

  return (
    <button
      className="globalButton" // Use styles from CSS Module
      onClick={handleButtonClick}
      style={{ backgroundColor, cursor: 'pointer' }}
    >
      {text}
    </button>
  );
};

export default ModbusDigitalButton;
