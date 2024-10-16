import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import ModbusDigitalButton from '../components/ModbusDigitalButton';
import Dialog from '../components/DialogSelectLuaFile';
import ModbusNumberInput from '../components/ModbusComponents/ModbusInput/ModbusNumberInput';
import ModbusGauge from '../components/ModbusComponents/ModbusGauge/ModbusGauge';
import ModbusGaugeGoogle from '../components/ModbusComponents/ModbusGauge/ModbusGaugeGoogle';
import ModbusSelect from '../components/ModbusComponents/ModbusSelect/ModbusSelect';
import ModbusAutoComplete from '../components/ModbusComponents/ModbusAutoComplete/ModbusAutoComplete';
import { Paper, Typography } from '@mui/material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext'
import { useTheme as useMuiTheme } from '@mui/material/styles';

const Epic4Controller = () => {
  const { ip } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

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

  const LabeledPaper = ({ label, children, className }) => {
    const { isDarkMode } = useCustomTheme();
    const muiTheme = useMuiTheme();
  
    const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
    const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const textColor = isDarkMode ? 'text-white/70' : 'text-black/60';
  
    return (
      <div className={`relative mt-6 mb-2 ${className}`}>
        <Paper 
          elevation={3} 
          className={`p-6 rounded-lg shadow-md border ${borderColor}`}
          sx={{
            backgroundColor: isDarkMode ? muiTheme.palette.grey[800] : muiTheme.palette.grey[100],
          }}
        >
          <span className={`absolute -top-3 left-3 text-sm px-1 ${bgColor} ${textColor}`}>
            {label}
          </span>
          {children}
        </Paper>
      </div>
    );
  };

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

         <LabeledPaper label="Controller Settings" className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ModbusNumberInput registerPath={['AO1']} ip={ip} width='w-20' />
            <ModbusNumberInput registerPath={['AO2']} ip={ip} width='w-20' />
            <ModbusNumberInput registerPath={['ActModeFiringRatio']} ip={ip} width='w-36' />      
            <ModbusNumberInput registerPath={['ActModeVoltPeak']} ip={ip} width='w-36'/>
            <ModbusNumberInput registerPath={['ActModeFiringRatio']} ip={ip} width='w-36'/>
          </div>
        </LabeledPaper>
      
   
    
        <div className="flex flex-col md:flex-row gap-4">
    
        <LabeledPaper label="Controller Settings" className="max-w-2xl mx-auto">
        <div className={`mb-5 ${borderColor}`}>
          <ModbusNumberInput registerPath={['ActModeSpm']} ip={ip} width='w-52'/>
        </div>
        <div className={`mb-5 ${borderColor}`}>
          <ModbusNumberInput registerPath={['IdleCurr']} ip={ip} width='w-20'/>
        </div>
        <div className={`mb-5 ${borderColor}`}>
          <ModbusNumberInput registerPath={['ActModeRappFactor']} ip={ip} width='w-40'/>
        </div>
   
        <div className={`mb-5 ${borderColor}`}>
        <ModbusAutoComplete 
  registerPath={['DustResitivity']} 
  ip={ip} 
  width='w-40'
  options={[
    { value: 0, label: 'Low' },
    { value: 1, label: 'Medium' },
    { value: 2, label: 'High' },
    { value: 2, label: 'Custom' },
  ]}
/>

</div>
</LabeledPaper>


<LabeledPaper label="Gauges" className="max-w-2xl mx-auto mt-8">
  <div className="flex flex-wrap justify-around">
    <div className="mt-4">
      <ModbusGauge 
        registerPath={['SecPulseCurr']} 
        ip={ip} 
        min={0} 
        max={1000} 
        label="Pulse current"
        width={160}
        height={150}
        ranges={[
          { lightColor: "bg-blue-100", darkColor: "bg-blue-900", value: 200 },
          { lightColor: "bg-blue-300", darkColor: "bg-blue-700", value: 400 },
          { lightColor: "bg-blue-500", darkColor: "bg-blue-600", value: 600 },
          { lightColor: "bg-blue-600", darkColor: "bg-blue-500", value: 800 },
          { lightColor: "bg-blue-700", darkColor: "bg-blue-300", value: 1000 }
        ]}
      />
    </div>

    <div className="mt-4">
      <ModbusGauge 
        registerPath={['SecVoltAvg']} 
        ip={ip} 
        min={0} 
        max={100} 
        label="Sec volt"
        width={160}
        height={150}
        ranges={[
          { lightColor: "bg-blue-100", darkColor: "bg-blue-900", value: 20 },
          { lightColor: "bg-blue-300", darkColor: "bg-blue-700", value: 40 },
          { lightColor: "bg-blue-500", darkColor: "bg-blue-600", value: 60 },
          { lightColor: "bg-red-600", darkColor: "bg-blue-500", value: 80 },
          { lightColor: "bg-red-700", darkColor: "bg-blue-300", value: 100 }
        ]}
      />
    </div>

    <div className="mt-4">
      <ModbusGaugeGoogle
        registerPath={['SecPulseCurr']} 
        ip={ip} 
        min={0} 
        max={1000} 
        label="Pulse current"
        width={70}
        height={70}
      />
    </div>
  </div>
</LabeledPaper>

        <Dialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          title={t('select_item')}
          onItemSelected={handleItemSelected}
        />

        {selectedItem && <p>{t('selected_item')}: {selectedItem}</p>}

      </div>
    </div>
</div>

  );
  
};

export default Epic4Controller;