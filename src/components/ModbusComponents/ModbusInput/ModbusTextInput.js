import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useConfigContext } from '../../../contexts/ConfigContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ModbusTextInput = ({ registerPath, ip, width = 'w-full' }) => {

  const { data, error, getControllerField, getControllerText } = useContext(ControllersDataContext);
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
      const extractedValue = getControllerText(ip, registerInfo?.registerPath);
      console.log('Extracted Value:', extractedValue); // Debug log
      setInputValue(extractedValue !== null && extractedValue !== undefined
        ? convertToDisplay(extractedValue)
        : '');
    }
  }, [data, ip, registerPath, editing, pendingValue, getControllerText, convertToDisplay]);

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
  
    // Check if the input is empty (optional, depending on your requirements)
    if (value.trim() === '') return false;
  
    // Check maximum length (adjust the number as needed)
    const maxLength = 12 * 11; // 12 registers * 11 characters per register
    if (value.length > maxLength) return false;
  
    // Check for valid characters (adjust the regex as needed)
    const validCharRegex = /^[a-zA-Z0-9\s.,!?-]*$/; // Example: alphanumeric and some punctuation
    if (!validCharRegex.test(value)) return false;
  
    // If all checks pass, the input is valid
    return true;
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
        str: newValue,
        modbusaddresses: ["HO_1280","HO_1281",
            "HO_1282","HO_1283","HO_1284","HO_1285",
        "HO_1286","HO_1287","HO_1288","HO_1289","HO_1290"],
      };

      const response = await fetch(`${restUrl}/api/controller/setstring`, {
        method: 'POST',
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

 

  const unit = registerInfo?.unit || '';
 
  const labelClasses = `
    absolute top-0 left-0 text-xs tracking-wide
    pointer-events-none z-10 transition-all duration-200 
    transform -translate-y-1/2 scale-75 origin-left
    truncate max-w-full
    ${isDarkMode ? 'bg-gray-700 text-white/70' : 'bg-white text-black/60'}
  `;

  const spanClasses = `
    h-8 flex items-center rounded 
    pl-0 pr-2 cursor-text text-sm bg-transparent
    truncate
    ${isDarkMode ? 'text-white' : 'text-black/87'}
  `;

  const getWidthInPixels = (widthClass) => {
    const numericWidth = widthClass.match(/\d+/);
    return numericWidth ? `${numericWidth[0] * 4}px` : '100%';
  };


  const containerStyle = {
    ...registerInfo?.style,
    width: getWidthInPixels(width),
    padding: 0,
    margin: 0,
  };

  const inputStyle = {
    width: '100%',
    padding: 4,
    margin: 0,
    height: '20px',
    
  };


  const widthStyle = {
    width: getWidthInPixels(width),
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="relative p-0" ref={containerRef}>
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
            label={`${t(registerInfo?.labelKey || 'Value')} `}
            InputLabelProps={{
              className: labelClasses
            }}
            
            InputProps={{
              className: 'bg-transparent pl-0',
              style: { paddingLeft: 0 }
            }}
            inputProps={{
              style: inputStyle,
            }}
            style={{
              ...widthStyle,
              margin: 0,
            }}
          />
        ) : (
          <div className="relative p-0" style={widthStyle}>
            <span className={labelClasses} title={`${t(registerInfo?.labelKey || 'Value')} `}>
              {`${t(registerInfo?.labelKey || 'Value')} `}
            </span>
            <span
              onClick={handleLabelClick}
              className={`${spanClasses} w-full`}
              title={`${inputValue}${unit ? ` ${unit}` : ''}`}
            >
              {inputValue !== '' && inputValue !== null && inputValue !== undefined 
                ? `${inputValue}${unit ? ` ${unit}` : ''}` 
                : placeholder}
            </span>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ModbusTextInput;