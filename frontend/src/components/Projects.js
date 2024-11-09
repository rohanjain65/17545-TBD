// src/components/Projects.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import { HWSetProvider } from '../context/HWSetContext';

const Projects = () => {
  // Example project data
  const username = localStorage.getItem('username');
  const [message, setMessage] = useState("");
  // Get list of projects from the /projects endpoint
  const [projectList, setProjectList] = React.useState([]);
  const loadProjects = async () => {
    const response = await fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if(data.success){
      setProjectList(data.projects);
    }
    else{
      setMessage(data.message);
    }
  };

  // Call loadProjects to fill projectList
  React.useEffect(() => {
    loadProjects();
  }, []);

  // Render the list of projects
  return (
    <HWSetProvider>
      <Box sx={{ padding: 2 }}>
        {projectList.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </Box>
    </HWSetProvider>
  );
};

export default Projects;
