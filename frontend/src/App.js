import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HelloWorld from "./components/HelloWorld";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hello" element={<HelloWorld />} />
      </Routes>
    </Router>
  );
}

export default App;
