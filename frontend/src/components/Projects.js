// components/Projects.js
import React from 'react';
import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import { HWSetProvider } from '../context/HWSetContext';

const Projects = () => {
  const projectList = [
    { name: 'Project A', authorizedUsers: ['Alice', 'Bob', 'Charlie'] },
    { name: 'Project B', authorizedUsers: ['David', 'Eve', 'Frank'] },
    { name: 'Project C', authorizedUsers: ['Grace', 'Heidi', 'Ivan'] },
  ];

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