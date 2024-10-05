import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; 
import { useConfigContext } from '../contexts/ConfigContext';
import RestApiButton from '../components/RestApiButton';
import { WebSocketContext } from '../contexts/WebSocketProvider';
import MonacoEditor from '@monaco-editor/react';
import { EVENT_ID_CMD_MESSAGE } from '../constants';
import { ControllersDataContext } from '../contexts/ControllersDataProvider';
import "../styles/Epic4Firmware.css";

const Epic4Firmware = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const { ip } = useParams(); 
  const { restUrl } = useConfigContext(); 
  const { data } = useContext(WebSocketContext);
  const { data: controllersData } = useContext(ControllersDataContext);
  const [controllerData, setControllerData] = useState([]);
  const [newItemIp, setNewItemIp] = useState(null); 
  const [selectedIP, setSelectedIP] = useState(null); 
  const [macAddress1, setMacAddress1] = useState(''); 
  const [macAddress2, setMacAddress2] = useState(''); 
  const [comPort, setComPort] = useState('COM3'); 
  const editorRef = useRef(null);

  // Extract Data Function
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

  // Merge Data With Selection
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

  // Handle Controller Data
  useEffect(() => {
    if (controllersData) {
      const newData = extractData(controllersData);
      const mergedData = mergeDataWithSelection(newData, controllerData);

      if (mergedData.length > controllerData.length) {
        const newlyAddedItem = mergedData.find(item => !controllerData.some(ctrl => ctrl.ip === item.ip));
        if (newlyAddedItem) {
          setNewItemIp(newlyAddedItem.ip);

          setTimeout(() => {
            setNewItemIp(null);
          }, 5000);
        }
      }

      setControllerData(mergedData);
    }
  }, [controllersData, extractData, mergeDataWithSelection]);

  // Handle WebSocket Data
  useEffect(() => {
    if (data && data.eventid === EVENT_ID_CMD_MESSAGE) {
      const messageContent = data.data;
      updateEditorContent(messageContent);
    }
  }, [data]);

  // Update Editor Content
  const updateEditorContent = (newContent) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const model = editor.getModel();
      if (model) {
        const currentValue = model.getValue();
        model.setValue(currentValue + '\n' + newContent);
        const lastLine = model.getLineCount();
        editor.revealLineInCenter(lastLine);
      }
    }
  };

  // Clear Editor Content
  const clearEditorContent = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const model = editor.getModel();
      if (model) {
        model.setValue(''); 
      }
    }
  };

  // Handle Firmware Update
  const handleUpdateFirmwareEpic4 = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${restUrl}/etu/updatefirmware`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ip': ip,
          'ctrltype': 'EPIC4',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessage('Update successful');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Controller Selection
  const handleSelectController = (ip) => {
    setSelectedIP(ip); 
    console.log('Selected controller IP:', ip);
  };

  // Compare IP Addresses
  const compareIPs = (ipA, ipB) => {
    const partsA = ipA.split('.').map(Number);
    const partsB = ipB.split('.').map(Number);

    for (let i = 0; i < 4; i++) {
      if (partsA[i] < partsB[i]) return -1;
      if (partsA[i] > partsB[i]) return 1;
    }
    return 0;
  };

  // Sorted Controller Data
  const sortedControllerData = [...controllerData].sort((a, b) => compareIPs(a.ip, b.ip));

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Column */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h1>Controllers List</h1>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {sortedControllerData.map((item) => (
            <li
              key={item.ip}
              onClick={() => handleSelectController(item.ip)}
              className={`${newItemIp === item.ip ? 'blinking' : ''} ${selectedIP === item.ip ? 'selected' : ''}`}
              style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
            >
              <div><strong>{item.ip}</strong></div>
              <div>Last Active: {item.lastActive}</div>
              <div>Type: {item.ctrlType}</div>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Right Column */}
      <div style={{ flex: 2, padding: '20px', overflowY: 'auto' }}>
        <h1>Epic4 Firmware update</h1>
        
        {/* MAC Address Input Fields */}
        <div style={{ marginBottom: '20px' }}>
          <label>MAC Address 1: </label>
          <input
            type="text"
            value={macAddress1}
            onChange={(e) => setMacAddress1(e.target.value)}
            placeholder="Enter MAC Address 1"
            style={{ marginRight: '10px' }}
          />
          <label>MAC Address 2: </label>
          <input
            type="text"
            value={macAddress2}
            onChange={(e) => setMacAddress2(e.target.value)}
            placeholder="Enter MAC Address 2"
          />
        </div>

        {/* COM Port Input Field */}
        <div style={{ marginBottom: '20px' }}>
          <label>COM Port: </label>
          <input
            type="text"
            value={comPort}
            onChange={(e) => setComPort(e.target.value)}
            placeholder="Enter COM Port"
            style={{ marginRight: '10px' }}
          />
        </div>

        <div className="globalButtonRow" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <RestApiButton
              className="globalButton"
              url={`${restUrl}/api/epic4burnimage`}
              method="PUT"
              payload={{
                headers: {
                  'ip': selectedIP,
                },
                body: {  }, 
              }}
              buttonText="Burn image"
              onSuccessMessage="Image burned successfully"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <RestApiButton
              className="globalButton"
              url={`${restUrl}/api/epic4setmac`}
              method="PUT"
              payload={{
                headers: {
                  'ip': selectedIP,
                },
                body: { macAddress1, macAddress2, comPort }, 
              }}
              buttonText="Set mac"
              onSuccessMessage="Mac set successfully"
            />
          </div>
  
          <div style={{ marginBottom: '20px', marginLeft: '10px' }}>
            <RestApiButton
              className="globalButton"
              url={`${restUrl}/api/epic4updatefirmware`}
              method="PUT"
              payload={{
                headers: {
                  'ip': selectedIP,
                },
                body: {  }, 
              }}
              buttonText="Update firmware"
              onSuccessMessage="Firmware updated successfully"
            />
          </div>

          {/* Clear Code Button */}
          <div style={{ marginBottom: '20px' }}>
            <button
              className="globalButton"
              onClick={clearEditorContent}
              style={{ backgroundColor: '#f44336', color: '#fff' }}
            >
              Clear Code
            </button>
          </div>

          {selectedIP && (
            <div style={{ marginLeft: '20px', fontWeight: 'bold', color: '#333' }}>
              Selected IP: {selectedIP}
            </div>
          )}
        </div>
  
        <div style={{ height: 'calc(100vh - 240px)', overflowY: 'auto' }}>
          <MonacoEditor
            height="100%" 
            defaultLanguage="plaintext"
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              lineNumbers: "off",
              folding: false,
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Epic4Firmware;
