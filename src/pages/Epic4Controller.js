import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import ModbusDigitalButton from '../components/ModbusDigitalButton';
import Dialog from '../components/DialogSelectLuaFile';
import ModbusNumberInput from '../components/ModbusComponents/ModbusInput/ModbusNumberInput';
import ModbusGauge from '../components/ModbusComponents/ModbusGauge/ModbusGauge';
import ModbusGaugeGoogle from '../components/ModbusComponents/ModbusGauge/ModbusGaugeGoogle';

const Epic4Controller = () => {
  const { ip } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleNavigateToManual = () => {
    navigate(`/Epic4Manual/${ip}`);
  };

  const handleNavigateToAuto = () => {
    navigate(`/Epic4Auto/${ip}`);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleItemSelected = (item) => {
    setSelectedItem(item);
    console.log('Selected Item:', item);
  };

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <div className="p-4">
        <div className="globalButtonRow mb-4">
          <button onClick={handleNavigateToManual} className={`globalButton mr-2 ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}>{t('manual')}</button>
          <button onClick={handleNavigateToAuto} className={`globalButton mr-2 ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}>{t('auto')}</button>
          <ModbusDigitalButton text={t('tron')} registerPath={['TrOn']} ip={ip} register="CO_16384" isDarkMode={isDarkMode} />
          <ModbusDigitalButton text={t('reset')} registerPath={['SUMALARMRESETREV']} ip={ip} register="CO_16384" isDarkMode={isDarkMode} />
          <ModbusDigitalButton text={t('testmode')} registerPath={['TESTMODE']} ip={ip} register="CO_16394" isDarkMode={isDarkMode} />
        </div>

        <div className={`mb-4 ${borderColor}`}>
          <ModbusNumberInput registerPath={['AO1']} ip={ip} />
        </div>

        <div className={`mb-4 ${borderColor}`}>
          <ModbusNumberInput registerPath={['AO2']} ip={ip} />
        </div>

        <div className={`mb-4 ${borderColor}`}>
          <ModbusNumberInput registerPath={['ActModeFiringRatio']} ip={ip} />
        </div>

        <div className={`mb-4 ${borderColor}`}>
          <ModbusNumberInput registerPath={['SecVoltAvg']} ip={ip} />
        </div>


        <div className="mt-8">
        <ModbusGauge 
          registerPath={['SecPulseCurr']} 
          ip={ip} 
          min={0} 
          max={1000} 
          label="Pulse current"
          width={160}  // Adjust this value to make the gauge smaller
          height={150}
        />
      </div>

      <div className="mt-8">
        <ModbusGauge 
          registerPath={['SecVoltAvg']} 
          ip={ip} 
          min={0} 
          max={100} 
          label="Sec volt"
          width={160}  // Adjust this value to make the gauge smaller
          height={150}
        />
      </div>
      <div className="mt-8">
      <ModbusGaugeGoogle
          registerPath={['SecPulseCurr']} 
          ip={ip} 
          min={0} 
          max={1000} 
          label="Pulse current"
          width={70}  // Adjust this value to make the gauge smaller
          height={70}
        />
      </div>

        <Dialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          title={t('select_item')}
          onItemSelected={handleItemSelected}
        />

        {selectedItem && <p>{t('selected_item')}: {selectedItem}</p>}

      </div>
    </div>
  );
};

export default Epic4Controller;