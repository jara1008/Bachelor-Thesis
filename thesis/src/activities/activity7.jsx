/* activity7.jsx */
import React, { useState, useEffect, useCallback } from "react";
import "../styles/activity7.css";
import "../defaults.css";
import { HomeLink, EndOfGame, CorrectnessLabel } from "../defaults";
import { predefinedSetsA7 } from "./predefinedSets.jsx";

function Activity7({ difficulty }) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [displayCorrectness, setCorrectnessLabel] = useState(false);
  const [numberLarge, setNumberLarge] = useState([]);
  const [numberSmall, setNumberSmall] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedSet, setSelectedSet] = useState([]);
  const nrCols = difficulty === "hard" ? 4 : 3;
  const [lastAcceptedTopValues, setLastAcceptedTopValues] = useState(
    Array(nrCols).fill(0)
  );
  const [lastAcceptedBotValues, setLastAcceptedBotValues] = useState(
    Array(nrCols).fill(0)
  );
  const [incorrectFields, setIncorrectFields] = useState([]);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  /* Hints */
  const [hintSwap, setHintSwap] = useState(false);
  const [hintNoSwap, setHintNoSwap] = useState(false);
  const [hintCheckLastRow, setHintCheckLastRow] = useState(false);

  /* selects a predefined set of numbers */
  useEffect(() => {
    const sets =
      difficulty === "easy" ? predefinedSetsA7.easy : predefinedSetsA7.hard;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    setSelectedSet(randomSet);
  }, [difficulty]);

  /* renders new numbers for each round */
  /* AI: chatGPT made the parsing from the numbers to be displayed nicely in the table */
  const generateNewNumbers = useCallback(() => {
    if (selectedSet.length > 0) {
      const { large, small } = selectedSet[roundCount];
      const newLargeValues = String(large)
        .padStart(nrCols, "0")
        .split("")
        .map(Number);
      const newSmallValues = String(small)
        .padStart(nrCols, "0")
        .split("")
        .map(Number);

      setNumberLarge(newLargeValues);
      setNumberSmall(newSmallValues);

      const newRows = [];
      const newInputRow = {
        type: "input",
        valuesTop: Array(nrCols).fill(""),
        valuesBottom: Array(nrCols).fill(""),
      };
      newRows.push(newInputRow);
      setRows(newRows);

      setLastAcceptedTopValues(newLargeValues.map((value, index) => value));
      setLastAcceptedBotValues(newSmallValues.map((value, index) => value));

      setIsCorrect(false);
      setCorrectnessLabel(false);
    }
  }, [nrCols, roundCount, selectedSet]);

  useEffect(() => {
    generateNewNumbers();
  }, [generateNewNumbers]);

  /* checks if the exercise was solved correctly */
  const checkInput = () => {
    const sol = parseInt(numberLarge.join("")) - parseInt(numberSmall.join(""));
    const input = parseInt(rows[rows.length - 1].valuesTop.join(""));
    const hasOnlyZeroValue = rows[rows.length - 1].valuesBottom
      .map((value) => parseInt(value, 10))
      .every((value) => value === 0);
    if (hasOnlyZeroValue && sol === input) {
      setCorrectnessLabel(true);
      setIsCorrect(true);
      setHintNoSwap(false);
      setHintCheckLastRow(false);
      setHintSwap(false);
      setIncorrectFields([]);
    } else {
      const currentTopValues = rows[rows.length - 1].valuesTop.map((value) => {
        return parseInt(value, 10);
      });
      const currentBotValues = rows[rows.length - 1].valuesBottom.map(
        (value) => {
          return parseInt(value, 10);
        }
      );
      if (checkIntermediate(currentTopValues, currentBotValues)) {
        setHintSwap(true);
        setHintCheckLastRow(false);
        setHintNoSwap(false);
        return;
      } else {
        setHintCheckLastRow(true);
        setHintNoSwap(false);
        setHintSwap(false);
      }
    }
  };

  /* updates roundCount and triggers the generation of the next numbers */
  const handleNext = () => {
    if (roundCount < selectedSet.length - 1) {
      generateNewNumbers();
      setRoundCount((prevCount) => prevCount + 1);
    } else {
      setRoundCount(selectedSet.length); /* End game condition */
    }
    setCurrentRowIndex(0);
  };

  /* handles the insertion of numbers in the input fields for the top row */
  const handleRowInputChangeTop = (rowIndex, colIndex, event) => {
    const newRows = [...rows];
    newRows[rowIndex].valuesTop[colIndex] = event.target.value;
    setRows(newRows);
  };

  /* handles the insertion of numbers in the input fields for the bottom row */
  const handleRowInputChangeBottom = (rowIndex, colIndex, event) => {
    const newRows = [...rows];
    newRows[rowIndex].valuesBottom[colIndex] = event.target.value;
    setRows(newRows);
  };

  /* this function is triggered upon clicking a "Tauschen" button */
  const handleDecrease = (index) => {
    /* Create a copy of the current input values */
    const newRowValues = [...rows];
    /* Parse the current value to an integer */
    var currentTopValues = newRowValues[newRowValues.length - 1].valuesTop.map(
      (value) => {
        return parseInt(value, 10);
      }
    );

    var currentBotValues = newRowValues[
      newRowValues.length - 1
    ].valuesBottom.map((value) => {
      return parseInt(value, 10);
    });

    if (!checkIntermediate(currentTopValues, currentBotValues)) {
      setHintCheckLastRow(true);
      setHintNoSwap(false);
      setHintSwap(false);
      return;
    }

    /* Increase the next value by 10 */
    if (
      currentTopValues[index] < 1 ||
      currentTopValues[index + 1] + 10 > 10 ||
      (currentBotValues[index + 1] === 0 && currentBotValues[index + 2] === 0)
    ) {
      setHintNoSwap(true);
      setHintSwap(false);
      setHintCheckLastRow(false);
      return;
    }
    currentTopValues[index] = currentTopValues[index] - 1;
    currentTopValues[index + 1] += 10;

    /* Add new rows */
    const newRowsCopy = [...rows];
    const newRow = currentTopValues.map((value, idx) => ({
      top: value,
      bottom: currentBotValues[idx],
    }));
    newRowsCopy.push(newRow);
    console.log("INDEX:", index);
    /* Add a new row with input fields */
    const newInputRow = {
      type: "input",
      valuesTop: currentTopValues.map((value, idx) =>
        idx === index + 1 ? "" : value
      ),
      valuesBottom: currentBotValues.map((value, idx) =>
        idx === index + 1 ? "" : value
      ),
    };
    newRowsCopy.push(newInputRow);

    setRows(newRowsCopy);

    setLastAcceptedTopValues(currentTopValues);
    setLastAcceptedBotValues(currentBotValues);
    setCurrentRowIndex(currentRowIndex + 2);
  };

  /* after clicking "Tauschen" the current input values are checked for correctness */
  /* the new row is only generated if the last one is correct */
  /* incorrect fields get indentified and marked */
  const checkIntermediate = (currentTopValues, currentBotValues) => {
    setIncorrectFields([]);
    let isIncorrect = false;
    for (let i = 0; i < currentTopValues.length; i++) {
      const topNr = lastAcceptedTopValues[i];
      const botNr = lastAcceptedBotValues[i];
      if (botNr < topNr) {
        if (topNr - botNr !== currentTopValues[i]) {
          setIncorrectFields((prev) => [...prev, i]);
          isIncorrect = true;
        }
        if (currentBotValues[i] !== 0) {
          setIncorrectFields((prev) => [...prev, i + 4]);
          isIncorrect = true;
        }
      } else if (botNr > topNr) {
        if (botNr - topNr !== currentBotValues[i]) {
          setIncorrectFields((prev) => [...prev, i + 4]);
          isIncorrect = true;
        }
        if (currentTopValues[i] !== 0) {
          setIncorrectFields((prev) => [...prev, i]);
          isIncorrect = true;
        }
      } else if (botNr === topNr) {
        if (currentBotValues[i] !== 0) {
          setIncorrectFields((prev) => [...prev, i + 4]);
          isIncorrect = true;
        }
        if (currentTopValues[i] !== 0) {
          setIncorrectFields((prev) => [...prev, i]);
          isIncorrect = true;
        }
      }
    }
    if (isIncorrect) {
      setCorrectnessLabel(true);
      return false;
    }
    setCorrectnessLabel(false);
    return true;
  };

  /* game is finished */
  if (roundCount >= Math.max(1, selectedSet.length - 1)) {
    return (
      <EndOfGame
        levelName="Tabellensubtraktion"
        levelNr={6}
        difficulty={difficulty}
      />
    );
  }

  /* renders all visible components on the page */
  return (
    <div className="container">
      <div className="white-box-tall">
        <HomeLink top="-6%" />
        <span className="title-text">Löse die Rechnung:</span>
        {isCorrect && displayCorrectness && (
          <CorrectnessLabel
            message="Richtig!"
            isVisible={true}
            top="82%"
            left="78%"
          />
        )}
        {hintSwap && (
          <CorrectnessLabel
            message="Hier kannst du etwas tauschen!"
            isVisible={true}
            top="82%"
            left="76%"
            width="14vw"
          />
        )}
        {hintNoSwap && (
          <CorrectnessLabel
            message="Hier sollst du nicht tauschen!"
            isVisible={true}
            top="82%"
            left="76%"
            width="14vw"
          />
        )}
        {hintCheckLastRow && (
          <CorrectnessLabel
            message="Überprüfe die markierten Kästchen!"
            isVisible={true}
            top="82%"
            left="78%"
          />
        )}

        {/* AI: the structure of the table was originally made by ChatGPT to give a quick start */}
        <table className="number-table-A7">
          {nrCols === 4 && (
            <thead>
              <tr>
                <th style={{ border: "none" }}>
                  <button
                    className="header-button"
                    onClick={() => handleDecrease(0)}
                  >
                    Tauschen
                  </button>
                </th>
                <th style={{ border: "none" }}>
                  <button
                    className="header-button"
                    onClick={() => handleDecrease(1)}
                  >
                    Tauschen
                  </button>
                </th>
                <th style={{ border: "none" }}>
                  <button
                    className="header-button"
                    onClick={() => handleDecrease(2)}
                  >
                    Tauschen
                  </button>
                </th>
                <th style={{ border: "none" }}></th>
              </tr>
              <tr>
                <th style={{ backgroundColor: "var(--primary-color)" }}>
                  1000
                </th>
                <th style={{ backgroundColor: "var(--primary-color)" }}>100</th>
                <th style={{ backgroundColor: "var(--primary-color)" }}>10</th>
                <th style={{ backgroundColor: "var(--primary-color)" }}>1</th>
              </tr>
            </thead>
          )}
          {nrCols === 3 && (
            <thead>
              <tr>
                <th style={{ border: "none" }}>
                  <button
                    className="header-button"
                    onClick={() => handleDecrease(0)}
                  >
                    Tauschen
                  </button>
                </th>
                <th style={{ border: "none" }}>
                  <button
                    className="header-button"
                    onClick={() => handleDecrease(1)}
                  >
                    Tauschen
                  </button>
                </th>
                <th style={{ border: "none" }}></th>
              </tr>
              <tr>
                <th style={{ backgroundColor: "var(--primary-color)" }}>100</th>
                <th style={{ backgroundColor: "var(--primary-color)" }}>10</th>
                <th style={{ backgroundColor: "var(--primary-color)" }}>1</th>
              </tr>
            </thead>
          )}
          <tbody>
            <tr>
              {numberLarge.map((digit, index) => (
                <td key={index} className="number-cell">
                  <div className="number-font">{digit}</div>
                  <div className="number-font">
                    {index === 0 && (
                      <span
                        className="minus-sign-A7"
                        style={{ display: "inline-block" }}
                      >
                        -
                      </span>
                    )}
                    {numberSmall[index]}
                  </div>
                </td>
              ))}
            </tr>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.type === "input"
                  ? row.valuesTop.map((value, index) => (
                      <td key={index} className="number-cell">
                        <input
                          type="text"
                          value={value}
                          onChange={(event) =>
                            handleRowInputChangeTop(rowIndex, index, event)
                          }
                          className="input-field-A7"
                          style={{
                            border:
                              rowIndex === currentRowIndex &&
                              incorrectFields.includes(index)
                                ? "2px solid red"
                                : "1px solid var(--text-color)",
                          }}
                        />
                        <input
                          type="text"
                          value={row.valuesBottom[index]}
                          onChange={(event) =>
                            handleRowInputChangeBottom(rowIndex, index, event)
                          }
                          className="input-field-A7"
                          style={{
                            marginTop: "5px",
                            border:
                              rowIndex === currentRowIndex &&
                              incorrectFields.includes(index + 4)
                                ? "2px solid red"
                                : "1px solid var(--text-color)",
                          }}
                        />
                        <span
                          className="minus-sign-A7"
                          style={{ display: "inline-block" }}
                        >
                          -
                        </span>
                      </td>
                    ))
                  : row.map((value, index) => (
                      <td key={index} className="number-cell">
                        <div className="number-font">{value.top}</div>
                        <span
                          className="minus-sign-A7"
                          style={{ display: "inline-block" }}
                        >
                          -
                        </span>
                        <div className="number-font">{value.bottom}</div>
                      </td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={isCorrect ? handleNext : checkInput}
          className="button-default"
          style={{ top: "94%", left: "50%" }}
        >
          {isCorrect ? "🌟 Weiter 🌟" : "Prüfen"}
        </button>
      </div>
    </div>
  );
}

export default Activity7;
