import React from 'react';
import ResizableController from './ResizableController';
import '../styles/ControllerPanelItem.css';
import ModbusDigitalButton from './ModbusDigitalButton';

const ControllerPanelEpic4 = ({ item, onSelect, onDoubleClick, selected, onResize }) => {
  const shouldBlink = item.Controller && item.Controller.fields.SumAlarm === 1;

  const sanitizeString = (str) => {
    if (!str) return '';
    return str.split('').filter(char => char.charCodeAt(0) !== 0).join('').trim();
  };

  return (
    <ResizableController initialSize={{ width: 300, height: 200 }} onResize={onResize} selected={selected}>
      <div
        onClick={onSelect}
        onDoubleClick={() => onDoubleClick(item.ip)}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <div style={{ flexGrow: 1, overflow: 'auto' }}>
          {shouldBlink && <div className="blinking-rectangle"></div>}
          <p className="paragraph">IP: {sanitizeString(item.ip)}</p>
          {item.Controller && (
            <p className="paragraph">Name: {sanitizeString(item.Controller.name)}</p>
          )}
          <p className="paragraph">Last Active: {item.lastActive}</p>
        </div>
        
        <div className="globalButtonRow">
          <ModbusDigitalButton
            text="TESTMODE"
            registerPath={['TESTMODE']}
            ip={item.ip}
            register="CO_16394"
          />
          <ModbusDigitalButton
            text="RESET"
            registerPath={['RESET']}
            ip={item.ip}
            register="CO_16395"
          />
          <ModbusDigitalButton
            text="TRON"
            registerPath={['TrOn']}
            ip={item.ip}
            register="CO_16384"
          />
        </div>
      </div>
    </ResizableController>
  );
};

export default ControllerPanelEpic4;
