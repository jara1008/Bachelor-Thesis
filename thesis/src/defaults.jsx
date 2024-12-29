/* defauls.jsx */
import React from "react";
import { Link, useParams } from "react-router-dom";
import home_icon from "./images/home_icon.png";
import questionmark_icon from "./images/questionmark_icon.png";
import "./defaults.css";

/* default variables */
export const checkButtonTop = 92;

/* default components */

/* defines the position and routing of the top right hand icons */
export const HomeLink = ({ top = "-6.5%" }) => {
  const { level, difficulty } = useParams();
  /* AI: level matching was made by ChatGPT */
  let levelNr = level.match(/\d+$/)?.[0];
  if (levelNr === "10") {
    levelNr = 0;
  }
  const tutorialPath = `/tutorial/${levelNr}${difficulty}`;
  const isActivity = level.startsWith("activity") && difficulty !== undefined;
  console.log(difficulty);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          gap: "1vw",
          top: top,
          left: "95%",
        }}
      >
        {isActivity && (
          <Link to={tutorialPath}>
            <img src={questionmark_icon} alt="questionmark_icon" />
          </Link>
        )}
        <Link to="/">
          <img src={home_icon} alt="home_icon" />
        </Link>
      </div>
    </>
  );
};

/* upon arriving at the gratulation message, the highest unlocked level nr increases accordingly */
const incrementHighestUnlockedLevel = (currentLevelNr, difficulty) => {
  let currentLevel =
    parseInt(localStorage.getItem("highestUnlockedLevel")) || 1;
  if (currentLevelNr >= currentLevel && currentLevelNr < 9) {
    currentLevel += 1;
    localStorage.setItem("highestUnlockedLevel", currentLevel);
  }
  const storedDifficulty = localStorage.getItem(`difficulty_${currentLevelNr}`);
  if (storedDifficulty !== "1") {
    localStorage.setItem(`difficulty_${currentLevelNr}`, difficulty);
  }
};

/* upon completing an activity the gratulation message is loaded */
export const EndOfGame = ({ levelName, levelNr, difficulty }) => {
  const isEasy = difficulty === "easy";
  incrementHighestUnlockedLevel(levelNr, isEasy ? 0 : 1);

  return (
    <div className="container">
      <div
        className="white-box-regular"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span className="congratulation-title">
          🌟 Herzlichen Glückwunsch! 🌟
        </span>
        <span className="congratulation-message">
          Du hast das Level <strong>{levelName}</strong> erfolgreich gemeistert!
        </span>
        <Link to="/">
          <button
            className="button-default"
            style={{ top: `${checkButtonTop}%` }}
          >
            🌟 Zur Übersicht 🌟
          </button>
        </Link>
      </div>
    </div>
  );
};

/* error messages and correctness label is rendered */
export const CorrectnessLabel = ({
  message,
  isVisible,
  height = "15vh",
  width = "14vw",
}) => {
  if (!isVisible) return null;

  return (
    <div className="overlay" style={{ height: height, width: width }}>
      <div
        className="overlay-content"
        style={{
          backgroundColor:
            message === "Richtig!" ? "#d4edda" : "var(--secondary-color)",
          zIndex: "100",
        }}
      >
        {message === "Richtig!" ? (
          <div className="star-container2">
            <span style={{ fontWeight: "bold" }}>🌟{message}🌟</span>
          </div>
        ) : (
          <span>{message}</span>
        )}
      </div>
    </div>
  );
};

/* returns a message to use larger screen, if current screen size is to small to play properly */
export const ScreenSizeMessage = () => {
  return (
    <div className="container">
      <div className="white-box-regular">
        <div className="screen-size-message">
          Bitte verwende einen grösseren Bildschirm.
        </div>
      </div>
    </div>
  );
};
