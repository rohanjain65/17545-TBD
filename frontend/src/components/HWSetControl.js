import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const HWSetControl = ({ hwsetName }) => {
  const [available, setAvailable] = useState(100);
  const [input, setInput] = useState(0);

  const handleCheckOut = () => {
    const newAvailable = available - input >= 0 ? available - input : available;
    setAvailable(newAvailable);
  };

  const handleCheckIn = () => {
    const newAvailable = available + input <= 100 ? available + input : available;
    setAvailable(newAvailable);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      {/* HWSet name and availability */}
      <Typography variant="body2">{hwsetName} ({available}/100)</Typography>

      {/* Number Input with label */}
      <TextField
        label={`Quantity`}
        type="number"
        variant="outlined"
        size="small"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        sx={{ width: '80px' }}
      />

      {/* Check out and check in buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" size="small" onClick={handleCheckOut}>Out</Button>
        <Button variant="contained" size="small" color="secondary" onClick={handleCheckIn}>In</Button>
      </Box>
    </Box>
  );
};

export default HWSetControl;
