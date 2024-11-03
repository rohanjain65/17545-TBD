// components/HWSetControl.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useHWSets } from '../context/HWSetContext';

export const HWSetControl = ({ hwsetName, projectName }) => {
  const [input, setInput] = useState(0);
  const { hwSets, updateHWSet } = useHWSets();
  
  const hwSet = hwSets[hwsetName];
  const checkedOutByThisProject = hwSet.checkedOutByProject[projectName] || 0;

  const handleCheckOut = () => {
    if (input > 0 && input <= hwSet.available) {
      updateHWSet(hwsetName, 'checkout', input, projectName);
      setInput(0);
    }
  };

  const handleCheckIn = () => {
    if (input > 0 && input <= checkedOutByThisProject) {
      updateHWSet(hwsetName, 'checkin', input, projectName);
      setInput(0);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2">
        {hwsetName} (Available: {hwSet.available}/{hwSet.total})
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Checked out: {checkedOutByThisProject}
      </Typography>

      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        size="small"
        value={input}
        onChange={(e) => {
          const value = Math.max(0, parseInt(e.target.value) || 0);
          setInput(value);
        }}
        sx={{ width: '80px' }}
        InputProps={{ inputProps: { min: 0 } }}
      />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          variant="contained" 
          size="small" 
          onClick={handleCheckOut}
          disabled={input <= 0 || input > hwSet.available}
        >
          Check Out
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          color="secondary" 
          onClick={handleCheckIn}
          disabled={input <= 0 || input > checkedOutByThisProject}
        >
          Check In
        </Button>
      </Box>
    </Box>
  );
};

export default HWSetControl;