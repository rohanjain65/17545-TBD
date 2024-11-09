// HWSetControl.js
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useHWSets } from '../context/HWSetContext';

const HWSetControl = ({ hwsetName, projectID, projectName }) => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");
  const { hwSets, updateHWSet } = useHWSets();

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, projectID, hwsetName, quantity }),
      });
      const data = await response.json();
      
      if (data.success) {
        updateHWSet(hwsetName, 'checkout', quantity, projectID);
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Error processing checkout");
    }
  };

  const handleCheckin = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, projectID, hwsetName, quantity }),
      });
      const data = await response.json();
      
      if (data.success) {
        updateHWSet(hwsetName, 'checkin', quantity, projectID);
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Error processing checkin");
    }
  };

  const currentHWSet = hwSets[hwsetName];
  const checkedOut = currentHWSet.checkedOutByProject[projectID] || 0;
  const available = currentHWSet.available;
  const total = currentHWSet.total;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body2">
        {hwsetName} ({available}/{total})
      </Typography>
      <Typography variant="caption">
        Checked out: {checkedOut}
      </Typography>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => {
          const value = Math.max(0, parseInt(e.target.value) || 0);
          setQuantity(value);
        }}
        style={{ width: "80px", marginBottom: "8px", marginTop: "8px" }}
        inputProps={{ min: 0, max: available }}
      />
      <div>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={handleCheckout}
          style={{ marginRight: "8px" }}
          disabled={quantity === 0 || quantity > available}
        >
          OUT
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={handleCheckin}
          disabled={quantity === 0 || quantity > checkedOut}
        >
          IN
        </Button>
      </div>
      {message && <Typography variant="body2" color="error">{message}</Typography>}
    </div>
  );
};

export default HWSetControl;