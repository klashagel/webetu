import React, { useContext } from 'react';
import { SerialDigitalDataContext } from '../contexts/SerialDigitalDataProvider';
import { useConfigContext } from '../contexts/ConfigContext';
import styles from '../styles/SerialDigitalDataButton.module.css'; // Import CSS Module

const SerialDigitalDataButtonDisplay = ({ matrix }) => {
  const { data, error } = useContext(SerialDigitalDataContext);
  const { restUrl } = useConfigContext(); // Get the REST URL from context

  if (error) return <div>Error: {error.message}</div>;

  // Function to handle button state change
  const handleButtonClick = async (register, index) => {
    const newState = !data[register][index]; // Toggle the state
    const regNumber = parseInt(register.replace('reg', ''), 10);
    const buttonNumber = (regNumber -1) * 20 + index + 1; // Button numbers are 1-based
    console.log(`Updating button ${buttonNumber} in reg  ${register}  state to:`, newState);

    const buttonState = {
      buttonNumber,
      newState,
    };

    try {
      const response = await fetch(`${restUrl}/serial/digital/write`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buttonState),
      });

      if (!response.ok) {
        throw new Error('Failed to update button state');
      }

      console.log(`Button ${buttonNumber} state updated successfully.`);
    } catch (error) {
      console.error('Error updating button state:', error);
    }
  };

  return (
    <div>
      {data ? (
        <div className={styles['button-container']}>
          {matrix.map(([text, register, index]) => {
            const regKey = `reg${register}`; // Convert register number to key
            const isActive = data[regKey] && data[regKey][index];

            return (
              <button
                key={`${register}-${index}`}
                onClick={() => handleButtonClick(regKey, index)}
                style={{ backgroundColor: isActive ? 'green' : 'gray' }}
                className={styles['digital-button']}
              >
                {text}
              </button>
            );
          })}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default SerialDigitalDataButtonDisplay;
