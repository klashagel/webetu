import React, { useEffect, useState } from 'react';
import { useConfigContext } from '../contexts/ConfigContext';
import '../styles/TestPrintReport.css';
import { useLocation } from 'react-router-dom';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
  </svg>
);

const FatReport = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { restUrl } = useConfigContext();
  const location = useLocation();
  const frikabnr = location.state?.frikabnr || '';
  const macaddr = location.state?.macaddr || '';
  const epic4current = location.state?.epic4current || '';
  const scrA = location.state?.scrA || false;
  const scrB = location.state?.scrB || false;

  // Update this line to format the date as yyyy-mm-dd
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    console.log('Fetching data from:', `${restUrl}/lua/results`);
    fetch(`${restUrl}/lua/results`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonData => {
        console.log('Data loaded:', jsonData);
        setData(jsonData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [restUrl]);

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Compact Print Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 10px; font-size: 12px; }
          h1 { font-size: 18px; margin-bottom: 10px; }
          h2 { font-size: 16px; margin-top: 15px; margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          th, td { border: 1px solid #ddd; padding: 4px; text-align: left; }
          th { background-color: #f4f4f4; }
          .success { color: green; }
          .failure { color: red; }
          .measurement-section { page-break-inside: avoid; }
          .measurement-grid { display: flex; flex-wrap: wrap; }
          .measurement-section { width: 50%; box-sizing: border-box; padding: 0 5px; }
          @media print {
            body { padding: 0; }
            @page { margin: 1cm; }
          }
        </style>
      </head>
      <body>
        <h1>EPIC4 Test Report</h1>
        <p><strong>Date:</strong> ${currentDate}</p>
        ${frikabnr ? `<p><strong>Frikabnr:</strong> ${frikabnr}</p>` : ''}
        ${macaddr ? `<p><strong>MAC Address:</strong> ${macaddr}</p>` : ''}
        ${epic4current ? `<p><strong>EPIC4 Current:</strong> ${epic4current}</p>` : ''}
        <p><strong>ScrA:</strong> ${scrA ? 'Yes' : 'No'}</p>
        <p><strong>ScrB:</strong> ${scrB ? 'Yes' : 'No'}</p>
        
        <div class="measurement-grid">
          ${Object.entries(data).map(([key, measurement]) => `
            <div class="measurement-section">
              <h2>${measurement.name}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(measurement.data).map(([dataKey, dataValue]) => `
                    <tr>
                      <td>${dataKey}</td>
                      <td>${JSON.stringify(dataValue.value)}</td>
                      <td class="${dataValue.success ? 'success' : 'failure'}">
                        ${dataValue.success ? '✓' : '✗'}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  console.log('Rendering data:', data);

  // Use the actual data or fallback to sample data if it's empty
  const displayData = Object.keys(data).length === 0 ? {
    measurement1: {
      name: "Sample Measurement",
      data: {
        key1: { value: "value1", success: true },
        key2: { value: "value2", success: false }
      }
    }
  } : data;

  return (
    <div className="app-content">
      <div className="report-header">
        <h1>EPIC4 Test Report</h1>
        <div className="report-info">
          <p><strong>Date:</strong> {currentDate}</p>
          {frikabnr && <p><strong>Frikabnr:</strong> {frikabnr}</p>}
          {macaddr && <p><strong>MAC Address:</strong> {macaddr}</p>}
          {epic4current && <p><strong>EPIC4 Current:</strong> {epic4current}</p>}
          <p><strong>ScrA:</strong> {scrA ? 'Yes' : 'No'}</p>
          <p><strong>ScrB:</strong> {scrB ? 'Yes' : 'No'}</p>
        </div>
        <button onClick={handlePrint} className="globalButton">Print Report</button>
      </div>
      <div className="report-preview">
        <div className="measurement-grid">
          {Object.entries(displayData).map(([key, measurement]) => (
            <div key={key} className="measurement-section">
              <h3>{measurement.name}</h3>
              <table className="compact-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(measurement.data).map(([dataKey, dataValue]) => (
                    <tr key={dataKey}>
                      <td>{dataKey}</td>
                      <td>{JSON.stringify(dataValue.value)}</td>
                      <td className={dataValue.success ? 'success' : 'failure'}>
                        {dataValue.success ? <CheckIcon /> : <CrossIcon />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FatReport;