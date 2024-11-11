// ProjectCard.js
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import HWSetControl from './HWSetControl';

const ProjectCard = ({ project }) => {
  const HWSet1 = "HWSet1";
  const HWSet2 = "HWSet2";
  const [checkedOut1, setCheckedOut1] = useState(0);
  const [checkedOut2, setCheckedOut2] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshCallback = () => {
    setRefreshTrigger(refreshTrigger + 1);
  };

  // Get individual project details with /project_details API
  const getProjectDetails = async (projectID) => {
    try {
      const response = await fetch("http://localhost:5000/project_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectID }),
      });
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log("Error getting project details");
    }
  };

  React.useEffect(() => {
    getProjectDetails(project.projectID).then((data) => {
      setCheckedOut1(data.project.checkedOutHW1);
      setCheckedOut2(data.project.checkedOutHW2);
    });
  }, [refreshTrigger]);

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
        <HWSetControl 
            hwsetName={HWSet1} 
            projectID={project.projectID}
            hwcheckedout={checkedOut1}
            callback={refreshCallback}
        />
        <HWSetControl 
          hwsetName={HWSet2} 
          projectID={project.projectID}
          hwcheckedout={checkedOut2}
          callback={refreshCallback}
        />
      </div>

    </Box>
  );
};

export default ProjectCard;
