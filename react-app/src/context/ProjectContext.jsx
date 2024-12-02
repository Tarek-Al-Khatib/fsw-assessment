import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const projectContext = createContext();
const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [personalProjects, setPersonalProjects] = useState([]);

  async function fetchProjects() {
    const response = await axios.get("http://127.0.0.1:8000/api/projects");
    return response.data;
  }

  async function fetchPersonalProjects(id) {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/projects/user/" + id
    );
    return response.data;
  }

  async function addProject(project) {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/projects/",
      project
    );
    return response.data;
  }

  async function updateProject(id, project) {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/projects/" + id,
      project
    );
    return response.data;
  }
};
