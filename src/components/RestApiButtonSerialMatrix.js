import React from 'react';
import RestApiButtonSerial from './RestApiButtonSerial'; // Import the RestApiButtonSerial component


const RestApiButtonSerialMatrix = ({ matrix }) => {
  return (
    <div className="globalButtonRow">
      {matrix.map(([buttonText, command], index) => (
        <RestApiButtonSerial
          key={index}
          buttonText={buttonText}
          command={command}
        />
      ))}
    </div>
  );
};

export default RestApiButtonSerialMatrix;
