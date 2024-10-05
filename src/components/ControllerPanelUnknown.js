import React from 'react';
import ResizableController from './ResizableController';
import '../styles/ControllerPanelItem.css';

const ControllerPanelUnknown = ({ item, onSelect, onDoubleClick, selected, onResize }) => {
  return (
    <ResizableController initialSize={{ width: 300, height: 200 }} onResize={onResize} selected={selected}>
      <div
        onClick={onSelect}
        onDoubleClick={() => onDoubleClick(item.ip)}
        style={{ 
          height: '100%',
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
    </ResizableController>
  );
};

export default ControllerPanelUnknown;
