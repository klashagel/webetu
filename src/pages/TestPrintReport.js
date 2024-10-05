import React, { useEffect, useState } from 'react';
import { useConfigContext } from '../contexts/ConfigContext';
import '../styles/TestPrintReport.css';

const TestPrintReport = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { restUrl } = useConfigContext();

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
        <title>Print Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          .success { color: green; }
          .failure { color: red; }
          .measurement-section { page-break-inside: avoid; page-break-after: always; }
          .measurement-section:last-child { page-break-after: avoid; }
          .measurement-grid { display: block; }
          @media print {
            body { padding: 0; }
            @page { margin: 2cm; }
          }
        </style>
      </head>
      <body>
        <h1>Test Measurement Report</h1>
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
      <button onClick={handlePrint} className="print-button">Print Report</button>
      <div className="report-preview">
        <h1>Test Measurement Report (Preview)</h1>
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
                        {dataValue.success ? '✓' : '✗'}
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

export default TestPrintReport;