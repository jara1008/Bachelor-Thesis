/* tutorial_activity8.jsx */
/* inital structure from activity8.jsx */
import React, { useState } from "react";
import "../styles/activity8.css";
import "../defaults.css";
import { HomeLink, checkButtonTop } from "../defaults";
import tree from "../images/tree.png";
import car from "../images/car_large.png";

const tutorialStepsEasy = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Wähle das richtige Kästchen." },
  { message: "Wähle das richtige Kästchen." },
  { message: "Wähle das richtige Kästchen." },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

const tutorialStepsHard = [
  { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
  { message: "Wähle das richtige Kästchen." },
  { message: "Wähle das richtige Kästchen." },
  { message: "Wähle das richtige Kästchen." },
  { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen." },
];

function TutorialActivity8({ difficulty, onComplete }) {
  const [carIndex] = useState(-2);
  const [car2d] = useState([3, -2]);
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [buttonText, setButtonText] = useState("Weiter");

  const continueTutorial = () => {
    if (tutorialProgress === 4) {
      onComplete();
    }
    if (tutorialProgress === 3) {
      setButtonText("Prüfen");
    }
    if (tutorialProgress < 6) {
      setTutorialProgress(tutorialProgress + 1);
    }
  };

  const renderNumberLine = () => (
    <div>
      <img
        src={tree}
        alt="tree"
        style={{
          position: "relative",
          top: "5vh",
          left: "50%",
          width: "40px",
          height: "40px",
          transform: "translate(-50%)",
          boxShadow:
            tutorialProgress === 2 || tutorialProgress === 3
              ? "0 0 10px 5px #ffbf00"
              : "none",
          transition: "box-shadow 0.3s ease-in-out",
        }}
      ></img>
      <div className="number-line">
        {[-7, -6, -5, -4, -3, -2, -1].map((num, index) => (
          <div
            key={`left-${index}`}
            className={`number-dot red-dot ${(tutorialProgress === 1 || tutorialProgress === 3) && index === 5 ? "highlighted" : ""}`}
          >
            {Math.abs(num)}
            {num === carIndex && (
              <img
                src={car}
                alt="car"
                className={`car_img ${tutorialProgress === 1 || tutorialProgress === 2 || tutorialProgress === 3 ? "highlighted" : ""}`}
              />
            )}
          </div>
        ))}
        <div key={"zero"} className="number-dot">
          0
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
          <div key={`right-${index}`} className="number-dot blue-dot">
            {num}
            {num === carIndex && (
              <img src={car} alt="car" className="car_img" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRectangles = () => {
    return (
      <div className="rectangle-container">
        <div
          className={`rectangle2 ${tutorialProgress === 1 ? "highlighted" : ""}`}
        >
          <button
            className="square"
            style={{
              backgroundColor: tutorialProgress < 2 ? "#eceefa" : "#BFC4F2",
              cursor: tutorialProgress !== 1 ? "default" : "pointer",
            }}
            disabled={tutorialProgress !== 1}
            onClick={() => continueTutorial()}
          >
            <div style={{ color: "red" }}>{2}</div>
          </button>
          <button
            className="square"
            style={{
              backgroundColor: "#eceefa",
              cursor: tutorialProgress !== 1 ? "default" : "not-allowed",
            }}
            disabled="true"
          >
            <div style={{ color: "blue" }}>{2}</div>
          </button>
        </div>

        <div
          className={`rectangle2 ${tutorialProgress === 2 ? "highlighted" : ""}`}
        >
          <button
            className="square"
            style={{
              backgroundColor: tutorialProgress < 3 ? "#eceefa" : "#BFC4F2",
              cursor: tutorialProgress !== 2 ? "default" : "pointer",
            }}
            disabled={tutorialProgress !== 2}
            onClick={() => continueTutorial()}
          >
            <div style={{ color: "black" }}>&larr;</div>
            <div style={{ color: "black" }}>{2}</div>
          </button>
          <button
            className="square"
            style={{
              backgroundColor: "#eceefa",
              cursor: tutorialProgress !== 2 ? "default" : "not-allowed",
            }}
            disabled="true"
          >
            <div style={{ color: "black" }}>&rarr;</div>
            <div style={{ color: "black" }}>{2}</div>
          </button>
        </div>

        <div
          className={`rectangle2 ${tutorialProgress === 3 ? "highlighted" : ""}`}
        >
          <button
            className="square"
            style={{
              backgroundColor: "#eceefa",
              cursor: tutorialProgress !== 3 ? "default" : "not-allowed",
            }}
            disabled="true"
          >
            <div style={{ color: "black" }}>{2}</div>
          </button>
          <button
            className="square"
            style={{
              backgroundColor: tutorialProgress < 4 ? "#eceefa" : "#BFC4F2",
              cursor: tutorialProgress !== 3 ? "default" : "pointer",
            }}
            disabled={tutorialProgress !== 3}
            onClick={() => continueTutorial()}
          >
            <div style={{ color: "black" }}>{-2}</div>
          </button>
        </div>
      </div>
    );
  };

  const borderstyle = (x, y) => {
    let borderBottom = "none";
    let borderRight = "none";
    let borderTop =
      x === 0 ? "none" : x === 6 ? "0.4vh solid black" : "0.25vh solid black";
    let borderLeft =
      y === 0 ? "none" : y === 6 ? "0.4vh solid black" : "0.25vh solid black";
    return {
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
    };
  };

  const renderGrid = () => (
    <div className="grid">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "37vw",
          width: "37vw",
        }}
      >
        {Array.from({ length: 12 }).map((_, id) => (
          <div
            key={id}
            style={{ display: "flex", height: "2.5vw", width: "37vw" }}
          >
            {Array.from({ length: 12 }).map((_, id2) => (
              <div
                className="rectangle2"
                key={[id, id2]}
                style={{
                  ...borderstyle(id, id2),
                  height: "2.5vw",
                  width: "2.5vw",
                  fontSize: "2.5vh",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {id2 - 5 === car2d[0] && 5 - id === car2d[1] && (
                  <img
                    src={car}
                    alt="car"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-10%, 0)",
                      width: "3.5vw",
                      height: "2vw",
                      zIndex: 1,
                      boxShadow:
                        tutorialProgress === 1 ||
                        tutorialProgress === 2 ||
                        tutorialProgress === 3
                          ? "0 0 10px 5px #ffbf00"
                          : "none",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  />
                )}
                {id === 6 && id2 === 6 && (
                  <img
                    src={tree}
                    alt="tree"
                    style={{
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      width: "3.5vw",
                      height: "3.5vw",
                      boxShadow:
                        tutorialProgress === 2
                          ? "0 0 10px 5px #ffbf00"
                          : "none",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  />
                )}
                {id === 6 && id2 === 11 && (
                  <>
                    <div
                      className={`triangle right ${tutorialProgress === 2 ? "highlighted" : ""}`}
                    ></div>
                    <div
                      className={`plus-sign right ${tutorialProgress === 3 ? "highlighted" : ""}`}
                    >
                      +
                    </div>
                  </>
                )}
                {id === 6 && id2 === 1 && (
                  <>
                    <div className="triangle left"></div>
                    <div className="plus-sign left">-</div>
                  </>
                )}
                {id2 === 6 && id === 11 && (
                  <>
                    <div
                      className={`triangle down ${tutorialProgress === 2 ? "highlighted" : ""}`}
                    ></div>
                    <div
                      className={`plus-sign down ${tutorialProgress === 3 ? "highlighted" : ""}`}
                    >
                      -
                    </div>
                  </>
                )}
                {id2 === 6 && id === 1 && (
                  <>
                    <div className="triangle up"></div>
                    <div className="plus-sign up">+</div>
                  </>
                )}
                {id === 6 && id2 !== 0 && id2 !== 6 && (
                  <div
                    style={{
                      position: "absolute",
                      transform: "translate(-65%, -50%)",
                      backgroundColor: "var(--secondary-color)",
                      padding: "0vw 0.2vw",
                      fontWeight: "bold",
                      zIndex: 2,
                      color: id2 - 6 < 0 ? "red" : "blue",
                      boxShadow:
                        (tutorialProgress === 1 || tutorialProgress === 3) &&
                        id2 - 6 === 3
                          ? "0 0 10px 5px #ffbf00"
                          : "none",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    {Math.abs(id2 - 6)}
                  </div>
                )}
                {id2 === 6 && id !== 0 && id !== 6 && (
                  <div
                    style={{
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "var(--secondary-color)",
                      padding: "0vw 0.2vw",
                      fontWeight: "bold",
                      zIndex: 2,
                      color: 6 - id < 0 ? "red" : "blue",
                      boxShadow:
                        (tutorialProgress === 1 || tutorialProgress === 3) &&
                        6 - id === -2
                          ? "0 0 10px 5px #ffbf00"
                          : "none",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    {Math.abs(6 - id)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRectanglesHard = () => {
    return (
      <div
        className="rectangle-container-hard"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className={`rectangle2 ${tutorialProgress === 1 ? "highlighted" : ""}`}
        >
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 1 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "red" }}>3</span>,
              <span style={{ color: "red" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={tutorialProgress !== 1}
            style={{
              cursor: tutorialProgress !== 1 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 2 ? "#eceefa" : "#BFC4F2",
            }}
            onClick={() => continueTutorial()}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "blue" }}>3</span>,
              <span style={{ color: "red" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 1 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "red" }}>3</span>,
              <span style={{ color: "blue" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 1 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "blue" }}>3</span>,
              <span style={{ color: "blue" }}>2</span>
            </div>
          </button>
        </div>

        <div
          className={`rectangle2 ${tutorialProgress === 2 ? "highlighted" : ""}`}
        >
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 2 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}>
              <div>&larr;</div>
              <div>&uarr;</div>
            </div>
            <div>
              <span style={{ color: "black" }}>3</span>,
              <span style={{ color: "black" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 2 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}>
              <div>&rarr;</div>
              <div>&uarr;</div>
            </div>
            <div>
              <span style={{ color: "black" }}>3</span>,
              <span style={{ color: "black" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 2 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}>
              <div>&larr;</div>
              <div>&darr;</div>
            </div>
            <div>
              <span style={{ color: "black" }}>3</span>,
              <span style={{ color: "black" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={tutorialProgress !== 2}
            style={{
              cursor: tutorialProgress !== 2 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 3 ? "#eceefa" : "#BFC4F2",
            }}
            onClick={() => continueTutorial()}
          >
            <div style={{ display: "flex", color: "black" }}>
              <div>&rarr;</div>
              <div>&darr;</div>
            </div>
            <div>
              <span style={{ color: "black" }}>3</span>,
              <span style={{ color: "black" }}>2</span>
            </div>
          </button>
        </div>

        <div
          className={`rectangle2 ${tutorialProgress === 3 ? "highlighted" : ""}`}
        >
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 3 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "black" }}>-3</span>,
              <span style={{ color: "black" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 3 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "black" }}>3</span>,
              <span style={{ color: "black" }}>2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={"true"}
            style={{
              cursor: tutorialProgress !== 3 ? "default" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "black" }}>-3</span>,
              <span style={{ color: "black" }}>-2</span>
            </div>
          </button>
          <button
            className="squareHard"
            disabled={tutorialProgress !== 3}
            style={{
              cursor: tutorialProgress !== 3 ? "default" : "pointer",
              backgroundColor: tutorialProgress < 4 ? "#eceefa" : "#BFC4F2",
            }}
            onClick={() => continueTutorial()}
          >
            <div style={{ display: "flex", color: "black" }}></div>
            <div>
              <span style={{ color: "black" }}>3</span>,
              <span style={{ color: "black" }}>-2</span>
            </div>
          </button>
        </div>
      </div>
    );
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
          <>
            <span className="title-text">
              {tutorialStepsEasy[tutorialProgress]["message"]}
            </span>
            {renderNumberLine()}
            {renderRectangles()}
          </>
        )}
        {difficulty === "hard" && (
          <div>
            <span className="title-text">
              {tutorialStepsHard[tutorialProgress]["message"]}
            </span>
            <div style={{ display: "flex" }}>
              {renderGrid()}
              {renderRectanglesHard()}
            </div>
          </div>
        )}
        <button
          onClick={continueTutorial}
          className={`button-default ${tutorialProgress === 4 || tutorialProgress === 0 ? "highlighted" : ""}`}
          disabled={
            tutorialProgress === 1 ||
            tutorialProgress === 2 ||
            tutorialProgress === 3
          }
          style={{
            top: `${checkButtonTop}%`,
            left: "50%",
            cursor:
              tutorialProgress === 1 ||
              tutorialProgress === 2 ||
              tutorialProgress === 3
                ? "default"
                : "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TutorialActivity8;
