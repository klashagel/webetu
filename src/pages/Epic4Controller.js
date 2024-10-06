import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import epicStyles from '../styles/Epic4Main.module.css';
import labelStyles from '../styles/LabelInputWrapper.module.css';
import ModbusDigitalButton from '../components/ModbusDigitalButton';
import ModbusTextInputNew from '../components/ModbusTextboxNew';
import ModbusLabelNew from '../components/ModbusLabelNew';
import { useTranslation } from 'react-i18next';
import Dialog from '../components/DialogSelectLuaFile';
import ModbusDropdownInput from '../components/ModbuDropDownInput';

const Epic4Main = () => {
  const { ip } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [addContent, setAddContent] = useState(() => () => {});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleContentChange = useCallback((contentUpdater) => {
    setAddContent(() => contentUpdater);
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

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

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="p-4">
      <div className="globalButtonRow mb-4">
        <button onClick={handleNavigateToManual} className="globalButton mr-2">Manual</button>
        <button onClick={handleNavigateToAuto} className="globalButton mr-2">Auto</button>
        <ModbusDigitalButton text="TRON" registerPath={['TrOn']} ip={ip} register="CO_16384" />
        <ModbusDigitalButton text="Reset" registerPath={['SUMALARMRESETREV']} ip={ip} register="CO_16384" />
        <ModbusDigitalButton text="TESTMODE" registerPath={['TESTMODE']} ip={ip} register="CO_16394" />
      </div>

      <div className={labelStyles.wrapper}>
        <label htmlFor="modbus-text-input-1" className={labelStyles.label}>{t('lbl_firing_ratio')}</label>
        <ModbusTextInputNew
          placeholder="Enter value"
          registerPath={['ActModeFiringRatio']}
          ip={ip}
          register="HO_1040"
          convertToDisplay={(value) => value}
          convertToValue={(value) => Math.round(parseFloat(value) * 100)}
        />
      </div>

      <div className={labelStyles.wrapper}>
        <label htmlFor="modbus-text-input-2" className={labelStyles.label}>{t('lbl_epic4_field')}</label>
        <ModbusTextInputNew
          placeholder="Enter character"
          registerPath={['FIELDPOSITION']}
          ip={ip}
          register="HO_1112"
          convertToDisplay={(value) => String.fromCharCode(value)}
          convertToValue={(value) => value.charCodeAt(0)}
        />
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title="Select an Item"
        onItemSelected={handleItemSelected}
      />

      {selectedItem && <p>Selected Item: {selectedItem}</p>}

      <div className={epicStyles.gridContainer}>
        <div className={epicStyles.gridSection}>
          <h2 className="text-xl font-bold mb-2">Operation</h2>
          <div className={epicStyles.gridRow}>
            <label>High voltage</label>
            <ModbusLabelNew registerPath={['HighVoltage']} ip={ip} />
            <label>Primary</label>
            <label>Secondary</label>
          </div>
          <div className={epicStyles.gridRow}>
            <label>Sum alarm</label>
            <ModbusDigitalButton text="Reset" registerPath={['SumAlarmReset']} ip={ip} register="CO_XXXX" />
            <label>RMS(V)</label>
            <ModbusLabelNew registerPath={['PrimaryRMSV']} ip={ip} />
            <label>Avg</label>
            <ModbusLabelNew registerPath={['SecondaryAvg']} ip={ip} />
          </div>
          <div className={epicStyles.gridRow}>
            <label>Mode</label>
            <ModbusDropdownInput
              placeholder="Select a value"
              registerPath={['ActModeFiringRatio']}
              ip={ip}
              register="HO_1112"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
              convertToDisplay={(val) => val}
              convertToValue={(val) => Number(val)}
            />
            <label>RMS(A)</label>
            <ModbusLabelNew registerPath={['PrimaryRMSA']} ip={ip} />
            <label>Pulse</label>
            <ModbusLabelNew registerPath={['SecondaryPulse']} ip={ip} />
          </div>
        </div>

        <div className={epicStyles.gridSection}>
          <h2 className="text-xl font-bold mb-2">Active settings</h2>
          <div className={epicStyles.gridRow}>
            <label>Voltage peak limit</label>
            <ModbusTextInputNew
              placeholder="Enter value"
              registerPath={['VoltagePeakLimit']}
              ip={ip}
              register="HO_XXXX"
              convertToDisplay={(value) => value}
              convertToValue={(value) => parseInt(value)}
            />
            <label>Dust resistivity</label>
            <ModbusLabelNew registerPath={['DustResistivity']} ip={ip} />
          </div>
          <div className={epicStyles.gridRow}>
            <label>Curr. pls lim</label>
            <ModbusTextInputNew
              placeholder="Enter value"
              registerPath={['CurrentPulseLimit']}
              ip={ip}
              register="HO_XXXX"
              convertToDisplay={(value) => value}
              convertToValue={(value) => parseInt(value)}
            />
            <label>EOPT</label>
            <ModbusLabelNew registerPath={['EOPT']} ip={ip} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Epic4Main;
