// src/components/ProjectsView.js

import React, { useState } from "react";
import Projects from "./Projects";
import NewProjectModal from "./NewProjectModal";
import JoinProjectModal from "./JoinProjectModal";  // Import the new modal
import "./ProjectsView.css";

function ProjectsView() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenJoinModal = () => setIsJoinModalOpen(true);
  const handleCloseJoinModal = () => setIsJoinModalOpen(false);

  return (
    <div className="projects-view">
      <h1>Projects</h1>
      <div className="button-group">
        <button onClick={handleOpenCreateModal}>Create Project</button>
        <button onClick={handleOpenJoinModal}>Join Project</button>  {/* Open Join Modal */}
      </div>
      <div className="content-area">
        <Projects />
      </div>
      
      <NewProjectModal 
        open={isCreateModalOpen} 
        handleClose={handleCloseCreateModal} 
      />
      <JoinProjectModal 
        open={isJoinModalOpen} 
        handleClose={handleCloseJoinModal} 
      />  {/* Join Project Modal */}
    </div>
  );
}

export default ProjectsView;
