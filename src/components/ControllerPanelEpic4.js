import React from 'react';
import '../styles/ControllerPanelItem.css';
import ModbusDigitalButton from './ModbusDigitalButton';
import { useTheme } from '../contexts/ThemeContext';
import ModbusGauge from './ModbusComponents/ModbusGauge/ModbusGauge';
import ModbusNumberInput from '../components/ModbusComponents/ModbusInput/ModbusNumberInput';
import TextField from '@mui/material/TextField';


const ControllerPanelEpic4 = ({ item, onSelect, onDoubleClick, selected }) => {
  const shouldBlink = item.Controller && item.Controller.fields.SumAlarm === 1;
  const { isDarkMode } = useTheme();

  
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  const sanitizeString = (str) => {
    if (!str) return '';
    return str.split('').filter(char => char.charCodeAt(0) !== 0).join('').trim();
  };

  const inputConfigs = [
    { registerPath: ['ActModeFiringRatio'], width: 'w-32' },
    { registerPath: ['FIELDPOSITION'], width: 'w-32' },

    // Add more configurations as needed
  ];

  return (
    <div
      onClick={onSelect}
      onDoubleClick={() => onDoubleClick(item.ip)}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        color: isDarkMode ? '#ecf0f1' : '#333',
      }}
    >
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
  
        <p className="paragraph">IP: {sanitizeString(item.Controller.name)}</p>
        {item.Controller && (
          <p className="paragraph">Name: {sanitizeString(item.name)}</p>
        )}
        <p className="paragraph">Last Active: {item.lastActive}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
      {inputConfigs.map((config, index) => (
        <ModbusNumberInput
          key={index}
          registerPath={config.registerPath}
          ip={item.ip}
          width={config.width}
          label={config.label}
        />
      ))}
    </div>

   
    </div>
  );
};

export default ControllerPanelEpic4;
