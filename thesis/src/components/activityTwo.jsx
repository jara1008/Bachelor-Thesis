import React, { useState, useEffect, useCallback } from 'react';
import './activityTwo.css';
import { HomeLink, EndOfGame, ROUNDCOUNT } from '../defaults';

function ActivityTwo() {
    const [numCubesFirstRow, setNumCubesFirstRow] = useState(0);
    const [numCubesSecondRow, setNumCubesSecondRow] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [, setLastDigits] = useState({ leftValue: -1, rightValue: -1 });

    const shuffleCubes = useCallback(() => {
        setLastDigits((prevLastDigits) => {
            let randomNumCubesFirstRow;
            let randomNumCubesSecondRow;
            do {
                randomNumCubesFirstRow = Math.floor(Math.random() * 10) + 1;
                randomNumCubesSecondRow = Math.floor(Math.random() * 10) + 1;
            } while (
                randomNumCubesFirstRow === prevLastDigits.leftValue &&
                randomNumCubesSecondRow === prevLastDigits.rightValue
            );
            setNumCubesFirstRow(randomNumCubesFirstRow);
            setNumCubesSecondRow(randomNumCubesSecondRow);
            setIsCorrect(false);
            setInputValue('');
            setCorrectnessLabel(false);
            return { leftValue: randomNumCubesFirstRow, rightValue: randomNumCubesSecondRow };
        });
    }, []);

    useEffect(() => {
        shuffleCubes();
    }, [shuffleCubes]);

    const checkInput = () => {
        setCorrectnessLabel(true);
        if (
            (inputValue === '<' && numCubesFirstRow < numCubesSecondRow) ||
            (inputValue === '>' && numCubesFirstRow > numCubesSecondRow) ||
            (inputValue === '=' && numCubesFirstRow === numCubesSecondRow)
        ) {
            setIsCorrect(true);
            setRoundCount((prevRoundCount) => prevRoundCount + 1);
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

    if (roundCount >= ROUNDCOUNT) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Längen Vergleich" levelNr={2} />;
    }

    return (
        <div className="container">
            <div className="white-box-regular">
                <HomeLink />
                <span className="title-text">Wähle {"<, >, ="} passend: </span>
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
                {isCorrect && displayCorrectness && <div className="correctness-label">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label">Versuche es nochmals!</div>}
                <button
                    onClick={isCorrect ? handleNext : checkInput}
                    className="button-default"
                    style={{ top: '90%', left: '50%' }}
                >
                    {isCorrect ? 'Weiter' : 'Prüfen'}
                </button>
            </div>
        </div>
    );
}

export default ActivityTwo;