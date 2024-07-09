import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScreenSizeMessage } from './defaults';
import './App.css';
import Background from './components/background';
import Overview from './components/overview';
import InstrOne from './components/instructionsOne';
import ActivityOne from './activities/activityOne';
import ActivityTwo from './activities/activityTwo';
import ActivityThree from './activities/activityThree';
import ActivityFive from './activities/activityFive';
import ActivitySix from './activities/activitySix';
import ActivitySeven from './activities/activitySeven';
import ActivityEight from './activities/activityEight';
import ActivityNine from './activities/activityNine';
import ActivityTen from './activities/activityTen';
import DifficultySelection from './components/difficultySelection';
import GameWrapper from './components/gameWrapper';

const App = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    if (window.innerWidth < 600 || window.innerHeight < 360) { /* adjust these sizes as needed */
      setIsScreenSmall(true);
    } else {
      setIsScreenSmall(false);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div>
      <Background />
      {isScreenSmall ? (
        <ScreenSizeMessage />
      ) : (
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
              <Route path="/activityNine" element={<ActivityNine />} />
              <Route path="/activityTen" element={<ActivityNine />} />
              <Route path="/difficultySelection/:level/:title" element={<DifficultySelection />} />
              <Route path="/:level/:difficulty" element={<GameWrapper />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;