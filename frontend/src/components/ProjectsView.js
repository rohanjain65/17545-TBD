// src/components/ProjectsView.js

import React from "react";
import Projects from "./Projects";
import "./ProjectsView.css";

function ProjectsView() {
  return (
    <div className="projects-view">
      <h1>Projects</h1>
      <div className="button-group">
        <button>Create Project</button>
        <button>Join Project</button>
      </div>
      <div className="content-area">
        <Projects />
      </div>
    </div>
  );
}

export default ProjectsView;
