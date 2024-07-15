import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScreenSizeMessage } from './defaults';
import './App.css';
import Background from './components/background';
import Overview from './components/overview';
import Instructions from './components/instructions';
import Activity1 from './activities/activity1';
import Activity2 from './activities/activity2';
import Activity3 from './activities/activity3';
import Activity5 from './activities/activity5';
import Activity6 from './activities/activity6';
import Activity7 from './activities/activity7';
import Activity8 from './activities/activity8';
import Activity9 from './activities/activity9';
import Activity10 from './activities/activity10';
import DifficultySelection from './components/difficultySelection';
import GameWrapper from './components/gameWrapper';

const App = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    if (window.innerWidth < 600 || window.innerHeight < 360) {
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
          <Router basename={process.env.PUBLIC_URL || "/Bachelor_Thesis"}>
            <Routes>
              <Route path="/Bachelor_Thesis" element={<Overview />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/activity1" element={<Activity1 />} />
              <Route path="/activity2" element={<Activity2 />} />
              <Route path="/activity3" element={<Activity3 />} />
              <Route path="/activity5" element={<Activity5 />} />
              <Route path="/activity6" element={<Activity6 />} />
              <Route path="/activity7" element={<Activity7 />} />
              <Route path="/activity8" element={<Activity8 />} />
              <Route path="/activity9" element={<Activity9 />} />
              <Route path="/activity10" element={<Activity10 />} />
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
