// src/components/Console.js

import React, { useState, useRef, useEffect } from 'react';
import '../styles/Console.css';

const Console = ({ height }) => {
  const [lines, setLines] = useState(['Welcome to the React Console!']);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever lines change
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    }
  };

  const processCommand = (command) => {
    // Add the command to the lines
    setLines((prevLines) => [...prevLines, `> ${command}`]);

    // Simple example commands
    switch (command.toLowerCase()) {
      case 'clear':
        setLines([]);
        break;
      case 'help':
        setLines((prevLines) => [...prevLines, 'Available commands: clear, help']);
        break;
      default:
        setLines((prevLines) => [...prevLines, `Unknown command: ${command}`]);
    }
  };

  return (
    <div className="console-container" style={{ height }}>
      <div className="console-output">
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div ref={endRef} />
      </div>
      <input
        type="text"
        className="console-input"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
};

export default Console;
