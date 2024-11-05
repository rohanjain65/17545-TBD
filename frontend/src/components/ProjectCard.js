// src/components/ProjectCard.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import HWSetControl from './HWSetControl'; // Import the child component

const ProjectCard = ({ project }) => {

  // Example HwSet data
  const HWSetList = [
    "HWSet1", "HWSet2"
  ];
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: 1, 
      marginBottom: 1, 
      width: '100%' 
    }}>
      {/* Project Name */}
      <Typography variant="subtitle1" sx={{ width: '200px' }}>{project.name}</Typography>
      
      {/* Authorized Users */}
      <Box sx={{ width: '400px' }}>
        <Typography variant="body2">Authorized Users:</Typography>
        <Typography variant="body2">
          {project.authorizedUsers.join(', ')}
        </Typography>
      </Box>

      <div className="hwset-list">
        {HWSetList.map((hwsetName) => (
          <HWSetControl key={hwsetName} hwsetName={hwsetName} projectID={"4L2uFn"} />
        ))}
      </div>

      {/* Leave Project Button */}
      <div className='leaveContainer'>
        <Button variant="contained" color="error" size="small" className='leave-button'>
          Leave
        </Button>
      </div>
    </Box>
  );
};

export default ProjectCard;
