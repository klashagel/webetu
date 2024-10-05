import React, { useContext, useEffect, useState } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider'; // Import the data provider context
import styles from '../styles/ModbusTextInput.module.css'; // Import the CSS Module

const ModbusLabelNew = ({ registerPath, ip, convertToDisplay }) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext); // Destructure getControllerField from context
  const [labelValue, setLabelValue] = useState('');

  useEffect(() => {
    const extractedValue = getControllerField(ip, registerPath); // Use the getControllerField method

    if (extractedValue !== null && extractedValue !== undefined) {
      const displayValue = convertToDisplay 
        ? convertToDisplay(extractedValue) 
        : extractedValue;
      setLabelValue(displayValue);
    } else {
      setLabelValue(''); // Clear label if value is null or undefined
    }
  }, [data, ip, registerPath, getControllerField, convertToDisplay]); // Include getControllerField in dependencies

  if (error) return <div>Error: {error.message}</div>;

  return <div className={styles.modbusLabel}>{labelValue}</div>;
};

export default ModbusLabelNew;
