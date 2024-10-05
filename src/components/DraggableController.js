import React, { useRef } from 'react';
import ResizableController from './ResizableController';

const DraggableController = ({ children, initialSize, onResize, selected, onDragStart, onDragEnd, index }) => {
  const dragRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', index.toString());
    onDragStart(index);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: 'move' }}
    >
      <ResizableController initialSize={initialSize} onResize={onResize} selected={selected}>
        {children}
      </ResizableController>
    </div>
  );
};

export default DraggableController;