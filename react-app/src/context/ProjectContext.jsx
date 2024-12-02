import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const projectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [personalProjects, setPersonalProjects] = useState([]);
  const [userId, setUserId] = useState(null);

  async function fetchProjects() {
    const response = await axios.get("http://127.0.0.1:8000/api/projects");
    setProjects(response.data);
  }

  async function fetchPersonalProjects(id) {
    if (!id) return;
    const response = await axios.get(
      `http://127.0.0.1:8000/api/projects/user/${id}`
    );
    setPersonalProjects(response.data);
  }

  async function addProject(project) {
    await axios.post("http://127.0.0.1:8000/api/projects/", project);
    fetchProjects();
    if (userId) fetchPersonalProjects(userId);
  }

  async function updateProject(id, project) {
    await axios.put(`http://127.0.0.1:8000/api/projects/${id}`, project);
    fetchProjects();
    if (userId) fetchPersonalProjects(userId);
  }

  useEffect(() => {
    fetchProjects();
    if (userId) fetchPersonalProjects(userId);
  }, [userId]);

  return (
    <projectContext.Provider
      value={{
        projects,
        personalProjects,
        fetchProjects,
        fetchPersonalProjects,
        addProject,
        updateProject,
        setUserId,
      }}
    >
      {children}
    </projectContext.Provider>
  );
};

export default ProjectProvider;
