import React, { useContext, useCallback } from 'react';
import { SerialDigitalDataContext } from '../contexts/SerialDigitalDataProvider';
import DigitalButton from './DigitalButton';
import '../styles/DigitialInputs.css';
import { useConfigContext } from '../contexts/ConfigContext'; // Import useConfigContext

const DigitalInputs = ({ id, matrix }) => {
  const { restUrl } = useConfigContext(); // Access configuration directly
  const { data, loading, error, refresh } = useContext(SerialDigitalDataContext);
  const [digitalData, setDigitalData] = React.useState({ reg1: [], reg2: [] });

  // Update state when context data changes
  React.useEffect(() => {
    if (data && data.reg1 && data.reg2) {
      try {
        setDigitalData({
          reg1: data.reg1,
          reg2: data.reg2,
        });
      } catch (err) {
        console.error('Error processing context data:', err);
      }
    }
  }, [data]);

  // Handle button toggle
  const handleToggleButton = useCallback(
    async (buttonNumber, register, index) => {
      try {
        const newState = !digitalData[register][index];
        const response = await fetch(`${restUrl}/serial/digital/write`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buttonNumber, register, index, newState }),
        });
        if (!response.ok) {
          throw new Error('Failed to update IO pin state');
        }

        setDigitalData((prevData) => {
          const newDigitalData = { ...prevData };
          newDigitalData[register][index] = newState;
          return newDigitalData;
        });

        // Refresh context data
        refresh();
      } catch (error) {
        console.error('Error updating IO pin state:', error);
      }
    },
    [digitalData, refresh, restUrl]
  );

  // Render buttons
  const renderButtonRows = useCallback(() => {
    if (!matrix || !Array.isArray(matrix)) {
      return null;
    }

    const rows = [];
    for (let i = 0; i < matrix.length; i += 4) {
      const row = (
        <div key={i} className="button-row">
          {matrix.slice(i, i + 4).map(([buttonNumber, register, index]) => {
            const regKey = register === 1 ? 'reg1' : 'reg2';
            const isActive = digitalData[regKey] && digitalData[regKey][index];

            return (
              <DigitalButton
                key={buttonNumber}
                buttonNumber={buttonNumber}
                isActive={isActive}
                onToggle={() => handleToggleButton(buttonNumber, regKey, index)}
              />
            );
          })}
        </div>
      );
      rows.push(row);
    }
    return rows;
  }, [digitalData, handleToggleButton, matrix]);

  return (
    <div className="matrix">
      {error && <div>{error.message}</div>}
      {!loading && !error && renderButtonRows()}
    </div>
  );
};

export default React.memo(DigitalInputs);
