// src/components/Projects.js
import React from 'react';
import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';

const Projects = () => {
  // Example project data
  const projectList = [
    { name: 'Project A', authorizedUsers: ['Alice', 'Bob', 'Charlie'] },
    { name: 'Project B', authorizedUsers: ['David', 'Eve', 'Frank'] },
    { name: 'Project C', authorizedUsers: ['Grace', 'Heidi', 'Ivan'] },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      {projectList.map((project, index) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </Box>
  );
};

export default Projects;
