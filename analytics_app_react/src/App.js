// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnalyticsDashboard from './Components/AnalyticsDashboard';
import CustomNavbar from './Components/CustomNavbar'; 
import VideoTable from './Components/VideoTable';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar /> 
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<VideoTable />} />
          <Route path="/video-analytics-dashboard/:videoId" element={<AnalyticsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
