import React, { useState, useEffect, useCallback } from 'react';
import '../styles/activityTwo.css';
import { HomeLink, EndOfGame, ROUNDCOUNT, CorrectnessLabel, checkButtonTop } from '../defaults';

function ActivityTwo({ difficulty }) {
    const [numCubesFirstRow, setNumCubesFirstRow] = useState(0);
    const [numCubesSecondRow, setNumCubesSecondRow] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [, setLastDigits] = useState({ leftValue: -1, rightValue: -1 });
    const [differenceValue, setDifferenceValue] = useState('');

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
            setDifferenceValue('');
            return { leftValue: randomNumCubesFirstRow, rightValue: randomNumCubesSecondRow };
        });
    }, []);

    useEffect(() => {
        shuffleCubes();
    }, [shuffleCubes]);

    const checkInput = () => {
        setCorrectnessLabel(true);
        const lengthDifference = Math.abs(numCubesFirstRow - numCubesSecondRow);
        if (
            (inputValue === '<' && numCubesFirstRow < numCubesSecondRow) ||
            (inputValue === '>' && numCubesFirstRow > numCubesSecondRow) ||
            (inputValue === '=' && numCubesFirstRow === numCubesSecondRow)
        ) {
            if (difficulty === 'hard' && parseInt(differenceValue) !== lengthDifference) {
                setIsCorrect(false);
            } else {
                setIsCorrect(true);
                setRoundCount((prevRoundCount) => prevRoundCount + 1);
            }
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
                {difficulty === 'hard' && (
                    <div className="difference-container">
                        <span className='title-text-small'>Der Längenunterschied beträgt:</span>
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
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig" isVisible={true} />}
                {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} />}
                <button
                    onClick={isCorrect ? handleNext : checkInput}
                    className="button-default"
                    style={{ top: `${checkButtonTop}%`, left: '50%' }}
                >
                    {isCorrect ? 'Weiter' : 'Prüfen'}
                </button>
            </div>
        </div>
    );
}

export default ActivityTwo;
