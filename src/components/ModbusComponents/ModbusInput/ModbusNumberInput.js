import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useConfigContext } from '../../../contexts/ConfigContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ModbusNumberInput = ({ registerPath, ip, width = 'w-full' }) => {

  const { data, error, getControllerField } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false);
  const [inputError, setInputError] = useState('');
  const [pendingValue, setPendingValue] = useState(null);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const registerInfo = getRegisterInfo(registerPath);
  console.log('Register Info:', registerInfo); // Debug log

  const convertToDisplay = useMemo(() => {
    return typeof registerInfo?.convertToDisplay === 'function'
      ? registerInfo.convertToDisplay
      : (value => value);
  }, [registerInfo]);

  const convertToValue = useMemo(() => {
    return typeof registerInfo?.convertToValue === 'function'
      ? registerInfo.convertToValue
      : (value => value);
  }, [registerInfo]);

  const placeholder = t(registerInfo?.placeholderKey) || 'Enter value';

  useEffect(() => {
    if (!editing) {
      const extractedValue = getControllerField(ip, registerPath);
      console.log('Extracted Value:', extractedValue); // Debug log
      setInputValue(extractedValue !== null && extractedValue !== undefined
        ? convertToDisplay(extractedValue)
        : '');
    }
  }, [data, ip, registerPath, editing, pendingValue, getControllerField, convertToDisplay]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

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
    if (!registerInfo) return false;
    try {
      const valueForAPI = registerInfo.convertToValue(value);
      return !isNaN(valueForAPI);
    } catch (e) {
      return false;
    }
  };

  const updateValue = async () => {
    if (!registerInfo) {
      setInputError('Register information not found.');
      setEditing(false);
      return;
    }

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
        register: registerInfo.register,
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

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const labelClasses = `
    absolute -top-3 left-3 text-sm px-1  tracking-wide
    pointer-events-none z-10 transition-all duration-200 
    transform translate-y-1 scale-75 origin-top-left
    ${isDarkMode ? 'bg-gray-700 text-white/70' : 'bg-white text-black/60'}
  `;

  const spanClasses = `
    h-10 flex items-center border rounded 
    px-3.5 cursor-text text-base bg-transparent
    ${width}
    ${isDarkMode ? 'border-white/23 text-white' : 'border-black/23 text-black/87'}
  `;

  return (
    <ThemeProvider theme={theme}>
      <div className={`relative mt-4 mb-2 ${width}`} style={registerInfo?.style} ref={containerRef}>
        {editing ? (
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            placeholder={placeholder}
            error={!!inputError}
            helperText={inputError}
            variant="outlined"
            size="small"
            autoFocus
            inputRef={inputRef}
            label={t(registerInfo?.labelKey || 'Value')}
            fullWidth
            InputLabelProps={{
              className: labelClasses
            }}
            InputProps={{
              className: `bg-transparent ${width}`
            }}
          />
        ) : (
          <div className={`relative ${width}`}>
            <span className={labelClasses}>
            {t(registerInfo?.labelKey || 'Value')}
            </span>
            <span
              onClick={handleLabelClick}
              className={spanClasses}
            >
              {inputValue || placeholder}
            </span>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ModbusNumberInput;