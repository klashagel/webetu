import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SerialDigitalDataProvider from '../contexts/SerialDigitalDataProvider';
import SerialAnalogDataProvider, { SerialAnalogDataContext } from '../contexts/SerialAnalogDataProvider';
import SerialDigitalDataButtonDisplay from '../components/SerialDigitalDataButtonDisplay';
import SerialDigitalDataDisplay from '../components/SerialDigitalDataDisplay';
import ModbusDigitalDisplay from '../components/ModbusDigitalDisplay';
import ModbusAnalogTextBox from '../components/ModbusAnalogTextBox';
import ModbusDigitalButtonMatrix from '../components/ModbusDigitalButtonMatrix';
import PanelWrapper from '../components/PanelWrapper'; // Import the PanelWrapper
import styles from '../styles/LabelInputWrapper.module.css'; // Import the CSS Module
import ModbusLabel from '../components/ModbusLabel';
import ModbusTextInput from '../components/ModbusTextInput';
import ModbusDigitalButton from '../components/ModbusDigitalButton';
import RestApiButton from '../components/RestApiButton';
import ModbusTextInputNew from '../components/ModbusTextboxNew';
import labelStyles from '../styles/LabelInputWrapper.module.css'; // Import CSS Module for label and input styling
import { useTranslation } from 'react-i18next';
import SerialAnalogLabel from '../components/SerialAnalogLabel';
import RestApiButtonSerial from '../components/RestApiButtonSerial';

import { controller1Keypad, controller2Keypad, controller3Display, modbusDigitalDI,
  modbusDigitalDO,matrixSecCurrButtons,matrixSecVoltButtons,matrixPrimCurrRMSButtons,
  matrixPrimVoltRMSButtons,matrixSAut1Buttons } from '../constants/matrices';
import ModbusLabelNew from '../components/ModbusLabelNew';
import RestApiButtonSerialMatrix from '../components/RestApiButtonSerialMatrix';

