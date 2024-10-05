import React, { useContext } from 'react';
import { SerialDigitalDataContext } from '../contexts/SerialDigitalDataProvider';
import styles from '../styles/SerialDigitalDataDisplay.module.css'; // Import CSS Module
import { useConfigContext } from '../contexts/ConfigContext'; // Import useConfigContext

const SerialDigitalDataDisplay = ({ matrix }) => {
  const { data, error } = useContext(SerialDigitalDataContext);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data ? (
        <div className={styles['button-container']}>
          {matrix.map(([text, register, index]) => {
            const regKey = `reg${register}`; // Convert register number to key
            const isActive = data[regKey] && data[regKey][index];

            return (
              <div
                key={`${register}-${index}`}
                className={`${styles['digital-button']} ${isActive ? styles['active'] : ''}`}
              >
                {text}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default SerialDigitalDataDisplay;
