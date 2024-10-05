import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataProvider';
import '../styles/DataConsumer.css';

const DataConsumer = ({ node }) => {
  const context = useContext(DataContext);

  if (!context) {
    return <div>Context is not available</div>;
  }

  const { data, error } = context;

  if (error) return <div>Error: {error.message}</div>;

  // Display the specific node passed as a prop
  const nodeValue = data ? data[node] : 'No data available';

  return (
    <div className="data-consumer">
      <h3>{node}</h3>
      <p>{nodeValue}</p>
    </div>
  );
};

export default DataConsumer;
