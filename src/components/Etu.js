import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ControllersDataContext } from '../contexts/ControllersDataProvider';
import { useNavigate } from 'react-router-dom';
import ControllerPanelEpic4 from './ControllerPanelEpic4';
import ControllerPanelUnknown from './ControllerPanelUnknown';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';

const Etu = () => {
  const { data, error } = useContext(ControllersDataContext);
  const navigate = useNavigate();

  const [controllerData, setControllerData] = useState([]);
  const [showUnknown, setShowUnknown] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [panelSizes, setPanelSizes] = useState({});

  const extractData = useCallback((controllers) => {
    if (!Array.isArray(controllers)) {
      return [];
    }
    return controllers.map(item => ({
      ip: item.Controller.ip,
      lastActive: new Date(item.LASTACTIVE).toLocaleString(),
      selected: false,
      ctrlType: item.CTRLTYPE, // Include CTRLTYPE in the mapped data
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
      setControllerData(prevData => mergeDataWithSelection(newData, prevData));
      // Initialize panel sizes
      const sizes = newData.reduce((acc, item) => {
        acc[item.ip] = { width: 300, height: 200 };
        return acc;
      }, {});
      setPanelSizes(sizes);
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
    setPanelSizes(prev => ({
      ...prev,
      [ip]: newSize
    }));
  }, []);

  const renderControllerPanel = (item) => {
    const Panel = item.ctrlType === 'UNKNOWN' ? ControllerPanelUnknown : ControllerPanelEpic4;
    const size = panelSizes[item.ip] || { width: 300, height: 200 };

    return (
      <Panel
        key={item.ip}
        item={item}
        onSelect={() => handleSelect(controllerData.findIndex(data => data.ip === item.ip))}
        onDoubleClick={() => item.ctrlType === 'UNKNOWN' ? handleDoubleClickUnknown(item.ip) : handleDoubleClickEpic4(item.ip)}
        selected={item.selected}
        onResize={(newSize) => handleResize(item.ip, newSize)}
        size={size}  // Pass the size to the Panel component
      />
    );
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredControllerData = controllerData.filter(item => 
    showUnknown || item.ctrlType !== 'UNKNOWN'
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleUnknown = () => {
    setShowUnknown(prev => !prev);
    handleClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Tooltip title="Menu">
          <IconButton
            aria-controls={Boolean(anchorEl) ? 'menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            color="primary"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: 200, // Set the maximum width of the menu
          },
        }}
      >
        <MenuItem onClick={handleToggleUnknown}>
          <CircleIcon 
            style={{ 
              color: showUnknown ? 'green' : 'gray', 
              marginRight: 8 
            }}
          />
          {showUnknown ? 'Hide UNKNOWN Controllers' : 'Show UNKNOWN Controllers'}
        </MenuItem>
      </Menu>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '20px',
      }}>
        {filteredControllerData.map(renderControllerPanel)}
      </div>
    </div>
  );
};

export default Etu;