import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/background';
import ActivityOne from './components/activityOne';
import Overview from './components/overview';
import './App.css';

const App = () => {
  return (
    <div>
      <Background />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activityOne" element={<ActivityOne />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
