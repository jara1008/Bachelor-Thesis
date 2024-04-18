import React, { useState, useEffect } from 'react';
import './activityTwo.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';


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
            setIsCorrect(false);
            setCorrectnessLabel(false);
        }
    }

    if (roundCount >= 5) {
        // Message that the game is completed
        return (
            <div className="container">
                <div className="white-box">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message">
                        Gratulation! Du hast Level xy geschafft!
                        { /* Add party icon */ }
                    </div>
                    <Link to={"/"}>
                        <button className='button'
                            style={{ top: '85%', left: '50%', width: '30%' }} >
                            zur Übersicht
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container" >
            <div className="white-box" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper">Wähle {"<, >, ="} passend: </span>
                <div className="cube-rows">
                    <div className="cube-row">
                        {Array.from({ length: numCubesFirstRow }, (_, index) => (
                            <div key={index} className="cube">
                                <span className="cube-label">1cm</span>
                            </div>
                        ))}
                    </div>
                    <div className="cube-row">
                        {Array.from({ length: numCubesSecondRow }, (_, index) => (
                            <div key={index} className="cube">
                                <span className="cube-label">1cm</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="info">
                    <span>{numCubesFirstRow} </span>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input"
                        readOnly={isCorrect}
                    />
                    <span>{numCubesSecondRow} </span>
                </div>
                {isCorrect && displayCorrectness && <div className="correctness-label-correct">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-false">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityTwo;