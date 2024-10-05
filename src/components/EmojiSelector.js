import React from 'react';

const EmojiSelector = ({ onSelect }) => {
  const emojis = ['👍', '❌', '⚠️', '💥', '😠']; // Add more emojis as needed

  return (
    <div style={{ marginBottom: '10px' }}>
      {emojis.map((emoji, index) => (
        <button 
          key={index} 
          style={{ fontSize: '20px', marginRight: '5px', cursor: 'pointer' }} 
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiSelector;