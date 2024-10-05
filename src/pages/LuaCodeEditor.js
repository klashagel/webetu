import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import { WebSocketContext } from '../contexts/WebSocketProvider';
import { useFileData } from '../hooks/FileDataProvider';
import { useConfigContext } from '../contexts/ConfigContext';
import { EVENT_ID_JOB_STATUS_UPDATE } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Menu, MenuItem } from '@mui/material';
import DialogSelectLuaFile from '../components/DialogSelectLuaFile';
import TextInputDialog from '../components/TextInputDialog';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory


// Helper function to colorize text based on specific patterns
const colorizeText = (text) => {
    return text
        .replace(/(success)/gi, '<span style="color: green;">$1</span>')
        .replace(/(error)/gi, '<span style="color: red;">$1</span>')
        .replace(/(warning)/gi, '<span style="color: orange;">$1</span>');
};

const LOCAL_STORAGE_KEY = 'luaCodeEditorCode';
const DEFAULT_CODE = `-- This is the default Lua code\nprint("Hello, World!")`;

const LuaCodeEditor = () => {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [currentFileId, setCurrentFileId] = useState(1);
    const [runMessages, setRunMessages] = useState('');
    const [dividerPosition, setDividerPosition] = useState(50);
    const [isRunning, setIsRunning] = useState(false);
    const { fetchFile, saveFile } = useFileData();
    const { restUrl } = useConfigContext();
    const { messages } = useContext(WebSocketContext);
    const editorRef = useRef(null);
    const processedMessageIdsRef = useRef(new Set());
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const outputRef = useRef(null); // Reference for the output area
    const [isUserScrolling, setIsUserScrolling] = useState(false); // Track user scrolling state


    const [anchorElFile, setAnchorElFile] = useState(null);
    const [anchorElCode, setAnchorElCode] = useState(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [isTextBoxDialogOpen, setIsTextBoxDialogOpen] = useState(false);
    const [submittedText, setSubmittedText] = useState('');
 

    const initialRunParams = {
        ipaddress: "192.168.1.37",
    };

    const [runParams, setRunParams] = useState(initialRunParams);

    const handleTextSubmit = (text) => {
        setSubmittedText(text);
        setSelectedItem(text);
        setCode(''); // Clear the Monaco Editor content
        console.log('Submitted Text:', text);
    };

    useEffect(() => {
        const savedSelectedItem = localStorage.getItem('selectedItem');
        if (savedSelectedItem) {
            setSelectedItem(savedSelectedItem);
            loadCode(savedSelectedItem); // Optionally, load the code for the saved item
        }
    }, []);

    useEffect(() => {
        const savedCode = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${currentFileId}`);
        if (savedCode) {
            setCode(savedCode);
        } else {
            loadCode(currentFileId);
        }
    }, [currentFileId]);

    const loadCode = async (fileName) => {
        try {
            const fileCode = await fetchFile(fileName);
            setCode(fileCode || DEFAULT_CODE);
        } catch (error) {
            console.error('Error loading file:', error);
            setCode(DEFAULT_CODE);
        }
    };

    useEffect(() => {
        if (code !== '') {
            localStorage.setItem(`${LOCAL_STORAGE_KEY}_${currentFileId}`, code);
        }
    }, [code, currentFileId]);

    const handleSave = async () => {
        try {
            await saveFile(selectedItem, code);
            toast.success(`File ${selectedItem} saved successfully!`);
        } catch (error) {
            console.error('Error saving file:', error);
            toast.error('Error saving file.');
        }
    };

    const handleLoad = async () => {
        const fileId = parseInt(selectedItem, 10);
        if (isNaN(fileId)) {
            toast.error('Invalid file ID.');
            return;
        }

        setCurrentFileId(fileId);
        loadCode(fileId);
    };

    const updateRunMessages = (newMessage) => {
        setRunMessages((prevMessages) => prevMessages + '<br>' + colorizeText(newMessage));
    };

    useEffect(() => {
        messages.forEach((message) => {
            if (message.eventid === EVENT_ID_JOB_STATUS_UPDATE) {
                if (!processedMessageIdsRef.current.has(message.messageid)) {
                    processedMessageIdsRef.current.add(message.messageid);
                    updateRunMessages(message.data);
                }
            }
        });
    }, [messages]);

    const handleRun = async () => {
        handleCloseCodeMenu(); // Close the menu
        console.log('Running Lua script:', selectedItem);
        if (!selectedItem) {
            toast.error('No file selected.');
            return;
        }

        try {
            const response = await fetch(`${restUrl}/lua/run/${selectedItem}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(runParams), // Assuming the body is required
            });

            if (response.ok) {
                toast.success('Lua script executed successfully!');
                setIsRunning(true); // Update button state
            } else {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error making API request:', error);
            toast.error('Error executing Lua script.');
        }
    };

    const handleCancel = async () => {
        handleCloseCodeMenu(); // Close the menu
        try {
            const response = await fetch(`${restUrl}/lua/cancel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Lua script canceled successfully!');
                setIsRunning(false); // Update button state
            } else {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error making API request:', error);
            toast.error('Error canceling Lua script.');
        }
    };

    const handleClearRunMessages = () => {
        handleCloseCodeMenu(); // Close the menu
        setRunMessages(''); // Clear the run messages
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleReportOpen = () => {
        // Navigate to the FatReport page
        navigate('/FatReport'); // Use navigate for navigation
    };

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            window.requestAnimationFrame(() => {
                const containerWidth = containerRef.current.offsetWidth;
                const newDividerPosition = (e.clientX / containerWidth) * 100;
                setDividerPosition(Math.min(Math.max(newDividerPosition, 10), 90));

                if (editorRef.current) {
                    editorRef.current.layout(); // Manually trigger the layout adjustment
                }
            });
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.layout(); // Trigger layout on mount
        }
    }, [dividerPosition]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault(); // Prevent the default save dialog
                if (editorRef.current) {
                    handleSave();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [code, currentFileId]);
    useEffect(() => {
        if (!isUserScrolling && outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight; // Scroll to the bottom
        }
    }, [runMessages, isUserScrolling]); // Dependency array includes runMessages and scrolling state

    // Scroll event handlers
    const handleScroll = () => {
        if (outputRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = outputRef.current;
            // Check if user has scrolled away from the bottom
            setIsUserScrolling(scrollTop + clientHeight < scrollHeight);
        }
    };

    useEffect(() => {
        const currentRef = outputRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleEditorMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.layout(); // Trigger layout on editor mount
    };

    const handleClickFileMenu = (event) => {
        setAnchorElFile(event.currentTarget);
    };

    const handleCloseFileMenu = () => {
        setAnchorElFile(null);
    };

    const handleClickCodeMenu = (event) => {
        setAnchorElCode(event.currentTarget);
    };

    const handleCloseCodeMenu = () => {
        setAnchorElCode(null);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleItemSelected = (item) => {
        setSelectedItem(item);
        localStorage.setItem('selectedItem', item); // Save to localStorage
        loadCode(item);
        console.log('Selected Item:', item);
    };

    const handleOpenFile = () => {
        handleCloseFileMenu(); // Close the menu
        setIsDialogOpen(true); // Open the file selection dialog
    };

    const handleNewFile = () => {
        handleCloseFileMenu(); // Close the menu
        setIsTextBoxDialogOpen(true); // Open the text input dialog
    };

    const handleSaveFile = () => {
        handleCloseFileMenu(); // Close the menu
        handleSave(); // Save the current file
    };

    const handleSaveAs = () => {
        handleCloseFileMenu(); // Close the menu
        handleNewFile(); // Open the text input dialog
    };

    return (
        <div className="app-content" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <div>
                <TextInputDialog
                    isOpen={isTextBoxDialogOpen}
                    onClose={() => setIsTextBoxDialogOpen(false)}
                    title="New File"
                    onTextSubmit={handleTextSubmit}
                />
                {submittedText && <p>Submitted Text: {submittedText}</p>}
            </div>
        
            <div style={{ padding: '10px', fontWeight: 'bold' }}>
                <DialogSelectLuaFile
                    isOpen={isDialogOpen}
                    onClose={handleDialogClose}
                    title="Select an Item"
                    onItemSelected={handleItemSelected}
                />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                    <Button
                        aria-controls="file-menu"
                        aria-haspopup="true"
                        onClick={handleClickFileMenu}
                    >
                        File
                    </Button>
                    <Menu
                        id="file-menu"
                        anchorEl={anchorElFile}
                        keepMounted
                        open={Boolean(anchorElFile)}
                        onClose={handleCloseFileMenu}
                    >
                        <MenuItem onClick={handleOpenFile}>Open..</MenuItem>
                        <MenuItem onClick={handleNewFile}>New...</MenuItem>
                        <MenuItem onClick={handleSaveFile}>Save</MenuItem>
                        <MenuItem onClick={handleSaveAs}>Save as..</MenuItem>
                    </Menu>
                </div>
                <div>
                    <Button
                        aria-controls="code-menu"
                        aria-haspopup="true"
                        onClick={handleClickCodeMenu}
                    >
                        Code
                    </Button>
                    <Menu
                        id="code-menu"
                        anchorEl={anchorElCode}
                        keepMounted
                        open={Boolean(anchorElCode)}
                        onClose={handleCloseCodeMenu}
                    >
                        <MenuItem onClick={handleRun}>Run</MenuItem>
                        <MenuItem onClick={handleCancel}>Cancel</MenuItem>
                        <MenuItem onClick={handleClearRunMessages}>Clear console</MenuItem>
                    </Menu>
                </div>
                <div>
                <Button
                        aria-controls="file-menu"
                        aria-haspopup="true"
                        onClick={handleReportOpen}
                    >
                        Report
                    </Button>
                </div>
                {selectedItem && (
                    <p style={{ margin: 0, marginLeft: 'auto' }}>Selected Item: {selectedItem}</p>
                )}
            </div>
        
            <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
                <div style={{ flexBasis: `${dividerPosition}%`, minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                    <MonacoEditor
                        zIndex={0}
                        height="90%"
                        language="lua"
                        value={code}
                        onChange={setCode}
                        options={{
                            readOnly: false,
                            minimap: { enabled: false },
                            lineNumbers: "on",
                            folding: false,
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: false,
                        }}
                        onMount={handleEditorMount}
                    />
                </div>
                <div style={{ flexBasis: `${100 - dividerPosition}%`, minWidth: '300px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                    <div
                     ref={outputRef} 
                        style={{
                            zIndex: 1,
                            width: '100%',
                            height: '90%',
                            backgroundColor: '#1e1e1e',
                            color: 'white',
                            border: 'none',
                            padding: '10px',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            whiteSpace: 'pre-wrap',
                            overflowY: 'auto', // Handle overflow with scrollbar
                        }}
                        dangerouslySetInnerHTML={{ __html: runMessages }}
                    />
                </div>
            </div>
        
            <ToastContainer />
        </div>
    );
};

export default LuaCodeEditor;
