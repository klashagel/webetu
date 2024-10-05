import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ConfigEditor = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch configuration data from the server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) throw new Error('Failed to fetch config');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  // Save the updated configuration
  const handleSave = async () => {
    try {
      const response = await fetch('/api/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error('Failed to save config');
      alert('Configuration saved successfully');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Configuration Editor</Typography>
      <form noValidate autoComplete="off">
        {config && Object.keys(config).map((key) => (
          <TextField
            key={key}
            label={key}
            name={key}
            value={config[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: '20px' }}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ConfigEditor;
