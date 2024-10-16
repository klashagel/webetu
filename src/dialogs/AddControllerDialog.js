import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddControllerDialog = ({ open, onClose, onAdd }) => {
  const [ip, setIp] = useState('');
  const [name, setName] = useState('');

  const handleAdd = () => {
    onAdd({ ip, name });
    setIp('');
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Controller</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="IP Address"
          type="text"
          fullWidth
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Controller Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddControllerDialog;