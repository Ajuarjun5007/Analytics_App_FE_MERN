// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css'; // Ensure this path is correct
import AnalyticsDashboard from './Components/AnalyticsDashboard';
import CustomNavbar from './Components/CustomNavbar'; // Updated import name

function App() {
  console.log("sADdd");

  return (
    <div className="App">
      <CustomNavbar /> {/* Use the renamed custom navbar */}
      <AnalyticsDashboard />
    </div>
  );
}

export default App;
