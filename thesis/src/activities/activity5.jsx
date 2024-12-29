/* activity5.jsx */
import React, { useState, useEffect, useCallback } from "react";
import "../styles/activity5.css";
import "../defaults.css";
import {
  HomeLink,
  EndOfGame,
  CorrectnessLabel,
  checkButtonTop,
} from "../defaults";
import { predefinedSetsA5 } from "./predefinedSets.jsx";

function Activity5({ difficulty }) {
  const [numbers, setNumbers] = useState({ largeNum: 0, smallNum: 0 });
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [displayCorrectness, setCorrectnessLabel] = useState(false);
  const [selectedSet, setSelectedSet] = useState([]);

  /* load a predefined set of numbers */
  useEffect(() => {
    const sets =
      difficulty === "easy" ? predefinedSetsA5.easy : predefinedSetsA5.hard;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    setSelectedSet(randomSet);
  }, [difficulty]);

  /* sets the numbers for the current round and resets variables */
  const generateNewNumbers = useCallback(() => {
    if (selectedSet.length > 0) {
      setNumbers(selectedSet[roundCount]);
      setIsCorrect(false);
      setInputValue("");
      setCorrectnessLabel(false);
    }
  }, [roundCount, selectedSet]);

  useEffect(() => {
    generateNewNumbers();
  }, [generateNewNumbers, roundCount, selectedSet]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /* checks if the exercise was correctly solved */
  const checkInput = () => {
    setCorrectnessLabel(true);
    if (parseInt(inputValue) === numbers.largeNum - numbers.smallNum) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  /* increases the number of the current round */
  const handleNext = () => {
    if (roundCount < selectedSet.length - 1) {
      setRoundCount((prevCount) => prevCount + 1);
    } else {
      setRoundCount(selectedSet.length); /* End game condition */
    }
  };

  /* game is finished */
  if (roundCount >= Math.max(1, selectedSet.length)) {
    /* Message that the game is completed */
    return (
      <EndOfGame
        levelName="Additionsrätsel"
        levelNr={4}
        difficulty={difficulty}
      />
    );
  }

  /* renders all the visible components of the page */
  return (
    <div className="container">
      <div className="white-box-regular">
        <HomeLink />
        <span className="title-text">
          Fülle das Kästchen so, dass die Rechnung stimmt:{" "}
        </span>
        <div className="info-A5">
          {numbers.smallNum} +
          <input
            type="text"
            value={inputValue}
            placeholder=""
            onChange={handleInputChange}
            className="info-input-A5"
            readOnly={isCorrect}
          />
          = {numbers.largeNum}
        </div>
        {isCorrect && displayCorrectness && (
          <CorrectnessLabel message="Richtig!" isVisible={true} />
        )}
        {!isCorrect && displayCorrectness && (
          <CorrectnessLabel
            message="Überprüfe das Kästchen!"
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

export default Activity5;
