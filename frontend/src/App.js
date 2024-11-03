// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HWSetProvider } from './context/HWSetContext';
import LoginPage from "./components/LoginPage";
import ProjectsView from "./components/ProjectsView";
import './App.css';


function App() {
  return (
    <HWSetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Projects" element={<ProjectsView />} />
        </Routes>
      </Router>
    </HWSetProvider>
  );
}

export default App;
