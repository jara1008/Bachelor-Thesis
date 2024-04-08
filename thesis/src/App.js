import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/background';
import ActivityOne from './components/activityOne';
import Overview from './components/overview';
import InstrOne from './components/instructionsOne';

const App = () => {
  return (
    <div>
      <Background />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/instructionsOne" element={<InstrOne />} />
            <Route path="/activityOne" element={<ActivityOne />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
