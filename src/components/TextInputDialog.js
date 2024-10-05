import React, { useState } from 'react';
import '../styles/Dialog.css'; // Import custom styles for the dialog

const TextInputDialog = ({ isOpen, onClose, title, onTextSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitClick = () => {
    if (inputValue.trim() !== '') {
      onTextSubmit(inputValue); // Pass the input value to the parent
      setInputValue(''); // Clear the input field
      onClose(); // Close the dialog after submitting
    }
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="dialog-close" onClick={onClose}>✖</button>
        </div>
        <div className="dialog-body">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="dialog-textbox"
            placeholder="Enter text here"
          />
        </div>
        <div className="dialog-footer">
          <button
            className="dialog-button"
            onClick={handleSubmitClick}
            disabled={inputValue.trim() === ''}
          >
            Submit
          </button>
          <button className="dialog-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TextInputDialog;
