import React, { useState, useEffect } from 'react';
import './activityTwo.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';
import { incrementHighestUnlockedLevel } from "../utils/utils.jsx";

function ActivityTwo() {
    const [numCubesFirstRow, setNumCubesFirstRow] = useState(0);
    const [numCubesSecondRow, setNumCubesSecondRow] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [lastDigits, setLastDigits] = useState({ leftValue: -1, rightValue: -1 });

    useEffect(() => {
        shuffleCubes();
    }, []);

    const checkInput = () => {
        setCorrectnessLabel(true);
        if ((inputValue === '<' && numCubesFirstRow < numCubesSecondRow) ||
            (inputValue === '>' && numCubesFirstRow > numCubesSecondRow) ||
            (inputValue === '=' && numCubesFirstRow === numCubesSecondRow)) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleButtonClick = (value) => {
        setInputValue(value);
    };    

    const handleNext = () => {
        shuffleCubes();
    };

    const shuffleCubes = () => {
        if (roundCount<5) {
            let randomNumCubesFirstRow;
            let randomNumCubesSecondRow;
            do {
                randomNumCubesFirstRow = Math.floor(Math.random() * 10) + 1;
                randomNumCubesSecondRow = Math.floor(Math.random() * 10) + 1;
            } while (randomNumCubesFirstRow === lastDigits.leftValue && randomNumCubesSecondRow === lastDigits.rightValue);
            setNumCubesFirstRow(randomNumCubesFirstRow);
            setNumCubesSecondRow(randomNumCubesSecondRow);
            setLastDigits({ leftValue: randomNumCubesFirstRow, rightValue: randomNumCubesSecondRow });
            setIsCorrect(false);
            setInputValue('');
            setCorrectnessLabel(false);
        }
    }

    if (roundCount >= 5) {
        // Message that the game is completed
        return (
            <div className="container-A2">
                <div className="white-box-A2">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message-A2">
                        Gratulation! Du hast Level xy geschafft!
                        { /* Add party icon */ }
                    </div>
                    <Link to={"/"}>
                        <button className='button-A2'
                            style={{ top: '85%', left: '50%', width: '30%' }} 
                            onClick={incrementHighestUnlockedLevel(2)}>
                            zur Übersicht
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-A2" >
            <div className="white-box-A2" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper-A2">Wähle {"<, >, ="} passend: </span>
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
                <div className="button-container-A2">
                    <button className="operator-button-A2" onClick={() => handleButtonClick('<')}>{'<'}</button>
                    <button className="operator-button-A2" onClick={() => handleButtonClick('=')}>{'='}</button>
                    <button className="operator-button-A2" onClick={() => handleButtonClick('>')}>{'>'}</button>
                </div>
                {isCorrect && displayCorrectness && <div className="correctness-label-A2">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-A2">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-A2" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityTwo;