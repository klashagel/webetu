import React, { useContext, useEffect, useState } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider';
import { useConfigContext } from '../contexts/ConfigContext'; 
import styles from '../styles/ModbusTextInput.module.css';

const ModbusTextInput = ({ placeholder, registerPath, ip, register, decimals = 0 }) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext(); 
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false); 
  const [inputError, setInputError] = useState(''); 
  const [pendingValue, setPendingValue] = useState(null); 

  useEffect(() => {
    if (!editing) {
      const extractedValue = getControllerField(ip, registerPath);
      if (pendingValue === null || !editing) {
        setInputValue(extractedValue !== null && extractedValue !== undefined
          ? extractedValue.toString()
          : '');
      }
    }
  }, [data, ip, registerPath, editing, pendingValue, getControllerField]); 

  if (error) return <div>Error: {error.message}</div>;

  const handleInputChange = (e) => {
    setEditing(true); 
    setInputValue(e.target.value);
    setInputError(''); 
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await updateValue();
    }
  };

  const handleBlur = async () => {
    if (editing) {
      await updateValue();
    }
  };

  const validateInput = (value) => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue);
  };

  const updateValue = async () => {
    try {
      if (!validateInput(inputValue)) {
        setInputError('Invalid input. Please enter a valid number.');
        setEditing(false);
        return;
      }

      const numericValue = parseFloat(inputValue);
      const newValue = Math.round(numericValue * Math.pow(10, decimals));
      setPendingValue(newValue);

      const body = {
        ip,
        register,
        value: newValue,
      };

      const response = await fetch(`${restUrl}/modbus/write`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setPendingValue(null);
      setEditing(false);
    } catch (error) {
      console.error('Error calling API:', error);
      setInputError('An error occurred while updating the value.');
      setPendingValue(null);
      setEditing(false);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={`${styles.modbusTextInput} ${inputError ? styles.error : ''}`} 
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur} 
        placeholder={placeholder || 'Enter value'}
      />
      {inputError && <div className={styles.errorText}>{inputError}</div>}
    </div>
  );
};

export default ModbusTextInput;
