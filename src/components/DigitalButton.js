import React, { useState, useEffect } from 'react';

const DigitalButton = React.memo(({ buttonNumber, digitalDataIndex, isActive, onToggle }) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClick = () => {
   
      onToggle();
      setActive(prevActive => !prevActive);
   
  };

  //console.log(`Rendering digital button ${buttonNumber} ${digitalDataIndex} ${isActive} ${isClickable} ${onToggle}`);

  return (
    <button
      className={`toggle-button ${active ? 'active' : ''}`}
      onClick={handleClick}
  
    >
      {buttonNumber}
    </button>
  );
});

export default DigitalButton;
