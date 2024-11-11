// HWSetControl.js
import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useHWSets } from '../context/HWSetContext';

const HWSetControl = ({ hwsetName, projectID, hwcheckedout, callback }) => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");
  const { availableQty1, availableQty2, updateHWSetData } = useHWSets();

  useEffect(() => {
    // Clear the message after 5 seconds
    const timer = message ? setTimeout(() => setMessage(""), 3500) : null;
    
    // Clear timeout if component unmounts
    return () => clearTimeout(timer);
  }, [message]);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, projectID, hwsetName, quantity }),
      });
      const data = await response.json();
      
      if (data.success) {
        setQuantity(0);
        updateHWSetData();
        callback();
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
        setQuantity(0);
        updateHWSetData();
        callback();
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Error processing checkin");
    }
  };

  const total = 100;
  const availableQty = hwsetName === 'HWSet1' ? availableQty1 : availableQty2;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body2">
        {hwsetName} ({availableQty}/{total})
      </Typography>
      <Typography variant="caption">
        Checked out: {hwcheckedout}
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
        // inputProps={{ min: 0, max: available }}
      />
      <div>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={handleCheckout}
          style={{ marginRight: "8px" }}
          disabled={quantity === 0 || quantity > availableQty}
        >
          OUT
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={handleCheckin}
          disabled={quantity === 0 || quantity > hwcheckedout}
        >
          IN
        </Button>
      </div>
      {message && (
      <Typography 
        variant="body2" 
        color="error" 
        style={{
          maxWidth: "130px", // Set a fixed width
          textAlign: "center", // Center the text
          wordWrap: "break-word", // Wrap text if it's long
          minHeight: "24px", // Reserve space for the message
          marginTop: "8px" // Add some space above
        }}
      >
        {message}
      </Typography>
    )}
    </div>
  );
};

export default HWSetControl;