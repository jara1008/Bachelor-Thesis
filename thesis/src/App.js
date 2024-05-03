import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/background';
import Overview from './components/overview';
import InstrOne from './components/instructionsOne';
import ActivityOne from './components/activityOne';
import ActivityTwo from './components/activityTwo';
import ActivityThree from './components/activityThree';
import ActivityFive from './components/activityFive';

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
            <Route path="/activityTwo" element={<ActivityTwo />} />
            <Route path="/activityThree" element={<ActivityThree />} />
            <Route path="/activityFive" element={<ActivityFive />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
