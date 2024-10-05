import React, { useContext, useEffect, useState } from 'react';
import { SerialAnalogDataContext } from '../contexts/SerialAnalogDataProvider';

const SerialAnalogLabel = ({ registerPath }) => {
  const { data: analogData, loading, error } = useContext(SerialAnalogDataContext) || {};
  const [labelValue, setLabelValue] = useState('');

  useEffect(() => {
    if (analogData && registerPath && registerPath.length === 2) {
      const [register, valueType] = registerPath;
      const extractedValue = analogData[register]?.[valueType];

      if (extractedValue !== null && extractedValue !== undefined) {
        setLabelValue(extractedValue); // Directly set the extracted value
      } else {
        setLabelValue(''); // Clear label if value is null or undefined
      }
    }
  }, [analogData, registerPath]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;

  return <div className="globalLabel">{labelValue}</div>;
};

export default SerialAnalogLabel;
