/* tutorial_activity9.jsx */
/* inital structure from activity9.jsx */
import React, { useState } from "react";
import "../styles/activity9.css";
import "../defaults.css";
import { HomeLink, checkButtonTop } from "../defaults";

const tutorialStepsEasy = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Entferne Münzen mit demselben Wert." },
  { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
  { message: "Zähle die restlichen Münzen. Beachte das Vorzeichen!" },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

const tutorialStepsHard = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Entferne Münzen mit demselben Wert." },
  { message: "Tausche 10er Münzen in 1er Münzen um." },
  { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
  { message: "Zähle die restlichen Münzen. Beachte das Vorzeichen!" },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

function TutorialActivity9({ difficulty, onComplete }) {
  const [inputValue, setInputValue] = useState("");
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [buttonText, setButtonText] = useState("Weiter");
  let leftVal, rightVal;

  if (difficulty === "easy") {
    leftVal = 2;
    rightVal = 4;
  } else {
    leftVal = 2;
    rightVal = 11;
  }

  const continueTutorial = () => {
    console.log("HEEE");
    if (difficulty === "easy" && tutorialProgress === 3) {
      setInputValue("-2");
      setButtonText("Prüfen");
    }
    if (difficulty === "hard" && tutorialProgress === 4) {
      setInputValue("-9");
      setButtonText("Prüfen");
    }
    if (tutorialProgress < 5) {
      console.log("HEREEE");
      setTutorialProgress(tutorialProgress + 1);
    }
    if (
      (tutorialProgress === 4 && difficulty === "easy") ||
      (tutorialProgress === 5 && difficulty === "hard")
    ) {
      onComplete();
      console.log("completed");
      console.log(tutorialProgress);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (difficulty === "easy" && tutorialProgress === 3 && value === "-2") {
      setTutorialProgress(4);
      setButtonText("Prüfen");
    } else if (
      difficulty === "hard" &&
      tutorialProgress === 4 &&
      value === "-9"
    ) {
      setTutorialProgress(5);
      setButtonText("Prüfen");
    }
  };

  function CoinRowUpperLeft() {
    return (
      <div className="coin-stack-A9">
        <div
          className={`coin-A9 ${tutorialProgress === 1 ? "highlighted" : ""}`}
          style={{
            cursor: tutorialProgress !== 1 ? "default" : "pointer",
            backgroundColor: tutorialProgress < 2 ? "#BFC4F2" : "red",
          }}
          onClick={
            tutorialProgress === 1 ? () => continueTutorial() : undefined
          }
        >
          1
        </div>
        {difficulty === "easy" && (
          <div
            className={`coin-A9 ${tutorialProgress === 2 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 2 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 3 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 2 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}
        {difficulty === "hard" && (
          <div
            className={`coin-A9 ${tutorialProgress === 3 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 3 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 4 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 3 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}
      </div>
    );
  }

  function CoinRowUpperRight() {
    return (
      <div className="coin-stack-A9">
        {difficulty === "hard" && tutorialProgress < 3 && (
          <div
            className={"coin-A9"}
            style={{ cursor: tutorialProgress !== 2 ? "default" : "pointer" }}
            onClick={
              tutorialProgress === 2 ? () => continueTutorial() : undefined
            }
          >
            10
          </div>
        )}
        <div
          className={`coin-A9 ${tutorialProgress === 1 ? "highlighted" : ""}`}
          style={{
            cursor: tutorialProgress !== 1 ? "default" : "pointer",
            backgroundColor: tutorialProgress < 2 ? "#BFC4F2" : "red",
          }}
          onClick={
            tutorialProgress === 1 ? () => continueTutorial() : undefined
          }
        >
          1
        </div>
        {difficulty === "easy" && (
          <div
            className={`coin-A9 ${tutorialProgress === 2 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 2 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 3 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 2 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div
            className={`coin-A9`}
            readOnly={true}
            style={{ cursor: "default" }}
          >
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div
            className={`coin-A9`}
            readOnly={true}
            style={{ cursor: "default" }}
          >
            1
          </div>
        )}
        {difficulty === "hard" && tutorialProgress > 2 && (
          <div
            className={`coin-A9 ${tutorialProgress === 3 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 3 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 4 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 3 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}
        {difficulty === "hard" &&
          tutorialProgress > 2 &&
          Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={`coin-A9`}
              style={{ cursor: "default" }}
            >
              1
            </div>
          ))}
      </div>
    );
  }

  function CoinRowLowerLeft() {
    return (
      <div className="coin-stack-A9">
        {tutorialProgress < 2 && (
          <div className={`coin-A9`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "easy" && tutorialProgress < 2 && (
          <div className={`coin-A9`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "hard" && tutorialProgress < 4 && (
          <div className={`coin-A9`} style={{ cursor: "default" }}>
            1
          </div>
        )}
      </div>
    );
  }

  function CoinRowLowerRight() {
    return (
      <div className="coin-stack-A9">
        {difficulty === "hard" && tutorialProgress < 3 && (
          <div className={`coin-A9`} style={{ cursor: "default" }}>
            10
          </div>
        )}
        {tutorialProgress < 2 && (
          <div className={`coin-A9`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "easy" && tutorialProgress < 3 && (
          <div className={`coin-A9`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div
            className={`coin-A9 ${tutorialProgress === 3 ? "highlighted" : ""}`}
          >
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div
            className={`coin-A9 ${tutorialProgress === 3 ? "highlighted" : ""}`}
          >
            1
          </div>
        )}
        {difficulty === "hard" &&
          tutorialProgress > 2 &&
          tutorialProgress < 4 && (
            <div className={`coin-A9`} style={{ cursor: "default" }}>
              1
            </div>
          )}
        {difficulty === "hard" &&
          tutorialProgress > 2 &&
          Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={`coin-A9 ${tutorialProgress === 4 ? "highlighted" : ""}`}
              style={{ cursor: "default" }}
            >
              1
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="container">
      <span className="tutorial-header-large">TUTORIAL</span>
      <div
        className="white-box-large"
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
        <div
          className="row-wrapper"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <span className="text-wrapper-A9">
            {leftVal} - {rightVal}
          </span>
          {difficulty === "hard" && (
            <button
              onClick={continueTutorial}
              className={`header-button ${tutorialProgress === 2 ? "highlighted" : ""}`}
              disabled={tutorialProgress !== 2}
            >
              Tauschen
            </button>
          )}
        </div>

        <div className="coin-row-A9" style={{ "--top": "35%" }}>
          <span
            className="symbol-A9"
            style={{ "--left": "-5%", "--top": "15%" }}
          >
            =
          </span>
          <CoinRowUpperLeft />
          <span
            className="symbol-A9"
            style={{ "--left": "-2%", "--top": "55%" }}
          >
            -
          </span>
          <CoinRowUpperRight />
          <hr className="coin-row-divider" />
        </div>
        <div className="coin-row-A9" style={{ "--top": "60%" }}>
          {
            <span
              className="symbol-A9"
              style={{ "--left": "-5%", "--top": "17%" }}
            >
              =
            </span>
          }
          <CoinRowLowerLeft />
          {tutorialProgress <= 2 && (
            <span
              className="symbol-A9"
              style={{ "--left": "-2%", "--top": "68%" }}
            >
              -
            </span>
          )}
          {tutorialProgress > 2 && (
            <span
              className={`symbol-A9 ${(difficulty === "easy" && tutorialProgress === 3) || (difficulty === "hard" && tutorialProgress === 4) ? "highlighted" : ""}`}
              style={{ "--left": "-2%", "--top": "40%" }}
            >
              -
            </span>
          )}
          <CoinRowLowerRight />
        </div>
        <div className="coin-row-A9" style={{ "--top": "86%" }}>
          <span className="symbol-A9" style={{ "--left": "-5%" }}>
            =
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
            className={`info-input-A9 ${(difficulty === "easy" && tutorialProgress === 3) || (difficulty === "hard" && tutorialProgress === 4) ? "highlighted" : ""}`}
            disabled={
              (difficulty === "easy" && tutorialProgress !== 3) ||
              (difficulty === "hard" && tutorialProgress !== 4)
            }
          />
        </div>
        <button
          onClick={continueTutorial}
          className={`button-default ${
            (difficulty === "easy" && tutorialProgress === 4) ||
            (difficulty === "hard" && tutorialProgress === 5) ||
            tutorialProgress === 0
              ? "highlighted"
              : ""
          }`}
          disabled={
            (difficulty === "easy" && [1, 2, 3].includes(tutorialProgress)) ||
            (difficulty === "hard" && [1, 2, 3, 4].includes(tutorialProgress))
          }
          style={{
            top: `${checkButtonTop}%`,
            left: "50%",
            cursor: tutorialProgress === 3 ? "default" : "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TutorialActivity9;
