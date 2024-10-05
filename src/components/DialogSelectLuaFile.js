import React, { useState, useEffect } from 'react';
import '../styles/Dialog.css'; // Import custom styles for the dialog
import { useConfigContext } from '../contexts/ConfigContext';

const DialogSelectLuaFile = ({ isOpen, onClose, title, onItemSelected }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filenames, setFilenames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { restUrl } = useConfigContext();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch(`${restUrl}/lua/files`) // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => {
          setFilenames(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching filenames:", error);
          setError("Failed to load filenames");
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
  };

  const handleSelectClick = () => {
    if (selectedItem) {
      onItemSelected(selectedItem); // Pass the selected item to the parent
      onClose(); // Close the dialog after selecting the item
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="dialog-close" onClick={onClose}>✖</button>
        </div>
        <div className="dialog-body">
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <ul className="dialog-list">
              {filenames.map((item, index) => (
                <li
                  key={index}
                  className={`dialog-list-item ${item === selectedItem ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="dialog-footer">
          <button
            className="dialog-button"
            onClick={handleSelectClick}
            disabled={!selectedItem}
          >
            Select
          </button>
          <button className="dialog-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DialogSelectLuaFile;
