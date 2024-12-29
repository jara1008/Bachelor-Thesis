/* App.js */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ScreenSizeMessage } from "./defaults";
import Background from "./components/background";
import Overview from "./components/overview";
import DifficultySelection from "./components/difficultySelection";
import GameWrapper from "./components/gameWrapper";

/* Entrance point of the application */
const App = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  /* Check for big enough screen size, thresholdes were picked by trial and error */
  const checkScreenSize = () => {
    if (window.innerWidth < 600 || window.innerHeight < 360) {
      setIsScreenSmall(true);
    } else {
      setIsScreenSmall(false);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  /* load the background and the overview page, defines routing */
  /* AI: the routing was generated with assistance of chatGPT */
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
              <Route
                path="/difficultySelection/:level/:title"
                element={<DifficultySelection />}
              />
              <Route path="/:level/:difficulty" element={<GameWrapper />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
