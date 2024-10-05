import React, { useState } from 'react';

const ResizableController = ({ children, initialSize, onResize, selected }) => {
  const [size, setSize] = useState(initialSize);

  const handleResizeStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(200, startWidth + moveEvent.clientX - startX);
      const newHeight = Math.max(150, startHeight + moveEvent.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${size.width}px`,
        height: `${size.height}px`,
        margin: '10px',
        flexGrow: 0,
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: selected ? '#d3d3d3' : 'transparent',
      }}>
        {children}
      </div>
      {selected && (
        <div
          style={{
            position: 'absolute',
            right: '0',
            bottom: '0',
            width: '10px',
            height: '10px',
            cursor: 'se-resize',
            background: 'gray',
            zIndex: 10,
          }}
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
};

export default ResizableController;