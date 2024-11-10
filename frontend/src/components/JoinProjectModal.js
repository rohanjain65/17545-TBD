// src/components/JoinProjectModal.js
import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const JoinProjectModal = ({ open, handleClose, callback }) => {
  const [projectID, setProjectID] = useState("");
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  const handleJoinProject = async () => {
    const response = await fetch("http://localhost:5000/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, projectID }),
    });
    const data = await response.json();
    setMessage(data.message);
    if (data.success) {
      setProjectID(""); // Clear input field on success
      callback();      // Refresh the project list
    }
  };

  const handleModalClose = () => {
    setMessage(""); // Clear the message when modal is closed
    handleClose();   // Close the modal
  };

  return (
    <Modal 
      open={open} 
      onClose={handleModalClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>Join Existing Project</Typography>
        <TextField
          label="Project ID"
          fullWidth
          variant="outlined"
          value={projectID}
          onChange={(e) => setProjectID(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleJoinProject}
        >
          Join
        </Button>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
};

export default JoinProjectModal;
