import React, { useContext, useEffect, useState } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider'; // Import the data provider context
import styles from '../styles/ModbusTextInput.module.css'; // Import the CSS Module

const ModbusLabel = ({ registerPath, ip, decimals = 0 }) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext); // Destructure getControllerField from context
  const [labelValue, setLabelValue] = useState('');

  useEffect(() => {
    const extractedValue = getControllerField(ip, registerPath); // Use the getControllerField method

    if (extractedValue !== null && extractedValue !== undefined) {
      setLabelValue((extractedValue / Math.pow(10, decimals)).toFixed(decimals)); // Apply decimal formatting
    } else {
      setLabelValue(''); // Clear label if value is null or undefined
    }
  }, [data, ip, registerPath, decimals, getControllerField]); // Include getControllerField in dependencies

  if (error) return <div>Error: {error.message}</div>;

  return <div className={styles.modbusLabel}>{labelValue}</div>;
};

export default ModbusLabel;
