import React, { useContext, useMemo, useState, useEffect } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';


const ModbusGauge = ({ 
    registerPath, 
    ip, 
    min = 0, 
    max = 100, 
    label, 
    width = 200, 
    height = 160,
    ranges = [
        { lightColor: "bg-blue-100", darkColor: "bg-blue-900", value: 20 },
        { lightColor: "bg-blue-300", darkColor: "bg-blue-700", value: 40 },
        { lightColor: "bg-blue-500", darkColor: "bg-blue-600", value: 60 },
        { lightColor: "bg-blue-600", darkColor: "bg-blue-500", value: 80 },
        { lightColor: "bg-blue-700", darkColor: "bg-blue-300", value: 100 }
      ]
  }) => {

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

const getTailwindColor = (className) => {
  const tempEl = document.createElement('div');
  tempEl.className = className;
  document.body.appendChild(tempEl);
  const color = window.getComputedStyle(tempEl).backgroundColor;
  document.body.removeChild(tempEl);
  return color;
};

const segments = useMemo(() => {
  return [
    { color: getTailwindColor(isDarkMode ? ranges[0].darkColor : ranges[0].lightColor), value: min },
    ...ranges.map(range => ({
      color: getTailwindColor(isDarkMode ? range.darkColor : range.lightColor),
      value: range.value
    }))
  ];
}, [isDarkMode, min, ranges]);

const customSegmentStops = useMemo(() => {
  const stops = segments.map(seg => seg.value);
  if (stops[stops.length - 1] !== max) {
    stops[stops.length - 1] = max;
  }
  return stops;
}, [segments, max]);

return (
  <div className="flex flex-col items-center">
    <ReactSpeedometer
      value={safeValue}
      minValue={min}
      maxValue={max}
      needleTransition="easeElastic"
      needleTransitionDuration={500}
      needleColor={isDarkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"}
      segments={segments.length - 1}
      segmentColors={segments.slice(1).map(seg => seg.color)}
      customSegmentStops={customSegmentStops}
      valueFormat={"d"}
      currentValueText={formatTextValue(displayValue)}
      width={width}
      height={height}
      textColor={isDarkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"}
    />
    {label && <div className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{label}</div>}
  </div>
);
};

export default ModbusGauge;