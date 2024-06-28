import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/background';
import Overview from './components/overview';
import InstrOne from './components/instructionsOne';
import ActivityOne from './components/activityOne';
import ActivityTwo from './components/activityTwo';
import ActivityThree from './components/activityThree';
import ActivityFive from './components/activityFive';
import ActivitySix from './components/activitySix';
import ActivitySeven from './components/activitySeven';
import ActivityEight from './components/activityEight';

const App = () => {
  return (
    <div>
      <Background />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/Bachelor_Thesis" element={<Overview />} />
            <Route path="/instructionsOne" element={<InstrOne />} />
            <Route path="/activityOne" element={<ActivityOne />} />
            <Route path="/activityTwo" element={<ActivityTwo />} />
            <Route path="/activityThree" element={<ActivityThree />} />
            <Route path="/activityFive" element={<ActivityFive />} />
            <Route path="/activitySix" element={<ActivitySix />} />
            <Route path="/activitySeven" element={<ActivitySeven />} />
            <Route path="/activityEight" element={<ActivityEight />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
