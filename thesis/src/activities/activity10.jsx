/* activity10.jsx */
import React, { useState, useEffect } from "react";
import "../styles/activity10.css";
import "../defaults.css";
import {
  HomeLink,
  EndOfGame,
  CorrectnessLabel,
  checkButtonTop,
} from "../defaults";
import { predefinedSetsA10 } from "./predefinedSets.jsx";

function Activity10({ difficulty }) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [displayCorrectness, setCorrectnessLabel] = useState(false);
  const [numberLarge, setNumberLarge] = useState(0);
  const [numberSmall, setNumberSmall] = useState(0);
  const [columnValues, setColumnValues] = useState({
    col1: "",
    col2: "",
    col3: "",
    col4: "",
  }); /* tracks the values in the input fields */
  const [blueSquareValues, setBlueSquareValues] = useState({
    blue1: "",
    blue2: "",
    blue3: "",
  }); /* tracks the numbers in the assisting blue fields */
  const [minus, setMinus] =
    useState(false); /* enables the big red "-" in the hard version */
  const [selectedSet, setSelectedSet] = useState([]);
  const [incorrectFields, setIncorrectFields] = useState(
    []
  ); /* tracks the wrong fields to mark them */
  const [incorrectBlueFields, setIncorrectBlueFields] = useState(
    []
  ); /* tracks the wrong assisting fields to mark them */

  /* a set of numbers is selected */
  useEffect(() => {
    const sets =
      difficulty === "easy" ? predefinedSetsA10.easy : predefinedSetsA10.hard;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    setSelectedSet(randomSet);
  }, [difficulty]);

  /* numbers get parsed into an array with four distinct digits */
  useEffect(() => {
    if (selectedSet.length > 0) {
      const { numberLarge, numberSmall } = selectedSet[roundCount];
      setNumberLarge(Array.from(String(numberLarge), Number));
      setNumberSmall(Array.from(String(numberSmall), Number));
    }
  }, [selectedSet, roundCount]);

  /* changes the input of a colum */
  const handleInputChange = (column, value) => {
    setColumnValues((prevState) => ({
      ...prevState,
      [column]: value,
    }));
  };

  /* changes the input of a blue field */
  const handleBlueSquareChange = (blueSquare, value) => {
    setBlueSquareValues((prevState) => ({
      ...prevState,
      [blueSquare]: value,
    }));
  };

  /* changes the order of the numbers in the rectangle */
  const invertNumbers = () => {
    let swap = numberSmall;
    setNumberSmall(numberLarge);
    setNumberLarge(swap);
    setMinus(!minus);
  };

  /* checks if an exercise was solved correctly, tracks the wrong numbers to mark them red */
  const checkInput = () => {
    setCorrectnessLabel(true);
    setIncorrectFields([]);
    setIncorrectBlueFields([]);
    const { col1, col2, col3, col4 } = columnValues;
    const columnArray = [col1, col2, col3, col4];
    const blueArray = [
      blueSquareValues.blue3,
      blueSquareValues.blue2,
      blueSquareValues.blue1,
      0,
    ].map((value) => (value === "" ? 0 : parseInt(value)));
    let minusOne = 0;
    let isWrong = false;
    for (let i = 3; i >= 0; i--) {
      if (blueArray[i] !== minusOne) {
        setIncorrectBlueFields((prev) => [...prev, i]);
        isWrong = true;
      }
      if (
        numberLarge[i] < numberSmall[i] ||
        (numberLarge[i] === numberSmall[i] && minusOne === 1)
      ) {
        if (
          numberLarge[i] + 10 - numberSmall[i] - minusOne !==
          parseInt(columnArray[i], 10)
        ) {
          setIncorrectFields((prev) => [...prev, i]);
          isWrong = true;
        }
        minusOne = 1;
      } else {
        if (
          numberLarge[i] - numberSmall[i] - minusOne !==
          parseInt(columnArray[i], 10)
        ) {
          setIncorrectFields((prev) => [...prev, i]);
          isWrong = true;
        }
        minusOne = 0;
      }
    }
    const largeNumber = parseInt(numberLarge.join(""), 10);
    const smallNumber = parseInt(numberSmall.join(""), 10);
    const number = parseInt(`${col1}${col2}${col3}${col4}`, 10);
    if (largeNumber - smallNumber === number && !!!isWrong) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  /* resets the variables and increases the roundCount */
  const handleNext = () => {
    setColumnValues({ col1: "", col2: "", col3: "", col4: "" });
    setBlueSquareValues({ blue1: "", blue2: "", blue3: "" });
    setCorrectnessLabel(false);
    setIsCorrect(false);
    setMinus(false);
    setIncorrectFields([]);
    setIncorrectBlueFields([]);

    if (roundCount < selectedSet.length - 1) {
      setRoundCount(roundCount + 1);
    } else {
      setRoundCount(selectedSet.length);
    }
  };

  /* game is finished */
  if (roundCount >= Math.max(1, selectedSet.length - 1)) {
    /* Message that the game is completed */
    return (
      <EndOfGame
        levelName="Schriftliche Subtraktion"
        levelNr={9}
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
          Führe eine schriftliche Subtraktion durch:
        </span>
        {isCorrect && displayCorrectness && (
          <CorrectnessLabel message="Richtig!" isVisible={true} />
        )}
        {!isCorrect && displayCorrectness && (
          <CorrectnessLabel
            message="Überprüfe die markierten Kästchen!"
            isVisible={true}
            left="70%"
            top="76.5%"
          />
        )}

        <div className="number-container-A10">
          <div>
            <div style={{ display: "flex", width: "100%" }}>
              {minus && <div className="minus-top-A10">-</div>}
              {difficulty === "hard" && (
                <button onClick={invertNumbers} className="invert-button-A10">
                  ↓↑
                </button>
              )}
              <div className="number-box-A10">
                <div className="number-row-A10">
                  <span
                    className="number-A10-tutorial"
                    style={{ width: "1vw", display: "inline-block" }}
                  >
                    {""}
                  </span>
                  <div className="number-A10">{numberLarge[0]}</div>
                  <div className="number-A10">{numberLarge[1]}</div>
                  <div className="number-A10">{numberLarge[2]}</div>
                  <div className="number-A10">{numberLarge[3]}</div>
                </div>
                <div className="number-row-A10">
                  <span className="number-A10-tutorial">-</span>
                  <div className="number-A10">{numberSmall[0]}</div>
                  <div className="number-A10">{numberSmall[1]}</div>
                  <div className="number-A10">{numberSmall[2]}</div>
                  <div className="number-A10">{numberSmall[3]}</div>
                </div>
              </div>
            </div>
            <div className="input-fields-A10">
              <div className="input-row-A10">
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    border: incorrectBlueFields.includes(2)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={blueSquareValues.blue1}
                  onChange={(e) =>
                    handleBlueSquareChange("blue1", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(3)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col4}
                  onChange={(e) => handleInputChange("col4", e.target.value)}
                />
              </div>
              <div className="coin-row-divider-A10" />
              <div className="input-row-A10">
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    border: incorrectBlueFields.includes(1)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={blueSquareValues.blue2}
                  onChange={(e) =>
                    handleBlueSquareChange("blue2", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(2)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col3}
                  onChange={(e) => handleInputChange("col3", e.target.value)}
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(3)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col4}
                  onChange={(e) => handleInputChange("col4", e.target.value)}
                />
              </div>
              <div className="coin-row-divider-A10" />
              <div className="input-row-A10">
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    border: incorrectBlueFields.includes(0)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={blueSquareValues.blue3}
                  onChange={(e) =>
                    handleBlueSquareChange("blue3", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(1)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col2}
                  onChange={(e) => handleInputChange("col2", e.target.value)}
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(2)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col3}
                  onChange={(e) => handleInputChange("col3", e.target.value)}
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(3)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col4}
                  onChange={(e) => handleInputChange("col4", e.target.value)}
                />
              </div>
              <div className="coin-row-divider-A10" />
              <div className="input-row-A10">
                {minus && <div className="minus-bot-A10">-</div>}
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(0)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col1}
                  onChange={(e) => handleInputChange("col1", e.target.value)}
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(1)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col2}
                  onChange={(e) => handleInputChange("col2", e.target.value)}
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(2)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col3}
                  onChange={(e) => handleInputChange("col3", e.target.value)}
                />
                <input
                  type="text"
                  className="input-A10"
                  style={{
                    border: incorrectFields.includes(3)
                      ? "2px solid red"
                      : "1px solid var(--text-color)",
                  }}
                  value={columnValues.col4}
                  onChange={(e) => handleInputChange("col4", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

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

export default Activity10;
