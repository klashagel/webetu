import React, { useContext, useEffect, useState, useRef } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider';
import { useConfigContext } from '../contexts/ConfigContext';
import styles from '../styles/ModbusTextInput.module.css';

const ModbusTextInputNew = ({
  placeholder,
  registerPath,
  ip,
  register,
  convertToDisplay,
  convertToValue,
}) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext();
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false);
  const [inputError, setInputError] = useState('');
  const [pendingValue, setPendingValue] = useState(null);

  const inputRef = useRef(null);
  const measuringSpanRef = useRef(null);

  useEffect(() => {
    if (!editing) {
      const extractedValue = getControllerField(ip, registerPath);
      setInputValue(extractedValue !== null && extractedValue !== undefined
        ? convertToDisplay(extractedValue)
        : '');
    }
  }, [data, ip, registerPath, editing, pendingValue, getControllerField, convertToDisplay]);

  useEffect(() => {
    if (measuringSpanRef.current && inputRef.current) {
      measuringSpanRef.current.textContent = inputValue || placeholder || 'Click to enter value';
      inputRef.current.style.width = `${measuringSpanRef.current.offsetWidth + 20}px`; // Add some padding
    }
  }, [inputValue, placeholder, editing]);

  if (error) return <div>Error: {error.message}</div>;

  const handleLabelClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
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
    try {
      const valueForAPI = convertToValue(value);
      return !isNaN(valueForAPI);
    } catch (e) {
      return false;
    }
  };

  const updateValue = async () => {
    try {
      if (!validateInput(inputValue)) {
        setInputError('Invalid input. Please enter a valid value.');
        setEditing(false);
        return;
      }

      const newValue = convertToValue(inputValue);
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
      {editing ? (
        <>
          <input
            type="text"
            className={`${styles.modbusTextInput} ${inputError ? styles.error : ''}`} 
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            placeholder={placeholder || 'Enter value'}
            autoFocus
            ref={inputRef}
            style={{ width: 'auto' }} // Allow dynamic width adjustment
          />
          <span
            ref={measuringSpanRef}
            style={{
              visibility: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '16px',
              padding: '8px',
              boxSizing: 'content-box',
            }}
          >
           {inputValue !== null && inputValue !== undefined ? inputValue : placeholder || 'Click to enter value'}

          </span>
        </>
      ) : (
        <span
          className={`${styles.label} ${styles.modbusTextInput}`}
          onClick={handleLabelClick}
          style={{
            cursor: 'pointer',
            display: 'inline-block',
            height: '30px',
            lineHeight: '30px',
            padding: '5px 10px',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
          }}
        >
          {inputValue !== null && inputValue !== undefined ? inputValue : placeholder || 'Click to enter value'}

        </span>
      )}
      {inputError && <div className={styles.errorText}>{inputError}</div>}
    </div>
  );
};

export default ModbusTextInputNew;
