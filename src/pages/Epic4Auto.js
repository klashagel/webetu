import React, { useState, useEffect, useRef, useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketProvider';
import { useConfigContext } from '../contexts/ConfigContext';
import { EVENT_ID_JOB_STATUS_UPDATE } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Menu, MenuItem,TextField } from '@mui/material';
import DialogSelectLuaFile from '../components/DialogSelectLuaFile';
import TextInputDialog from '../components/TextInputDialog';
import { useParams, useNavigate } from 'react-router-dom';
import ModbusDigitalButton from '../components/ModbusDigitalButton';

// Helper function to colorize text based on specific patterns
const colorizeText = (text) => {
    return text
        .replace(/(success)/gi, '<span style="color: green;">$1</span>')
        .replace(/(error)/gi, '<span style="color: red;">$1</span>')
        .replace(/(warning)/gi, '<span style="color: orange;">$1</span>');
};

const Epic4Auto = () => {
    const [runMessages, setRunMessages] = useState('');
    const [dividerPosition, setDividerPosition] = useState(50);
    const [isRunning, setIsRunning] = useState(false);
    const { restUrl } = useConfigContext();
    const { messages } = useContext(WebSocketContext);
    const processedMessageIdsRef = useRef(new Set());
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const outputRef = useRef(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const { ip } = useParams();

    const [anchorElFile, setAnchorElFile] = useState(null);
    const [anchorElCode, setAnchorElCode] = useState(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [isTextBoxDialogOpen, setIsTextBoxDialogOpen] = useState(false);
    const [submittedText, setSubmittedText] = useState('');
    const [frikabnr, setFrikabnr] = useState(() => localStorage.getItem('frikabnr') || '');
    const [macaddr, setMacAddr] = useState(() => localStorage.getItem('macaddr') || '');
    const [epic4current, setEpic4Current] = useState(() => localStorage.getItem('epic4current') || '');
    const [scrA, setScrA] = useState(() => localStorage.getItem('scrA') === 'true');
    const [scrB, setScrB] = useState(() => localStorage.getItem('scrB') === 'true');
    

    const initialRunParams = {
        ipaddress: "192.168.1.37",
    };

    const [runParams, setRunParams] = useState(initialRunParams);

    const handleTextSubmit = (text) => {
        setSubmittedText(text);
        setSelectedItem(text);
        console.log('Submitted Text:', text);
    };

    useEffect(() => {
        const savedSelectedItem = localStorage.getItem('selectedItem');
        if (savedSelectedItem) {
            setSelectedItem(savedSelectedItem);
        }
    }, []);

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

    // Define the matrix of parameters for the buttons
    const buttonMatrix = [
        { label: 'All', param: 'allTest.lua' },
        { label: 'Digital inputs', param: 'runDigitalInputTest.lua' },
        { label: 'Aux1', param: 'runAux1Test.lua' },
        { label: 'Primary current', param: 'runPrimarycurrentTest.lua' },
        { label: 'Primary voltage', param: 'runPrimaryvoltagetest.lua' },
        { label: 'Relay outputs', param: 'runRelayoutputtest.lua' },
        { label: 'Realays', param: 'runRelaytest.lua' },
        { label: 'Secondary current', param: 'runSecondarycurrenttest.lua' },
        { label: 'Secondary voltage', param: 'runSecondaryvoltagetest.lua' },
        { label: 'SCR', param: 'runScrTest.lua' },
        { label: 'Testing', param: 'test.lua' },
    ];

    // Modify handleRun to include the IP parameter
    const handleRun = async (param) => {
      
        console.log('Running Lua script:', param, 'with IP:', ip || runParams.ipaddress);

        try {
            const response = await fetch(`${restUrl}/lua/run/${param}`, {
                method: 'PUT', // Changed to POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ipaddress: ip 
                }),
            });

            if (response.ok) {
                toast.success('Script executed successfully!');
                setIsRunning(true);
            } else {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error making API request:', error);
            toast.error('Error executing Lua script.');
        }
    };

    const handleCancel = async () => {
        handleCloseCodeMenu();
        try {
            const response = await fetch(`${restUrl}/lua/cancel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Lua script canceled successfully!');
                setIsRunning(false);
            } else {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error making API request:', error);
            toast.error('Error canceling Lua script.');
        }
    };

    const handleClearRunMessages = () => {
        handleCloseCodeMenu();
        setRunMessages('');
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const navigate = useNavigate();

    const handleReportOpen = () => {
        navigate('/FatReport', { 
            state: { 
                frikabnr: frikabnr, 
                macaddr: macaddr,
                epic4current: epic4current, // Add this line
                scrA: scrA,
                scrB: scrB
            } 
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            window.requestAnimationFrame(() => {
                const containerWidth = containerRef.current.offsetWidth;
                const newDividerPosition = (e.clientX / containerWidth) * 100;
                setDividerPosition(Math.min(Math.max(newDividerPosition, 10), 90));
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
        if (!isUserScrolling && outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [runMessages, isUserScrolling]);

    const handleScroll = () => {
        if (outputRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = outputRef.current;
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

    useEffect(() => {
        localStorage.setItem('frikabnr', frikabnr);
    }, [frikabnr]);

    useEffect(() => {
        localStorage.setItem('macaddr', macaddr);
    }, [macaddr]);

    useEffect(() => {
        localStorage.setItem('epic4current', epic4current);
    }, [epic4current]);

    useEffect(() => {
        localStorage.setItem('scrA', scrA);
    }, [scrA]);

    useEffect(() => {
        localStorage.setItem('scrB', scrB);
    }, [scrB]);

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


    const handleOpenFile = () => {
        handleCloseFileMenu();
        setIsDialogOpen(true);
    };

    const handleNewFile = () => {
        handleCloseFileMenu();
        setIsTextBoxDialogOpen(true);
    };

    const handleSaveAs = () => {
        handleCloseFileMenu();
        handleNewFile();
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
     

            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

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
 
            </div>
        
            <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
                <div style={{ flexBasis: `${dividerPosition}%`, minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ 
                        border: '2px solid #ccc', 
                        borderRadius: '8px', 
                        padding: '15px', 
                        marginBottom: '15px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3 style={{ marginTop: '0', marginBottom: '10px' }}>Input Parameters</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <TextField
                                label="Frikabnr"
                                variant="outlined"
                                value={frikabnr}
                                onChange={(e) => setFrikabnr(e.target.value)}
                            />
                            <TextField
                                label="MacAddr"
                                variant="outlined"
                                value={macaddr}
                                onChange={(e) => setMacAddr(e.target.value)}
                            />
                            <TextField
                                label="EPIC4 Current"
                                variant="outlined"
                                value={epic4current}
                                onChange={(e) => setEpic4Current(e.target.value)}
                            />
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={scrA}
                                        onChange={(e) => setScrA(e.target.checked)}
                                    />
                                    ScrA
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={scrB}
                                        onChange={(e) => setScrB(e.target.checked)}
                                    />
                                    ScrB
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="globalButtonRow">
         <ModbusDigitalButton text="TRON" registerPath={['TrOn']} ip={ip} register="CO_16384" />
        <ModbusDigitalButton text="Reset" registerPath={['SUMALARMRESETREV']} ip={ip} register="CO_16384" />
        <ModbusDigitalButton text="TESTMODE" registerPath={['TESTMODE']} ip={ip} register="CO_16394" />
     </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '10px' }}>
                        {buttonMatrix.map((button, index) => (
                            <Button
                                key={index}
                                className="globalButton"
                                variant="contained"
                                onClick={() => handleRun(button.param)}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </div>
       
                </div>
                <div 
                    style={{ 
                        width: '10px', 
                        cursor: 'col-resize', 
                        background: '#ccc',
                        userSelect: 'none'
                    }} 
                    onMouseDown={handleMouseDown}
                ></div>
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
                            overflowY: 'auto',
                        }}
                        dangerouslySetInnerHTML={{ __html: runMessages }}
                    />
                </div>
            </div>
        
            <ToastContainer />
        </div>
    );
};

export default Epic4Auto;