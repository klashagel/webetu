import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useConfigContext } from '../../../contexts/ConfigContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ModbusAutoComplete = ({ registerPath, ip, width = 'w-full', options }) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [selectValue, setSelectValue] = useState(null);
  const [inputError, setInputError] = useState('');
  const [editing, setEditing] = useState(false);

  const registerInfo = getRegisterInfo(registerPath);

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

  useEffect(() => {
    const extractedValue = getControllerField(ip, registerPath);
    if (extractedValue !== null && extractedValue !== undefined) {
      const displayValue = convertToDisplay(extractedValue).toString();
      const option = options.find(opt => opt.value.toString() === displayValue);
      setSelectValue(option || null);
    } else {
      setSelectValue(null);
    }
  }, [data, ip, registerPath, getControllerField, convertToDisplay, options]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const handleChange = async (event, newValue) => {
    setSelectValue(newValue);

    if (newValue) {
      try {
        const valueForAPI = convertToValue(newValue.value);
        const body = {
          ip,
          register: registerInfo.register,
          value: valueForAPI,
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
        setEditing(false);
      } catch (error) {
        console.error('Error calling API:', error);
        setInputError('An error occurred while updating the value.');
      }
    }
  };

  const handleLabelClick = () => {
    setEditing(true);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const labelClasses = `
    absolute -top-3 left-3 text-sm px-1 tracking-wide
    pointer-events-none z-10 transition-all duration-200 
    transform translate-y-1 scale-75 origin-top-left
    ${isDarkMode ? 'bg-gray-700 text-white/70' : 'bg-white text-black/60'}
  `;

  const spanClasses = `
    h-10 flex items-center rounded 
    px-3.5 cursor-pointer text-base bg-transparent
    ${width}
    ${isDarkMode ? 'text-white' : 'text-black/87'}
  `;

  const unit = registerInfo?.unit || '';

  return (
    <ThemeProvider theme={theme}>
      <div className={`relative mt-4 mb-2 ${width}`} style={registerInfo?.style}>
        {editing ? (
          <Autocomplete
            options={options}
            value={selectValue}
            onChange={handleChange}
            onClose={() => setEditing(false)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${t(registerInfo?.labelKey || 'Value')} ${unit ? `(${unit})` : ''}`}
                error={!!inputError}
                helperText={inputError}
              />
            )}
            className={`bg-transparent ${width}`}
          />
        ) : (
          <div className={`relative ${width}`}>
            <span className={labelClasses}>
              {`${t(registerInfo?.labelKey || 'Value')} ${unit ? `(${unit})` : ''}`}
            </span>
            <span
              onClick={handleLabelClick}
              className={spanClasses}
            >
              {selectValue
                ? `${selectValue.label}${unit ? ` ${unit}` : ''}`
                : t(registerInfo?.placeholderKey || 'Select a value')}
            </span>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ModbusAutoComplete;