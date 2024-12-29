import React, { useState, useEffect, useCallback } from "react";
import "../styles/activity9.css";
import "../defaults.css";
import {
  HomeLink,
  EndOfGame,
  CorrectnessLabel,
  checkButtonTop,
} from "../defaults";
import { predefinedSetsA9 } from "./predefinedSets.jsx";

function Activity9({ difficulty }) {
  const [selectedSet, setSelectedSet] = useState([]);
  const [roundCount, setRoundCount] = useState(0);
  const [activeCoins, setActiveCoins] = useState(new Set());
  const [leftCoinsTen, setLeftCoinsTen] = useState(0);
  const [leftCoinsOne, setLeftCoinsOne] = useState(0);
  const [rightCoinsTen, setRightCoinsTen] = useState(0);
  const [rightCoinsOne, setRightCoinsOne] = useState(0);
  const [leftCoinsVisibleOne, setLeftCoinsVisibleOne] = useState(0);
  const [leftCoinsVisibleTen, setLeftCoinsVisibleTen] = useState(0);
  const [rightCoinsVisibleOne, setRightCoinsVisibleOne] = useState(0);
  const [rightCoinsVisibleTen, setRightCoinsVisibleTen] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [displayCorrectness, setCorrectnessLabel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [allCoinsCrossed, setAllCoinsCrossed] = useState(false);

  /* Hints */
  const [hintCrossAllCoins, setHintCrossAllCoins] = useState(false);
  const [hintNothingToSwap, setHintNothingToSwap] = useState(false);
  const [hintSomethingToSwap, setHintSomethingToSwap] = useState(false);

  useEffect(() => {
    const sets =
      difficulty === "easy" ? predefinedSetsA9.easy : predefinedSetsA9.hard;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    setSelectedSet(randomSet);
  }, [difficulty]);

  const generateNewNumbers = useCallback(() => {
    if (selectedSet.length > 0 && roundCount < selectedSet.length) {
      const { leftValue, rightValue } = selectedSet[roundCount];
      const leftTen = Math.floor(leftValue / 10);
      const leftOne = leftValue % 10;
      const rightTen = Math.floor(rightValue / 10);
      const rightOne = rightValue % 10;

      setLeftCoinsTen(leftTen);
      setLeftCoinsOne(leftOne);
      setRightCoinsTen(rightTen);
      setRightCoinsOne(rightOne);
      setLeftCoinsVisibleOne(leftOne);
      setLeftCoinsVisibleTen(leftTen);
      setRightCoinsVisibleOne(rightOne);
      setRightCoinsVisibleTen(rightTen);
      setActiveCoins(new Set());
      setIsCorrect(false);
      setCorrectnessLabel(false);
      setInputValue("");
      setAllCoinsCrossed(false);
    }
  }, [roundCount, selectedSet]);

  useEffect(() => {
    if (selectedSet.length > 0) {
      generateNewNumbers();
    }
  }, [selectedSet, roundCount, generateNewNumbers]);

  const leftVal = leftCoinsOne + leftCoinsTen * 10;
  const rightVal = rightCoinsOne + rightCoinsTen * 10;

  const checkAllCoinsCrossed = (newActiveCoins) => {
    const leftCoinCount = leftCoinsTen + leftCoinsOne;
    const crossedLeftCoins = newActiveCoins.size / 2;
    console.log(newActiveCoins);
    console.log("CROSSED:", crossedLeftCoins);
    return crossedLeftCoins === leftCoinCount;
  };

  const CoinRowUpper = ({ coinsTen, coinsOne, type }) => (
    <div className="coin-stack-A9">
      {Array.from({ length: coinsTen }, (_, i) => {
        const coinKey = `${type}-tens-${i}`;
        const isActive = activeCoins.has(coinKey);
        const className = `coin-A9 ${type}-coin ${isActive ? "active-coin-A9" : ""}`;
        return (
          <div
            key={`ten-${i}`}
            className={className}
            style={{ cursor: "pointer" }}
            onClick={() => handleCoinClick(type, "tens", i)}
          >
            10
          </div>
        );
      })}
      {Array.from({ length: coinsOne }, (_, i) => {
        const coinKey = `${type}-ones-${i}`;
        const isActive = activeCoins.has(coinKey);
        const className = `coin-A9 ${type}-coin ${isActive ? "active-coin-A9" : ""}`;
        return (
          <div
            key={`one-${i}`}
            className={className}
            style={{ cursor: "pointer" }}
            onClick={() => handleCoinClick(type, "ones", i)}
          >
            1
          </div>
        );
      })}
    </div>
  );

  const CoinRowLower = ({ coinsTen, coinsOne, type }) => (
    <div className="coin-stack-A9">
      {Array.from({ length: coinsTen }, (_, i) => (
        <div key={`ten-${i}`} className={`coin-A9 ${type}-coin`}>
          10
        </div>
      ))}
      {Array.from({ length: coinsOne }, (_, i) => (
        <div key={`one-${i}`} className={`coin-A9 ${type}-coin`}>
          1
        </div>
      ))}
    </div>
  );

  const handleCoinClick = (type, denomination, index) => {
    const coinKey = `${type}-${denomination}-${index}`;
    const oppositeType = type === "left" ? "right" : "left";
    if (
      Array.from(activeCoins).length / 2 === leftCoinsOne + leftCoinsTen &&
      type === "right"
    ) {
      return;
    }

    setActiveCoins((prevActiveCoins) => {
      const newActiveCoins = new Set(prevActiveCoins);
      if (newActiveCoins.has(coinKey)) {
        newActiveCoins.delete(coinKey);

        const maxCoins = denomination === "tens" ? leftCoinsTen : leftCoinsOne;
        for (let i = 0; i < maxCoins; i++) {
          const oppositeCoinKey = `${oppositeType}-${denomination}-${i}`;
          if (newActiveCoins.has(oppositeCoinKey)) {
            newActiveCoins.delete(oppositeCoinKey);
            break;
          }
        }

        if (denomination === "tens") {
          setLeftCoinsVisibleTen((prevCount) => prevCount + 1);
          setRightCoinsVisibleTen((prevCount) => prevCount + 1);
        } else {
          setLeftCoinsVisibleOne((prevCount) => prevCount + 1);
          setRightCoinsVisibleOne((prevCount) => prevCount + 1);
        }
      } else if (
        (denomination === "tens" &&
          leftCoinsVisibleTen > 0 &&
          rightCoinsVisibleTen > 0) ||
        (denomination === "ones" &&
          leftCoinsVisibleOne > 0 &&
          rightCoinsVisibleOne > 0)
      ) {
        newActiveCoins.add(coinKey);

        const maxCoins = denomination === "tens" ? leftCoinsTen : leftCoinsOne;
        for (let i = 0; i < maxCoins; i++) {
          const oppositeCoinKey = `${oppositeType}-${denomination}-${i}`;
          if (!newActiveCoins.has(oppositeCoinKey)) {
            newActiveCoins.add(oppositeCoinKey);
            break;
          }
        }

        if (denomination === "tens") {
          setLeftCoinsVisibleTen((prevCount) => prevCount - 1);
          setRightCoinsVisibleTen((prevCount) => prevCount - 1);
        } else if (leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) {
          setLeftCoinsVisibleOne((prevCount) => prevCount - 1);
          setRightCoinsVisibleOne((prevCount) => prevCount - 1);
        }
      }

      if (checkAllCoinsCrossed(newActiveCoins)) {
        setAllCoinsCrossed(true);
      } else {
        setAllCoinsCrossed(false);
      }

      return newActiveCoins;
    });
  };

  const handleConversion = () => {
    setHintCrossAllCoins(false);
    setHintNothingToSwap(false);
    setHintSomethingToSwap(false);
    if (
      (leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) ||
      (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen > 0)
    ) {
      setHintCrossAllCoins(true);
      return;
    }
    if (
      rightCoinsVisibleTen === 0 ||
      rightCoinsVisibleOne > 0 ||
      leftCoinsVisibleOne === 0
    ) {
      setHintNothingToSwap(true);
    }

    if (
      leftCoinsVisibleTen === 0 &&
      rightCoinsVisibleTen > 0 &&
      rightCoinsVisibleOne === 0
    ) {
      const newRightCoinsTen = rightCoinsTen - 1;
      const newRightCoinsVisibleTen = rightCoinsVisibleTen - 1;
      const newRightCoinsOne = rightCoinsOne + 10;
      const newRightCoinsVisibleOne = rightCoinsVisibleOne + 10;

      setRightCoinsTen(newRightCoinsTen);
      setRightCoinsOne(newRightCoinsOne);
      setRightCoinsVisibleOne(newRightCoinsVisibleOne);
      setRightCoinsVisibleTen(newRightCoinsVisibleTen);
    }
  };

  const checkInput = () => {
    setHintCrossAllCoins(false);
    setHintNothingToSwap(false);
    setHintSomethingToSwap(false);
    setCorrectnessLabel(true);
    if (parseInt(inputValue) === leftVal - rightVal) {
      setIsCorrect(true);
      setHintCrossAllCoins(false);
      setHintNothingToSwap(false);
    } else {
      if (
        (leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) ||
        (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen > 0)
      ) {
        setHintCrossAllCoins(true);
      } else if (
        rightCoinsVisibleTen > 0 &&
        rightCoinsVisibleOne === 0 &&
        leftCoinsVisibleOne > 0
      ) {
        setHintSomethingToSwap(true);
      }
    }
  };

  const handleNext = () => {
    if (roundCount < selectedSet.length - 1) {
      setRoundCount(roundCount + 1);
    } else {
      // End game condition
    }
  };

  if (roundCount >= Math.max(1, selectedSet.length - 1)) {
    return (
      <EndOfGame
        levelName="Münzen subtrahieren 2"
        levelNr={8}
        difficulty={difficulty}
      />
    );
  }

  return (
    <div className="container">
      <div className="white-box-large">
        <HomeLink />
        {difficulty === "easy" && (
          <div className="title-text">
            Klicke auf die Münzen, um sie zu streichen. Löse die Rechnung:
          </div>
        )}
        {difficulty === "hard" && (
          <div className="title-text">
            Klicke auf die Münzen, um sie zu streichen. Tausche eine grössere
            für kleinere falls nötig. Löse die Rechnung:
          </div>
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
              onClick={handleConversion}
              className="header-button center-button"
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
          <CoinRowUpper
            coinsTen={leftCoinsTen}
            coinsOne={leftCoinsOne}
            type="left"
          />
          <span
            className="symbol-A9"
            style={{ "--left": "-2%", "--top": "55%" }}
          >
            -
          </span>
          <CoinRowUpper
            coinsTen={rightCoinsTen}
            coinsOne={rightCoinsOne}
            type="right"
          />
          <hr className="coin-row-divider" />
        </div>
        <div className="coin-row-A9" style={{ "--top": "60%" }}>
          {!!!allCoinsCrossed && (
            <span
              className="symbol-A9"
              style={{ "--left": "-5%", "--top": "17%" }}
            >
              =
            </span>
          )}
          {allCoinsCrossed && (
            <span
              className="symbol-A9"
              style={{ "--left": "-5%", "--top": "45%" }}
            >
              =
            </span>
          )}
          <CoinRowLower
            coinsTen={leftCoinsVisibleTen}
            coinsOne={leftCoinsVisibleOne}
            type="left"
          />
          {!!!allCoinsCrossed && (
            <span
              className="symbol-A9"
              style={{ "--left": "-2%", "--top": "68%" }}
            >
              -
            </span>
          )}
          {allCoinsCrossed && (
            <span
              className="symbol-A9"
              style={{ "--left": "-2%", "--top": "40%" }}
            >
              -
            </span>
          )}
          <CoinRowLower
            coinsTen={rightCoinsVisibleTen}
            coinsOne={rightCoinsVisibleOne}
            type="right"
          />
        </div>
        <div className="coin-row-A9" style={{ "--top": "86%" }}>
          <span className="symbol-A9" style={{ "--left": "-5%" }}>
            =
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder=""
            className="info-input-A9"
            readOnly={isCorrect}
          />
        </div>
        {isCorrect && displayCorrectness && (
          <CorrectnessLabel message="Richtig!" isVisible={true} left="79.5%" />
        )}
        {!isCorrect && displayCorrectness && (
          <CorrectnessLabel
            message="Überprüfe das Kästchen!"
            isVisible={true}
            left="79.5%"
          />
        )}
        {hintNothingToSwap && (
          <CorrectnessLabel
            message="Hier sollst du nicht tauschen!"
            isVisible={true}
            left="73.5%"
            top="76%"
          />
        )}
        {hintCrossAllCoins && (
          <CorrectnessLabel
            message="Streiche so viele Münzen, wie du kannst!"
            isVisible={true}
            left="73.5%"
            top="76%"
          />
        )}
        {hintSomethingToSwap && (
          <CorrectnessLabel
            message="Hier kannst du tauschen!"
            isVisible={true}
            left="73.5%"
            top="76%"
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

export default Activity9;
