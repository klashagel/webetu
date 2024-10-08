import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '../contexts/ThemeContext';

const ResizableController = ({ children, initialSize, onResize, selected, isResizeEnabled, isEditMode, title }) => {
  const [size, setSize] = useState(initialSize);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isDarkMode } = useTheme();

  const handleResizeStart = (e) => {
    if (isResizeEnabled) {
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
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        backgroundColor: isDarkMode ? (selected ? '#2c3e50' : '#34495e') : (selected ? '#f0f4f8' : 'white'),
        border: selected ? '2px solid #3498db' : `1px solid ${isDarkMode ? '#2c3e50' : '#e1e8ed'}`,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        color: isDarkMode ? '#ecf0f1' : '#333',
      }}
    >
      {isEditMode && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px 10px',
          backgroundColor: isDarkMode ? '#2c3e50' : '#f8f9fa',
          borderBottom: `1px solid ${isDarkMode ? '#34495e' : '#e1e8ed'}`,
          height: '30px',
        }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{title}</h3>
          <IconButton onClick={handleMenuOpen} size="small" style={{ padding: '2px', color: isDarkMode ? '#ecf0f1' : '#333' }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                backgroundColor: isDarkMode ? '#34495e' : 'white',
                color: isDarkMode ? '#ecf0f1' : '#333',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose} style={{ fontSize: '12px' }}>Option 1</MenuItem>
            <MenuItem onClick={handleMenuClose} style={{ fontSize: '12px' }}>Option 2</MenuItem>
            <MenuItem onClick={handleMenuClose} style={{ fontSize: '12px' }}>Option 3</MenuItem>
          </Menu>
        </div>
      )}
      <div style={{
        flex: 1,
        padding: '10px',
        overflow: 'auto',
      }}>
        {React.cloneElement(children, { style: { height: '100%', width: '100%' } })}
      </div>
      {selected && isResizeEnabled && (
        <div
          style={{
            position: 'absolute',
            right: '0',
            bottom: '0',
            width: '16px',
            height: '16px',
            cursor: 'se-resize',
            background: `linear-gradient(135deg, transparent 50%, ${isDarkMode ? '#3498db' : '#3498db'} 50%)`,
            zIndex: 10,
          }}
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
};

export default ResizableController;