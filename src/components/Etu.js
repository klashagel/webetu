import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider';
import { useNavigate } from 'react-router-dom';
import ControllerPanelEpic4 from './ControllerPanelEpic4';
import ControllerPanelUnknown from './ControllerPanelUnknown';
import DraggableController from './DraggableController';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Etu = () => {
  const { data, error } = useContext(ControllersDataContext);
  const navigate = useNavigate();

  const [controllerData, setControllerData] = useState([]);
  const [controllerOrder, setControllerOrder] = useState([]);
  const [showUnknown, setShowUnknown] = useState(true);
  const [panelSizes, setPanelSizes] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const extractData = useCallback((controllers) => {
    if (!Array.isArray(controllers)) {
      return [];
    }
    return controllers.map(item => ({
      ip: item.Controller.ip,
      lastActive: new Date(item.LASTACTIVE).toLocaleString(),
      selected: false,
      ctrlType: item.CTRLTYPE,
      Controller: item.Controller
    }));
  }, []);

  const mergeDataWithSelection = useCallback((newData, currentData) => {
    const currentDataMap = currentData.reduce((acc, item) => {
      acc[item.ip] = item.selected;
      return acc;
    }, {});

    return newData.map(item => ({
      ...item,
      selected: currentDataMap[item.ip] || false,
    }));
  }, []);

  useEffect(() => {
    if (data) {
      const newData = extractData(data);
      setControllerData(prevData => {
        const mergedData = mergeDataWithSelection(newData, prevData);
        setControllerOrder(prevOrder => {
          if (prevOrder.length === 0) {
            return mergedData.map(item => item.ip);
          }
          const newOrder = [...prevOrder];
          mergedData.forEach(item => {
            if (!newOrder.includes(item.ip)) {
              newOrder.push(item.ip);
            }
          });
          return newOrder;
        });
        return mergedData;
      });
      setPanelSizes(prevSizes => {
        const newSizes = { ...prevSizes };
        newData.forEach(item => {
          if (!newSizes[item.ip]) {
            newSizes[item.ip] = { width: 300, height: 200 };
          }
        });
        return newSizes;
      });
    }
  }, [data, extractData, mergeDataWithSelection]);

  const handleSelect = useCallback((index) => {
    setControllerData(prevData => prevData.map((item, i) => ({
      ...item,
      selected: i === index,
    })));
  }, []);

  const handleDoubleClickEpic4 = useCallback((ip) => {
    navigate(`/Epic4Main/${ip}`);
  }, [navigate]);

  const handleDoubleClickUnknown = useCallback((ip) => {
    navigate(`/UnknownManual/${ip}`);
  }, [navigate]);

  const handleResize = useCallback((ip, newSize) => {
    if (isEditMode) {
      setPanelSizes(prev => ({
        ...prev,
        [ip]: newSize
      }));
    }
  }, [isEditMode]);

  const handleDragStart = (index) => {
    if (isEditMode) {
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (index) => {
    // This function can be left empty or removed if not needed
  };

  const handleDragLeave = () => {
    // This function can be left empty or removed if not needed
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      setControllerOrder(prevOrder => {
        const newOrder = [...prevOrder];
        const [removed] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, removed);
        return newOrder;
      });
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    handleMenuClose();
  };

  const renderControllerPanel = (ip, index) => {
    const item = controllerData.find(data => data.ip === ip);
    if (!item) return null;

    const Panel = item.ctrlType === 'UNKNOWN' ? ControllerPanelUnknown : ControllerPanelEpic4;
    const size = panelSizes[item.ip] || { width: 300, height: 200 };

    return (
      <div
        key={item.ip}
        onDragOver={(e) => {
          e.preventDefault();
          if (isEditMode) handleDragOver(index);
        }}
        onDrop={() => {
          if (isEditMode) handleDrop(index);
        }}
      >
        <DraggableController
          initialSize={size}
          onResize={(newSize) => handleResize(item.ip, newSize)}
          selected={item.selected}
          onDragStart={() => handleDragStart(index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          index={index}
          isResizeEnabled={isEditMode}
          isDragDropEnabled={isEditMode}
          isEditMode={isEditMode}  // Add this line
          title={`Controller ${item.ip}`}
        >
          <Panel
            item={item}
            onSelect={() => handleSelect(controllerData.findIndex(data => data.ip === item.ip))}
            onDoubleClick={() => item.ctrlType === 'UNKNOWN' ? handleDoubleClickUnknown(item.ip) : handleDoubleClickEpic4(item.ip)}
            selected={item.selected}
          />
        </DraggableController>
      </div>
    );
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ 
      position: 'relative',  // Add this
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      overflow: 'auto'
    }}>
      <div style={{
        position: 'absolute',  // Change this
        top: '10px',           // Add this
        right: '10px',         // Add this
        zIndex: 1000,          // Add this
      }}>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={toggleEditMode}>
            {isEditMode ? 'Lock Layout' : 'Edit Layout'}
          </MenuItem>
        </Menu>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '10px',
      }}>
        {controllerOrder
          .filter(ip => {
            const item = controllerData.find(data => data.ip === ip);
            return item && (showUnknown || item.ctrlType !== 'UNKNOWN');
          })
          .map((ip, index) => renderControllerPanel(ip, index))}
      </div>
    </div>
  );
};

export default Etu;