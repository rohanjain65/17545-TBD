// ProjectCard.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import HWSetControl from './HWSetControl';
import { useHWSets } from '../context/HWSetContext';

const ProjectCard = ({ project }) => {
  const { hwSets } = useHWSets();
  const HWSetList = ["HWSet1", "HWSet2"];
  
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
      <Box sx={{ width: '200px' }}>
        <div>
          <Typography variant="subtitle1">{project.projectName}</Typography>
          <Typography variant="subtitle2">Project ID: {project.projectID}</Typography>
        </div>
      </Box>
      
      <Box sx={{ width: '250px' }}>
        <div>
          <Typography variant="body2">Authorized Users:</Typography>
          <Typography variant="body2">
            {project.authorizedUsers.join(', ')}
          </Typography>
        </div>
      </Box>

      <Box sx={{ width: '250px' }}>
        <div>
          <Typography variant="subtitle2">Checked out HW from HWSet1:</Typography>
          <Typography variant="body2" marginBottom="50px">
            {hwSets.HWSet1.checkedOutByProject[project.projectID] || 0}
          </Typography>
          <Typography variant="subtitle2">Checked out HW from HWSet2:</Typography>
          <Typography variant="body2">
            {hwSets.HWSet2.checkedOutByProject[project.projectID] || 0}
          </Typography>
        </div>
      </Box>

      <div className="hwset-list">
        {HWSetList.map((hwsetName) => (
          <HWSetControl 
            key={hwsetName} 
            hwsetName={hwsetName} 
            projectID={project.projectID}
            projectName={project.projectName}
          />
        ))}
      </div>

      <div className='leaveContainer'>
        <Button variant="contained" color="error" size="small" className='leave-button'>
          Leave
        </Button>
      </div>
    </Box>
  );
};

export default ProjectCard;
