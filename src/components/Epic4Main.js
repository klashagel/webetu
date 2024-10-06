import React from 'react';
import { useParams } from 'react-router-dom';

const Epic4Main = () => {
  const { ip } = useParams();
  return (
    <div style={{ padding: '20px' }}>
      <h1>Epic4 Controller Details</h1>
      <p>IP Address: {ip}</p>
      {/* Add more controller details here */}
    </div>
  );
};

export default Epic4Main;