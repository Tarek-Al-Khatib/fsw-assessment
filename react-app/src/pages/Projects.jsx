import React, { useContext } from "react";
import Project from "../components/Project";
import { projectContext } from "../context/ProjectContext";

const Projects = () => {
  const { projects, personalProjects, fetchProjects, fetchPersonalProjects } =
    useContext(projectContext);

  return (
    <div className="projects-container">
      <h2>All Projects</h2>
      {projects.length > 0 ? (
        projects.map((p) => <Project project={p} key={p.id} />)
      ) : (
        <p>No projects available.</p>
      )}

      {personalProjects.length > 0 && (
        <>
          <h2>Your Personal Projects</h2>
          {personalProjects.map((p) => (
            <Project project={p} key={p.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Projects;
