import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ControllersDataContext } from '../../../contexts/ControllersDataProvider';
import { useConfigContext } from '../../../contexts/ConfigContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { getRegisterInfo } from '../../../constants/epic4tags';
import { useTranslation } from 'react-i18next';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ModbusSelect = ({ registerPath, ip, width = 'w-full', options }) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext);
  const { restUrl } = useConfigContext();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [selectValue, setSelectValue] = useState('');
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
    setSelectValue(extractedValue !== null && extractedValue !== undefined
      ? convertToDisplay(extractedValue).toString()
      : '');
  }, [data, ip, registerPath, getControllerField, convertToDisplay]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const handleChange = async (event) => {
    const newValue = event.target.value;
    setSelectValue(newValue);

    try {
      const valueForAPI = convertToValue(newValue);
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
    h-10 flex items-center border rounded 
    px-3.5 cursor-pointer text-base bg-transparent
    ${width}
    ${isDarkMode ? 'border-white/23 text-white' : 'border-black/23 text-black/87'}
  `;

  const unit = registerInfo?.unit || '';

  return (
    <ThemeProvider theme={theme}>
      <div className={`relative mt-4 mb-2 ${width}`} style={registerInfo?.style}>
        {editing ? (
          <FormControl className={`${width}`} error={!!inputError}>
            <InputLabel id={`select-label-${registerPath}`}>
              {`${t(registerInfo?.labelKey || 'Value')} ${unit ? `(${unit})` : ''}`}
            </InputLabel>
            <Select
              labelId={`select-label-${registerPath}`}
              value={selectValue}
              onChange={handleChange}
              onClose={() => setEditing(false)}
              label={`${t(registerInfo?.labelKey || 'Value')} ${unit ? `(${unit})` : ''}`}
              className={`bg-transparent ${width}`}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {inputError && <FormHelperText>{inputError}</FormHelperText>}
          </FormControl>
        ) : (
          <div className={`relative ${width}`}>
            <span className={labelClasses}>
              {`${t(registerInfo?.labelKey || 'Value')} ${unit ? `(${unit})` : ''}`}
            </span>
            <span
              onClick={handleLabelClick}
              className={spanClasses}
            >
              {selectValue !== '' && selectValue !== null && selectValue !== undefined
                ? `${options.find(opt => opt.value.toString() === selectValue)?.label || selectValue}${unit ? ` ${unit}` : ''}`
                : t(registerInfo?.placeholderKey || 'Select a value')}
            </span>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ModbusSelect;