import React, { useState } from 'react';
import { useConfigContext } from '../contexts/ConfigContext'; // Import useConfigContext

const ModbusAnalogTextBox = ({ id, ip, register, command, analogreg }) => {
  const [value, setValue] = useState('');

  const [prevValue, setPrevValue] = useState('');
  const [setApiResponse] = useState(null);

  
  const { restUrl } = useConfigContext(); // Access configuration directly

  // Function to handle the main API call
  const callApi = async () => {
    try {
      const body = {
        ip,
        register,
        value: parseInt(value, 10),
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

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  // Function to handle the button API call
  const handleButtonClick = async () => {
    try {
      const body = {
        command: command,
      };

      console.log('Button REST URL:', `${restUrl}/api/serial/write`);
      console.log('POST Body:', body);

      const response = await fetch(`${restUrl}/api/serial/write`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Button API Response:', data);
    } catch (error) {
      console.error('Error calling button API:', error);
    }
  };

  // Event handler for key down
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && value !== prevValue) {
      callApi();
      setPrevValue(value);
    }
  };

  // Event handler for input blur
  const handleBlur = () => {
    if (value !== prevValue) {
      callApi();
      setPrevValue(value);
    }
  };

  // Event handler for input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    // Allow empty value for clearing the input
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setValue(newValue);
    }
  };

 

  
  return (
    <div>
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <button onClick={handleButtonClick}>Measure</button>
    </div>
  );
};

export default ModbusAnalogTextBox;
