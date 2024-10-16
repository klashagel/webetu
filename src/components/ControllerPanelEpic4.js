import React from 'react';
import '../styles/ControllerPanelItem.css';
import ModbusDigitalButton from './ModbusDigitalButton';
import { useTheme } from '../contexts/ThemeContext';
import ModbusGauge from './ModbusComponents/ModbusGauge/ModbusGauge';
import ModbusNumberInput from '../components/ModbusComponents/ModbusInput/ModbusNumberInput';
import TextField from '@mui/material/TextField';
import ModbusTextInput from './ModbusComponents/ModbusInput/ModbusTextInput';
import ModbusGaugeGoogle from './ModbusComponents/ModbusGauge/ModbusGaugeGoogle';

const ControllerPanelEpic4 = ({ item, onSelect, onDoubleClick, selected }) => {
  ///const shouldBlink = item.Controller && item.Controller.fields.SumAlarm === 1;
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
      className={`h-full w-full flex flex-col ${bgColor} ${textColor} ${borderColor} overflow-hidden`}
    >
      <div className="grid grid-cols-3 gap-1 pl-1 pt-2">

      <div className="col-span-3">
    <ModbusTextInput
      registerPath={['Name']}
      ip={item.ip}
      width="w-44"
    />
  </div>

  <ModbusNumberInput
          registerPath={['FIELDPOSITION']}
          ip={item.ip}
         
           width="w-full"
        />

        <ModbusNumberInput
          registerPath={['NodeAddress']}
          ip={item.ip}
          width="w-full"
        />
        <ModbusNumberInput
          registerPath={['ActModeFiringRatio']}
          ip={item.ip}
          width="w-full"
        />

<ModbusNumberInput
          registerPath={['FIELDPOSITION']}
          ip={item.ip}
         
           width="w-full"
        />
        <ModbusNumberInput
          registerPath={['NodeAddress']}
          ip={item.ip}
          width="w-full"
        />

<div className="col-span-3">
      <ModbusGaugeGoogle
        registerPath={['SecPulseCurr']} 
        ip={item.ip} 
        min={0} 
        max={1000} 
        label="Pulse current"
        width={70}
        height={70}
      />
   </div>
        
      </div>
 
    </div>
  );
};

export default ControllerPanelEpic4;