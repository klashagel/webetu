import React, { useRef } from 'react';
import ResizableController from './ResizableController';

const DraggableController = ({ children, initialSize, onResize, selected, onDragStart, onDragEnd, index, isResizeEnabled, isDragDropEnabled, isEditMode, title }) => {
  const dragRef = useRef(null);

  const handleDragStart = (e) => {
    if (isDragDropEnabled) {
      e.dataTransfer.setData('text/plain', index.toString());
      onDragStart(index);
    }
  };

  const handleDragEnd = () => {
    if (isDragDropEnabled) {
      onDragEnd();
    }
  };

  return (
    <div
      ref={dragRef}
      draggable={isDragDropEnabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: isDragDropEnabled ? 'move' : 'default' }}
    >
      <ResizableController 
        initialSize={initialSize} 
        onResize={onResize} 
        selected={selected}
        isResizeEnabled={isResizeEnabled}
        isEditMode={isEditMode}  // Add this line
        title={title}
      >
        {children}
      </ResizableController>
    </div>
  );
};

export default DraggableController;