import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Projects from "./pages/Projects";
import Auth from "./pages/Auth";
import ProjectProvider from "./context/ProjectContext";
function App() {
  return (
    <div className="App">
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </div>
  );
}

export default App;