const Epic4Firmware= () => {
  const { ip } = useParams();
  const { data: analogData, loading, error } = useContext(SerialAnalogDataContext) || {};
  const { t } = useTranslation(); // Use the translation hook
  const { i18n } = useTranslation();


  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (

    <div className="app-content" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', gap: '20px' }}>
      {/* Left Column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <PanelWrapper title="Digital Inputs">
          <SerialDigitalDataButtonDisplay matrix={controller1Keypad} />
        </PanelWrapper>
        <PanelWrapper title="Epic4 Digital Inputs">
          <ModbusDigitalDisplay matrix={modbusDigitalDI} filterIp={ip} />
        </PanelWrapper>
        <PanelWrapper title="Relay inputs">
          <SerialDigitalDataButtonDisplay matrix={controller2Keypad} />
        </PanelWrapper>
        <PanelWrapper title="Relay outputs">
          <SerialDigitalDataDisplay matrix={controller3Display} />
        </PanelWrapper>

 
        <PanelWrapper title="Secondary Current">
          <RestApiButtonSerialMatrix matrix={matrixSecCurrButtons} />
        </PanelWrapper>

        <PanelWrapper title="Secondary Voltage">
          <RestApiButtonSerialMatrix matrix={matrixSecVoltButtons} />
        </PanelWrapper>

        <PanelWrapper title="Primary Current RMS">
          <RestApiButtonSerialMatrix matrix={matrixPrimCurrRMSButtons} />
        </PanelWrapper>

        <PanelWrapper title="Primary Voltage RMS">
          <RestApiButtonSerialMatrix matrix={matrixPrimVoltRMSButtons} />
        </PanelWrapper>

        <PanelWrapper title="Aux Input 1">
          <RestApiButtonSerialMatrix matrix={matrixSAut1Buttons} />
        </PanelWrapper>
     
     
      </div>

      

      {/* Right Column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PanelWrapper title="Epic4 Relay">
          <ModbusDigitalButtonMatrix ip={ip} matrix={modbusDigitalDO} />
        </PanelWrapper>
        <PanelWrapper title="4-20 mA outputs">
        
        <table className="globalTable">
        <thead>
          <tr>
            <th>{t('label')}</th>
            <th>{t('value')}</th> {/* New column for value */}
            <th>{t('measurement')}</th>
            <th>{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="modbus-text-input-1">{t('lbl_AO1')}</label>
            </td>
            <td>
              <ModbusTextInputNew
                placeholder="Enter value"
                registerPath={['AO1']}
                ip={ip}
                register="HO_1248"
                convertToDisplay={(value) => value}  // Convert API value to display value
                convertToValue={(value) => Math.round(parseFloat(value) * 1)} // Convert display value to API value
                style={{
                  height: '30px',
                  lineHeight: '30px',
                  padding: '5px 10px',
                  minWidth: '150px', // Ensure a minimum width
                  boxSizing: 'border-box' // Include padding in width
                }}
              />
            </td>
            <td>
              <SerialAnalogLabel registerPath={['reg1', 'MeasuredValue']} />
            </td>
            <td>
              <RestApiButtonSerial buttonText={"Measure a1"} command={"a,ra1"} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="modbus-text-input-2">{t('lbl_AO2')}</label>
            </td>
            <td>
              <ModbusTextInputNew
                placeholder="Enter value"
                registerPath={['AO2']}
                ip={ip}
                register="HO_1249"
                convertToDisplay={(value) => value}  // Convert API value to display value
                convertToValue={(value) => Math.round(parseFloat(value) * 1)} // Convert display value to API value
                style={{
                  height: '30px',
                  lineHeight: '30px',
                  padding: '5px 10px',
                  minWidth: '150px', // Ensure a minimum width
                  boxSizing: 'border-box' // Include padding in width
                }}
              />
            </td>
            <td>
              <SerialAnalogLabel registerPath={['reg2', 'MeasuredValue']} />
            </td>
            <td>
              <RestApiButtonSerial buttonText={"Measure a2"} command={"a,ra2"} />
            </td>
          </tr>
        </tbody>
      </table>
        </PanelWrapper>

        <PanelWrapper title="Analog Inputs">
        <table className="globalTable">
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Unit</th> {/* Added unit column header */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Secondary Current</td>
          <td>
            <ModbusLabelNew
              registerPath={['TESTSECVOLT']}
              ip={ip}
              convertToDisplay={(value) => (value)}  // Convert API value to display value
            />
          </td>
          <td>uA</td> {/* Unit for secondary current */}
        </tr>
        <tr>
          <td>Secondary Voltage</td>
          <td>
          
            <ModbusLabelNew
              registerPath={['TESTSECCURR']}
              ip={ip}
              convertToDisplay={(value) => (value )}  // Convert API value to display value
            />
          </td>
          <td>mV</td> {/* Unit for secondary voltage */}
        </tr>
        <tr>
          <td>Primary Current RMS</td>
          <td>
            <ModbusLabelNew
              registerPath={['TESTPRIMCURRRMS']}
              ip={ip}
              convertToDisplay={(value) => (value / 1)}  // Convert API value to display value
            />
          </td>
          <td>mA</td> {/* Unit for primary current */}
        </tr>
        <tr>
          <td>Primary Voltage RMS</td>
          <td>
            <ModbusLabelNew
              registerPath={['TESTPRIMVOLTRMS']}
              ip={ip}
              convertToDisplay={(value) => (value / 1000)}  // Convert API value to display value
            />
          </td>
          <td>V</td> {/* Unit for primary voltage */}
        </tr>
        <tr>
          <td>Aux Input 1</td>
          <td>
            <ModbusLabelNew
              registerPath={['TESTAUXINP1']}
              ip={ip}
              convertToDisplay={(value) => (value / 10)}  // Convert API value to display value
            />
          </td>
          <td>mA</td> {/* Unit for auxiliary input */}
        </tr>
      </tbody>
    </table>
        </PanelWrapper>

        <div className="globalButtonRow">
          <ModbusDigitalButton
            text="TESTMODE"
            registerPath={['TESTMODE']}
            ip={ip}
            register="CO_16394"
          />
          <ModbusDigitalButton
            text="RESET"
            registerPath={['RESET']}
            ip={ip}
            register="CO_16395"
          />
          <ModbusDigitalButton
            text="TRON"
            registerPath={['TrOn']} // Example path
            ip={ip}
            register="CO_16384"
          />

        </div>
      </div>


    </div>

  );
};

export default Epic4Firmware;
