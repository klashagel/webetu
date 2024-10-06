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
  const [panelSizes, setPanelSizes] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [showUnknown, setShowUnknown] = useState(true);
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
    navigate(`/epic4/controller/${ip}`); // Updated this line
  }, [navigate]);

  const handleDoubleClickUnknown = useCallback((ip) => {
    navigate(`/unknown/manual/${ip}`);
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

  const toggleShowUnknown = () => {
    setShowUnknown(!showUnknown);
    handleMenuClose();
  };

  const renderControllerPanel = (ip, index) => {
    const item = controllerData.find(data => data.ip === ip);
    if (!item) return null;
    if (!showUnknown && item.ctrlType === 'UNKNOWN') return null;

    const Panel = item.ctrlType === 'UNKNOWN' ? ControllerPanelUnknown : ControllerPanelEpic4;
    const size = panelSizes[item.ip] || { width: 300, height: 200 };

    return (
      <div
        key={item.ip}
        className="p-2"
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
          isEditMode={isEditMode}
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
    return <p className="text-red-500 p-4">Error: {error.message}</p>;
  }

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex justify-between items-start p-2">
        <div className="flex-grow flex flex-wrap justify-start">
          {controllerOrder.map((ip, index) => renderControllerPanel(ip, index))}
        </div>
        <div className="flex-shrink-0 ml-2">
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
            <MenuItem onClick={toggleShowUnknown}>
              {showUnknown ? 'Hide Unknown Controllers' : 'Show Unknown Controllers'}
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Etu;