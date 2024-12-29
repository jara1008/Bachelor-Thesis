import React, { useState } from "react";
import "../styles/activity3.css";
import "../defaults.css";
import { HomeLink } from "../defaults";
import { checkButtonTop } from "../defaults";

const tutorialStepsEasy = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Entferne Münzen mit demselben Wert." },
  { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
  { message: "Wähle <, =, > passend." },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

const tutorialStepsHard = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Entferne Münzen mit demselben Wert." },
  { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
  { message: "Tausche 10er Münzen in 1er Münzen um." },
  { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
  { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
  { message: "Wähle <, =, > passend." },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

function TutorialActivity3({ difficulty, onComplete }) {
  const [inputValue, setInputValue] = useState("");
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [buttonText, setButtonText] = useState("Weiter");

  const continueTutorial = () => {
    if (difficulty === "easy" && tutorialProgress === 3) {
      setInputValue(">");
      setButtonText("Prüfen");
    }
    if (difficulty === "hard" && tutorialProgress === 6) {
      setInputValue("<");
      setButtonText("Prüfen");
    }
    if (
      (tutorialProgress === 4 && difficulty === "easy") ||
      (tutorialProgress === 7 && difficulty === "hard")
    ) {
      onComplete();
    }
    if (tutorialProgress < 7) {
      setTutorialProgress(tutorialProgress + 1);
    }
  };

  function CoinRowUpperLeft() {
    return (
      <div className="coin-stack-A3">
        <div
          className={`coin-A3 ${tutorialProgress === 1 ? "highlighted" : ""}`}
          style={{
            cursor: tutorialProgress !== 1 ? "default" : "pointer",
            backgroundColor: tutorialProgress < 2 ? "#BFC4F2" : "red",
          }}
          onClick={
            tutorialProgress === 1 ? () => continueTutorial() : undefined
          }
        >
          10
        </div>
        <div
          className={`coin-A3 ${tutorialProgress === 2 ? "highlighted" : ""}`}
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
        {difficulty === "easy" && (
          <div
            className={`coin-A3`}
            readOnly={true}
            style={{ cursor: "default" }}
          >
            1
          </div>
        )}
        {difficulty === "hard" && (
          <div
            className={`coin-A3 ${tutorialProgress === 4 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 4 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 5 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 4 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div
            className={`coin-A3`}
            readOnly={true}
            style={{ cursor: "default" }}
          >
            1
          </div>
        )}
        {difficulty === "hard" && (
          <div
            className={`coin-A3 ${tutorialProgress === 5 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 5 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 6 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 5 ? () => continueTutorial() : undefined
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
      <div className="coin-stack-A3">
        <div
          className={`coin-A3 ${tutorialProgress === 1 ? "highlighted" : ""}`}
          style={{
            cursor: tutorialProgress !== 1 ? "default" : "pointer",
            backgroundColor: tutorialProgress < 2 ? "#BFC4F2" : "red",
          }}
          onClick={
            tutorialProgress === 1 ? () => continueTutorial() : undefined
          }
        >
          10
        </div>
        {difficulty === "hard" && tutorialProgress < 4 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            10
          </div>
        )}
        <div
          className={`coin-A3 ${tutorialProgress === 2 ? "highlighted" : ""}`}
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
        {difficulty === "hard" && tutorialProgress >= 4 && (
          <div
            className={`coin-A3 ${tutorialProgress === 4 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 4 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 5 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 4 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}

        {difficulty === "hard" && tutorialProgress >= 4 && (
          <div
            className={`coin-A3 ${tutorialProgress === 5 ? "highlighted" : ""}`}
            style={{
              cursor: tutorialProgress !== 5 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 6 ? "#BFC4F2" : "red",
            }}
            onClick={
              tutorialProgress === 5 ? () => continueTutorial() : undefined
            }
          >
            1
          </div>
        )}

        {difficulty === "hard" &&
          tutorialProgress >= 4 &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`coin-A3`}
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
      <div className="coin-stack-A3">
        {tutorialProgress < 2 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            10
          </div>
        )}
        {tutorialProgress < 3 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "easy" && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "hard" && tutorialProgress < 5 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "hard" && tutorialProgress < 6 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            1
          </div>
        )}
      </div>
    );
  }

  function CoinRowLowerRight() {
    return (
      <div className="coin-stack-A3">
        {tutorialProgress < 2 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            10
          </div>
        )}
        {difficulty === "hard" && tutorialProgress < 4 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            10
          </div>
        )}
        {tutorialProgress < 3 && (
          <div className={`coin-A3`} style={{ cursor: "default" }}>
            1
          </div>
        )}
        {difficulty === "hard" &&
          tutorialProgress > 3 &&
          tutorialProgress < 5 && (
            <div className={`coin-A3`} style={{ cursor: "default" }}>
              1
            </div>
          )}
        {difficulty === "hard" &&
          tutorialProgress > 3 &&
          tutorialProgress < 6 && (
            <div className={`coin-A3`} style={{ cursor: "default" }}>
              1
            </div>
          )}
        {difficulty === "hard" &&
          tutorialProgress >= 4 &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`coin-A3`}
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
        {difficulty === "hard" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <button
              className="header-button"
              style={{ left: "25%", marginTop: "2vh" }}
            >
              Tauschen
            </button>
            <button
              className={`header-button ${tutorialProgress === 3 ? "highlighted" : ""}`}
              style={{ left: "75%", marginTop: "2vh" }}
              onClick={() => continueTutorial()}
            >
              Tauschen
            </button>
          </div>
        )}
        <div className="coin-row-A3">
          <CoinRowUpperLeft />
          <span className="title-text" style={{ "--left": "50%" }}>
            ?
          </span>
          <CoinRowUpperRight />
        </div>
        <div className="arrows-A3">
          <span className="title-text">↓</span>
          <span className="title-text">↓</span>
        </div>
        <div className="coin-row-A3">
          <CoinRowLowerLeft />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder=""
            className="info-input-A3"
          />
          <CoinRowLowerRight />
        </div>
        <div className="button-container-A3">
          <button
            className={`operator-button-A2 ${(difficulty === "easy" && tutorialProgress === 3) || (difficulty === "hard" && tutorialProgress === 6) ? "highlighted" : ""}`}
            disabled={
              difficulty === "easy" ||
              (difficulty === "hard" && tutorialProgress !== 6)
            }
            style={{
              cursor:
                difficulty === "easy" && tutorialProgress === 3
                  ? "not-allowed"
                  : "default" ||
                      (difficulty === "hard" && tutorialProgress === 6)
                    ? "pointer"
                    : "default",
            }}
            onClick={() => continueTutorial()}
          >
            {"<"}
          </button>
          <button
            className={`operator-button-A2 ${(difficulty === "easy" && tutorialProgress === 3) || (difficulty === "hard" && tutorialProgress === 6) ? "highlighted" : ""}`}
            disabled={"true"}
            style={{
              cursor:
                (difficulty === "easy" && tutorialProgress === 3) ||
                (difficulty === "hard" && tutorialProgress === 6)
                  ? "not-allowed"
                  : "default",
            }}
          >
            {"="}
          </button>
          <button
            className={`operator-button-A2 ${(difficulty === "easy" && tutorialProgress === 3) || (difficulty === "hard" && tutorialProgress === 6) ? "highlighted" : ""}`}
            disabled={
              (difficulty === "easy" && tutorialProgress !== 3) ||
              difficulty === "hard"
            }
            style={{
              cursor:
                difficulty === "easy" && tutorialProgress === 3
                  ? "pointer"
                  : "default" ||
                      (difficulty === "hard" && tutorialProgress === 6)
                    ? "not-allowed"
                    : "default",
            }}
            onClick={() => continueTutorial()}
          >
            {">"}
          </button>
        </div>
        <button
          onClick={continueTutorial}
          className={`button-default ${
            (difficulty === "easy" && tutorialProgress === 4) ||
            (difficulty === "hard" && tutorialProgress === 7) ||
            tutorialProgress === 0
              ? "highlighted"
              : ""
          }`}
          disabled={
            (difficulty === "easy" && [1, 2, 3].includes(tutorialProgress)) ||
            (difficulty === "hard" &&
              [1, 2, 3, 4, 5].includes(tutorialProgress))
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

export default TutorialActivity3;
