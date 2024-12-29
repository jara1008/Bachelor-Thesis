/* activity2.jsx */
import React, { useState, useEffect, useCallback } from "react";
import "../styles/activity2.css";
import {
  HomeLink,
  EndOfGame,
  CorrectnessLabel,
  checkButtonTop,
} from "../defaults";
import { predefinedSetsA2 } from "./predefinedSets.jsx";

function Activity2({ difficulty }) {
  const [numCubesFirstRow, setNumCubesFirstRow] = useState(0);
  const [numCubesSecondRow, setNumCubesSecondRow] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] =
    useState(false); /* checks for correctness */
  const [displayCorrectness, setCorrectnessLabel] =
    useState(false); /* displayes a correctness message */
  const [roundCount, setRoundCount] = useState(0);
  const [differenceValue, setDifferenceValue] = useState("");
  const [selectedSet, setSelectedSet] = useState([]);

  /* Hints */
  const [hintAllBoxes, setHintAllBoxes] = useState(false);

  /* Select a random set of cases based on difficulty */
  useEffect(() => {
    const sets =
      difficulty === "easy" ? predefinedSetsA2.easy : predefinedSetsA2.hard;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    setSelectedSet(randomSet);
  }, [difficulty]);

  /* resets variables and loads next set of numbers */
  const shuffleCubes = useCallback(() => {
    if (selectedSet.length > 0) {
      const { first, second } = selectedSet[roundCount];
      setNumCubesFirstRow(first);
      setNumCubesSecondRow(second);
      setIsCorrect(false);
      setInputValue("");
      setCorrectnessLabel(false);
      setDifferenceValue("");
    }
  }, [selectedSet, roundCount]);

  useEffect(() => {
    shuffleCubes();
  }, [shuffleCubes]);

  /* checks if exercise was solved correctly and enables needed hints */
  const checkInput = () => {
    if (
      difficulty === "hard" &&
      (inputValue === "" || differenceValue === "")
    ) {
      setHintAllBoxes(true);
      return;
    }
    setHintAllBoxes(false);

    setCorrectnessLabel(true);
    const lengthDifference = Math.abs(numCubesFirstRow - numCubesSecondRow);
    if (
      (inputValue === "<" && numCubesFirstRow < numCubesSecondRow) ||
      (inputValue === ">" && numCubesFirstRow > numCubesSecondRow) ||
      (inputValue === "=" && numCubesFirstRow === numCubesSecondRow)
    ) {
      if (
        difficulty === "hard" &&
        parseInt(differenceValue) !== lengthDifference
      ) {
        setIsCorrect(false);
      } else {
        setIsCorrect(true);
      }
    } else {
      setIsCorrect(false);
    }
  };

  /* upon clicking a <, =, > button this sets the value into the input field */
  const handleButtonClick = (value) => {
    setInputValue(value);
  };

  /* checks if more rounds are to be played and called shuffleCubes to trigger the next round */
  const handleNext = () => {
    setRoundCount((prevRoundCount) => prevRoundCount + 1);
    shuffleCubes();
  };

  /* The game is finished */
  if (roundCount >= Math.max(1, selectedSet.length - 1)) {
    /* Message that the game is completed */
    return (
      <EndOfGame
        levelName="Längen Vergleich"
        levelNr={2}
        difficulty={difficulty}
      />
    );
  }

  /* renders all the visible components of the page */
  return (
    <div className="container">
      <div className="white-box-regular">
        <HomeLink />
        {difficulty === "easy" && (
          <span className="title-text">Wähle {"<, >, ="} passend: </span>
        )}
        {difficulty === "hard" && (
          <span className="title-text">
            Wähle {"<, >, ="} passend. Gib den Längenunterschied an:
          </span>
        )}
        <div className="cube-rows-A2">
          <div className="cube-row-A2">
            {Array.from({ length: numCubesFirstRow }, (_, index) => (
              <div key={index} className="cube-A2">
                <span className="cube-label-A2">1cm</span>
              </div>
            ))}
          </div>
          <div className="cube-row-A2">
            {Array.from({ length: numCubesSecondRow }, (_, index) => (
              <div key={index} className="cube-A2">
                <span className="cube-label-A2">1cm</span>
              </div>
            ))}
          </div>
        </div>
        <div className="info-A2">
          <span>{numCubesFirstRow} </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder=""
            className="info-input-A2"
            readOnly={isCorrect}
          />
          <span>{numCubesSecondRow} </span>
        </div>
        <div>
          <div className="button-container-A2">
            <button
              className="operator-button-A2"
              onClick={() => handleButtonClick("<")}
            >
              {"<"}
            </button>
            <button
              className="operator-button-A2"
              onClick={() => handleButtonClick("=")}
            >
              {"="}
            </button>
            <button
              className="operator-button-A2"
              onClick={() => handleButtonClick(">")}
            >
              {">"}
            </button>
          </div>
          <div className="label-container-A2">
            <span className="operator-label-A2">kleiner als</span>
            <span className="operator-label-A2">gleich</span>
            <span className="operator-label-A2">grösser als</span>
          </div>
        </div>
        {difficulty === "hard" && (
          <div className="difference-container">
            <span className="title-text-small">
              Der Längenunterschied beträgt:
            </span>
            <input
              type="text"
              value={differenceValue}
              onChange={(e) => setDifferenceValue(e.target.value)}
              placeholder=""
              className="info-input-A2"
              readOnly={isCorrect}
            />
          </div>
        )}
        {isCorrect && displayCorrectness && (
          <CorrectnessLabel message="Richtig!" isVisible={true} />
        )}
        {((!!!isCorrect && displayCorrectness) || hintAllBoxes) && (
          <CorrectnessLabel
            message="Überprüfe die Kästchen!"
            isVisible={true}
          />
        )}
        <button
          onClick={isCorrect ? handleNext : checkInput}
          className="button-default"
          style={{ top: `${checkButtonTop}%`, left: "50%" }}
        >
          {isCorrect ? "🌟 Weiter 🌟" : "Prüfen"}
        </button>
      </div>
    </div>
  );
}

export default Activity2;
