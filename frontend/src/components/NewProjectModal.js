// src/components/NewProjectModal.js
import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const NewProjectModal = ({ open, handleClose, callback }) => {
  const [projectName, setProjectName] = React.useState("");
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");


  const handleCreateProject = async () => {
    console.log("New Project Created:", projectName);
    const response = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, projectName }),
    });
    const data = await response.json();
    setMessage(data.message);
    setProjectName(""); // Reset input field after submit
    callback(); // Refresh the project list
  };

  const handleModalClose = () => {
    setMessage(""); // Clear the message
    handleClose();   // Call the parent-provided close function
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
        <Typography variant="h6" mb={2}>Create New Project</Typography>
        <TextField
          label="Project Name"
          fullWidth
          variant="outlined"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleCreateProject}
        >
          Submit
        </Button>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
};

export default NewProjectModal;
