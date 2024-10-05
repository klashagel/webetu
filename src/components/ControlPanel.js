import React from 'react';
import '../styles/ControlPanel.css';

const ControlPanel = () => {
  // Handler for button click
  const handleClick = (buttonId) => {
    console.log(`Button ${buttonId} clicked`);
    // Implement your button click logic here
  };

  return (
    <div className="control-panel">
      {[...Array(18)].map((_, index) => (
        <button
          key={index}
          className="control-button"
          onClick={() => handleClick(index + 1)}
        >
          Button {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ControlPanel;
