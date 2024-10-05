import React, { useContext, useEffect, useState, useRef } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider'; // Import the data provider context
import GaugeChart from 'react-gauge-chart'; // Import the GaugeChart component
import styles from '../styles/ModbusGauge.module.css'; // Import the CSS Module for gauge styling

const ModbusGauge = ({ registerPath, ip, decimals = 0, min = 0, max = 100 }) => {
  const { data, error, getControllerField } = useContext(ControllersDataContext); // Destructure getControllerField from context
  const [gaugeValue, setGaugeValue] = useState(0);
  const previousValueRef = useRef(gaugeValue); // Track the previous value for smooth animation

  useEffect(() => {
    const extractedValue = getControllerField(ip, registerPath); // Use the getControllerField method

    if (extractedValue !== null && extractedValue !== undefined) {
      // Normalize the value to a percentage between 0 and 1
      const normalizedValue = (extractedValue - min) / (max - min);
      const newValue = Math.min(Math.max(normalizedValue, 0), 1); // Ensure value is between 0 and 1

      // Animate the gauge from the previous value to the new value
      const animationDuration = 1000; // Duration in milliseconds
      let startTime = null;
      const startValue = previousValueRef.current;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / animationDuration, 1);
        const value = startValue + (newValue - startValue) * progress;
        setGaugeValue(value);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          previousValueRef.current = newValue; // Update the reference value once animation completes
        }
      };

      requestAnimationFrame(animate);
    } else {
      setGaugeValue(0); // Set default value if data is null or undefined
      previousValueRef.current = 0; // Reset reference value
    }
  }, [data, ip, registerPath, min, max, getControllerField]); // Include getControllerField in dependencies

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.gaugeContainer}>
      <GaugeChart
        animate={false} // Disable the built-in animation
        id="gauge-chart"
        nrOfLevels={30}
        colors={['#FF5F6D', '#FFC371']}
        arcWidth={0.3}
        percent={gaugeValue}
        needleColor="#333"
        needleBaseColor="#333"
        textColor="#333"
        style={{ width: '100%', height: '100%' }} // Make the gauge responsive
      />
      <div className={styles.gaugeValue}>
        {gaugeValue.toFixed(decimals)} {/* Show the value with proper decimal formatting */}
      </div>
    </div>
  );
};

export default ModbusGauge;
