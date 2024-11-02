// src/components/ProjectsView.js

import React, { useState } from "react";
import Projects from "./Projects";
import NewProjectModal from "./NewProjectModal";
import "./ProjectsView.css";

function ProjectsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="projects-view">
      <h1>Projects</h1>
      <div className="button-group">
        <button onClick={handleOpenModal}>Create Project</button>
        <button>Join Project</button>
      </div>
      <div className="content-area">
        <Projects />
      </div>
      
      <NewProjectModal 
        open={isModalOpen} 
        handleClose={handleCloseModal} 
      />
    </div>
  );
}

export default ProjectsView;
