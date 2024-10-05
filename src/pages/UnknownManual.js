import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; 
import { useConfigContext } from '../contexts/ConfigContext';
import RestApiButton from '../components/RestApiButton';
import { WebSocketContext } from '../contexts/WebSocketProvider';
import MonacoEditor from '@monaco-editor/react';
import { EVENT_ID_CMD_MESSAGE } from '../constants';

const UnknownManual = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const { ip } = useParams(); 
  const { restUrl } = useConfigContext(); 
  const { data } = useContext(WebSocketContext);
  const editorRef = useRef(null);

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

  useEffect(() => {
    if (data && data.eventid === EVENT_ID_CMD_MESSAGE) {
      const messageContent = data.data;
      updateEditorContent(messageContent);
    }
  }, [data]);

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

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Column */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Manual Test for IP: {ip}</h1>
        <button onClick={handleUpdateFirmwareEpic4} disabled={loading}>
          {loading ? <ClipLoader size={24} color={"#3498db"} loading={loading} /> : 'Update Firmware'}
        </button>
        {message && <p>{message}</p>}
        {error && <p>Error: {error}</p>}

        <RestApiButton
          url={`${restUrl}/api/execute`}
          method="PUT"
          payload={{
            headers: {
              'ip': ip,
            },
            body: {}, // Add any additional data you want to send in the body
          }}
          buttonText="Restart Controller"
          onSuccessMessage="Controller restarted successfully"
        />
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
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
  );
};

export default UnknownManual;
