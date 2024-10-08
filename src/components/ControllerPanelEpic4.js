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
  
        <p className="paragraph">IP: {sanitizeString(item.ip)}</p>
        {item.Controller && (
          <p className="paragraph">Name: {sanitizeString(item.Controller.mac)}</p>
        )}
        <p className="paragraph">Last Active: {item.lastActive}</p>
      </div>
      <div className={`mb-4 ${borderColor}`}>
          <ModbusNumberInput registerPath={['ActModeFiringRatio']} ip={item.ip} width = 'w-32'/>
        </div>
   

   
    </div>
  );
};

export default ControllerPanelEpic4;
