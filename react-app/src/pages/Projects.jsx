import React, { useContext } from "react";
import Project from "../components/Project";
import { projectContext } from "../context/ProjectContext";
const Projects = () => {
  const utilities = useContext(projectContext);

  return (
    <div className="projects-container">
      {utilities.projects.map((p) => (
        <Project project={p} key={p.id} />
      ))}
    </div>
  );
};

export default Projects;
