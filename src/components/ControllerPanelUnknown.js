import React from 'react';
import '../styles/ControllerPanelItem.css';

const ControllerPanelUnknown = ({ item, onSelect, onDoubleClick, style }) => {
  return (
    <div
      onClick={onSelect}
      onDoubleClick={() => onDoubleClick(item.ip)}
      style={{ 
        ...style,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '10px',
      }}
    >
      <p className="paragraph">IP: {item.ip}</p>
      <p className="paragraph">Type: Unknown</p>
      <p className="paragraph">Last Active: {item.lastActive}</p>
    </div>
  );
};

export default ControllerPanelUnknown;
