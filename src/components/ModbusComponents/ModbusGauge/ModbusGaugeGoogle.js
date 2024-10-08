import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';

const ModbusGaugeGoogle = ({ registerPath, ip, min = 0, max = 100, label, width = 200, height = 160 }) => {
  const { getControllerField } = useContext(ControllersDataContext);
  const { isDarkMode } = useTheme();
  const registerInfo = getRegisterInfo(registerPath);

  const [displayValue, setDisplayValue] = useState(null);

  const convertToDisplay = useMemo(() => {
    if (typeof registerInfo?.convertToDisplay === 'function') {
      return (value) => {
        if (value === null || value === undefined) return null;
        try {
          return registerInfo.convertToDisplay(value);
        } catch (error) {
          console.error('Error in convertToDisplay:', error);
          return null;
        }
      };
    }
    return (value) => value;
  }, [registerInfo]);

  useEffect(() => {
    const rawValue = getControllerField(ip, registerPath);
    const newValue = convertToDisplay(rawValue);
    setDisplayValue(newValue);
  }, [getControllerField, ip, registerPath, convertToDisplay]);

  const formatTextValue = value => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    return typeof value === 'number' ? value.toFixed(2) : value.toString();
  };

  const safeValue = displayValue !== null && displayValue !== undefined && !isNaN(displayValue) 
    ? Number(displayValue) 
    : min;

  const data = [
    ['Label', 'Value'],
    ['', safeValue],
  ];

  const options = {
    width: width,
    height: height,
    redFrom: max * 0.9,
    redTo: max,
    yellowFrom: max * 0.75,
    yellowTo: max * 0.9,
    minorTicks: 5,
    min: min,
    max: max,
    backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
    greenColor: isDarkMode ? '#4a5568' : '#ebf8ff',
    greenFrom: min,
    greenTo: max * 0.75,
  };

  return (
    <div className="flex flex-col items-center">
      <Chart
        chartType="Gauge"
        width={`${width}px`}
        height={`${height}px`}
        data={data}
        options={options}
      />
      <div className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {label}: {formatTextValue(displayValue)}
      </div>
    </div>
  );
};

export default ModbusGaugeGoogle;