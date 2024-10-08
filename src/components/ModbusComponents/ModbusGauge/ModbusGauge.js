import React, { useContext, useMemo, useState, useEffect } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';

const ModbusGauge = ({ registerPath, ip, min = 0, max = 100, label, width = 200, height = 160 }) => {

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

  return (
    <div className="flex flex-col items-center">
        
      <ReactSpeedometer
        value={safeValue}
        minValue={min}
        maxValue={max}
        needleTransition="easeElastic"
        needleTransitionDuration={500}
        needleColor={isDarkMode ? "#ffffff" : "#000000"}
        startColor={isDarkMode ? "#4a5568" : "#ebf8ff"}
        endColor={isDarkMode ? "#2c5282" : "#2b6cb0"}
        valueFormat={"d"}
        currentValueText={formatTextValue(displayValue)}
        width={width}
        height={height}
      />
      {label && <div className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{label}</div>}
    </div>
  );
};

export default ModbusGauge;