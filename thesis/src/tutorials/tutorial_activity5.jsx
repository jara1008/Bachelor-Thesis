/* tutorial_activity5.jsx */
/* inital structure from activity5.jsx */
import React, { useState } from "react";
import "../styles/activity5.css";
import "../defaults.css";
import { HomeLink, checkButtonTop } from "../defaults";

const tutorialStepsEasy = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Um wie viel muss 11 ergänzt werden, damit wir 17 erhalten?" },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

const tutorialStepsHard = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Um wie viel muss 105 ergänzt werden, damit wir 118 erhalten?" },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

function TutorialActivity5({ difficulty, onComplete }) {
  const [numbers] = useState(
    (difficulty === "easy" && { largeNum: 17, smallNum: 11 }) ||
      (difficulty === "hard" && { largeNum: 48, smallNum: 35 })
  );
  const [inputValue, setInputValue] = useState("");
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [buttonText, setButtonText] = useState("Weiter");
  const [showHint, setShowHint] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const continueTutorial = () => {
    if (tutorialProgress === 2) {
      if (difficulty === "easy") {
        setInputValue(6);
      } else {
        setInputValue(13);
      }
      setButtonText("Prüfen");
    }
    if (tutorialProgress === 2) {
      onComplete();
    }
    if (tutorialProgress < 3) {
      setTutorialProgress(tutorialProgress + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (difficulty === "easy" && tutorialProgress === 1 && value === "6") {
      setTutorialProgress(2);
      setInputDisabled(true);
      setButtonText("Prüfen");
    } else if (
      difficulty === "hard" &&
      tutorialProgress === 1 &&
      value === "13"
    ) {
      setTutorialProgress(2);
      setInputDisabled(true);
      setButtonText("Prüfen");
    }
  };

  const handleInputClick = () => {
    if (tutorialProgress === 1) {
      setShowHint(true);
    }
  };

  return (
    <div className="container">
      <span className="tutorial-header-regular">TUTORIAL</span>
      <div
        className="white-box-regular"
        style={{ boxShadow: "var(--default-highlight)" }}
      >
        <HomeLink />
        {difficulty === "easy" && (
          <span className="title-text">
            {tutorialStepsEasy[tutorialProgress]["message"]}
          </span>
        )}
        {difficulty === "hard" && (
          <span className="title-text">
            {tutorialStepsHard[tutorialProgress]["message"]}
          </span>
        )}
        <div className="info-A5">
          {numbers.smallNum} +
          <input
            type="text"
            value={inputValue}
            placeholder=""
            onChange={handleInputChange}
            onClick={handleInputClick}
            className={`info-input-A5 ${tutorialProgress === 1 ? "highlighted" : ""}`}
            disabled={tutorialProgress !== 1 || inputDisabled} // Disable input when tutorial progress changes
          />
          = {numbers.largeNum}
        </div>
        {difficulty === "easy" && showHint && tutorialProgress === 1 && (
          <div className="info-A5" style={{ fontSize: "2vw" }}>
            Tipp: Die Zahl ist 6
          </div>
        )}
        {difficulty === "hard" && showHint && tutorialProgress === 1 && (
          <div className="info-A5" style={{ fontSize: "2vw" }}>
            Tipp: Die Zahl ist 13
          </div>
        )}
        <button
          onClick={continueTutorial}
          className={`button-default ${
            tutorialProgress === 0 || tutorialProgress === 2
              ? "highlighted"
              : ""
          }`}
          disabled={tutorialProgress === 1}
          style={{
            top: `${checkButtonTop}%`,
            left: "50%",
            cursor: tutorialProgress === 1 ? "default" : "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TutorialActivity5;
