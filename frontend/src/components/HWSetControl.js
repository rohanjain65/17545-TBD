// src/components/HWSetControl.js
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const HWSetControl = ({ hwsetName, projectID }) => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  const handleCheckout = async () => {
    const response = await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, projectID, hwsetName, quantity }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  const handleCheckin = async () => {
    const response = await fetch("http://localhost:5000/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, projectID, hwsetName, quantity }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body2">{hwsetName} (100/100)</Typography>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        inputProps={{ min: 0 }}
        style={{ width: "60px", marginBottom: "8px" }}
      />
      <div>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={handleCheckout}
          style={{ marginRight: "8px" }}
        >
          OUT
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={handleCheckin}
        >
          IN
        </Button>
      </div>
      {message && <Typography variant="body2" color="error">{message}</Typography>}
    </div>
  );
};

export default HWSetControl;