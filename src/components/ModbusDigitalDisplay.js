import React, { useContext, useState, useEffect } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider'; // Replace with your actual data provider
import '../styles/ModbusDigitalDisplay.css'; // Replace with your actual CSS file

const ModbusDigitalDisplay = ({ matrix, filterIp }) => {
  const { data, error } = useContext(ControllersDataContext);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = filterIp
        ? data.filter((item) => item.Controller && item.Controller.ip === filterIp)
        : data;
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, filterIp]);

  if (error) return <div>Error: {error.message}</div>;

  // Function to safely extract nested values
  const extractValueFromMatrix = (data, matrix) => {
    return matrix.reduce((acc, key) => acc ? acc[key] : null, data);
  };

  return (
    <div>
      {filteredData.length > 0 ? (
        <div className="modbus-button-container">
          {matrix.map(([text, registerPath]) => {
            let value = null;

            filteredData.forEach((controllerObj) => {
              const controller = controllerObj.Controller;
              if (controller && controller.fields) {
                const extractedValue = extractValueFromMatrix(controller.fields, registerPath);
                if (extractedValue !== null && extractedValue !== undefined) {
                  value = extractedValue;
                }
              }
            });

            // Determine if the display element should show as active
            const isActive = value ? 'active' : '';

            return (
              <div
                key={text}
                className={`modbus-digital-button ${isActive}`}
              >
                {/* Display both the text and the value */}
                {text}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No data available for IP: {filterIp}</div>
      )}
    </div>
  );
};

export default ModbusDigitalDisplay;
