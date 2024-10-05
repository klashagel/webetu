import React, { useState, useEffect, useRef, useContext } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider'; // Assuming you have this context for data
import { useConfigContext } from '../contexts/ConfigContext';
import styles from '../styles/ModbusDropdownInput.module.css';

const ModbusDropdownInput = ({
  placeholder,
  registerPath,
  ip,
  register,
  options, // Array of options in format [{ value: "1", label: "Option 1" }, ...]
  convertToDisplay,
  convertToValue,
}) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext();
  const [selectedValue, setSelectedValue] = useState('');
  const [editing, setEditing] = useState(false);
  const [inputError, setInputError] = useState('');
  const [pendingValue, setPendingValue] = useState(null);

  const dropdownRef = useRef(null);
  const measuringSpanRef = useRef(null);

  useEffect(() => {
    if (!editing) {
      const extractedValue = getControllerField(ip, registerPath);
      setSelectedValue(
        extractedValue !== null && extractedValue !== undefined
          ? convertToDisplay(extractedValue)
          : ''
      );
    }
  }, [data, ip, registerPath, editing, pendingValue, getControllerField, convertToDisplay]);

  useEffect(() => {
    if (measuringSpanRef.current && dropdownRef.current) {
      measuringSpanRef.current.textContent = selectedValue || placeholder || 'Click to select';
      dropdownRef.current.style.width = `${measuringSpanRef.current.offsetWidth + 20}px`; // Add some padding
    }
  }, [selectedValue, placeholder, editing]);

  if (error) return <div>Error: {error.message}</div>;

  const handleLabelClick = () => {
    setEditing(true);
  };

  const handleDropdownChange = async (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    setInputError('');

    const valueForAPI = convertToValue(newValue);
    setPendingValue(valueForAPI);

    const body = {
      ip,
      register,
      value: valueForAPI,
    };

    try {
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

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <div className={styles.inputWrapper}>
      {editing ? (
        <select
          ref={dropdownRef}
          value={selectedValue}
          onChange={handleDropdownChange}
          onBlur={handleBlur}
          className={styles.modbusDropdownInput}
          autoFocus
        >
          <option value="" disabled>{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <span
          className={`${styles.label} ${styles.modbusDropdownInput}`}
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
          {selectedValue || placeholder || 'Click to select'}
        </span>
      )}
      {inputError && <div className={styles.errorText}>{inputError}</div>}
    </div>
  );
};

export default ModbusDropdownInput;
