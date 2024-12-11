import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScreenSizeMessage } from './defaults';
import './App.css';
import Background from './components/background';
import Overview from './components/overview';
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
          <Router basename="Bachelor_Thesis">
            <Routes>
              <Route path="/" element={<Overview />} />
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
