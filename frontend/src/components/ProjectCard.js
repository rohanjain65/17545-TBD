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

    </Box>
  );
};

export default ProjectCard;
