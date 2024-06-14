import React, { useState, useEffect, useCallback } from 'react';
import './activityFive.css';
import '../defaults.css';
import { HomeLink, EndOfGame, ROUNDCOUNT } from '../defaults';

function ActivityFive() {
    const [numbers, setNumbers] = useState({ largeNum: 0, smallNum: 0 });
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);

    const generateRandomNumbers = useCallback(() => {
        let firstNum;
        let secondNum;
        do {
            firstNum = Math.floor(Math.random() * 20) + 1;
            secondNum = Math.floor(Math.random() * 20) + 1;
        } while(firstNum === secondNum);
        if (secondNum < firstNum) {
            let swap = firstNum;
            firstNum = secondNum;
            secondNum = swap;
        }
        setNumbers({
            smallNum: firstNum,
            largeNum: secondNum
        });
        setIsCorrect(false);
        setInputValue('');
        setCorrectnessLabel(false);
    }, []);

    useEffect(() => {
        generateRandomNumbers();
    }, [generateRandomNumbers]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const checkInput = () => {
        setCorrectnessLabel(true);
        if (parseInt(inputValue) === numbers.largeNum - numbers.smallNum) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        generateRandomNumbers();
    };

    if (roundCount >= ROUNDCOUNT) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Additionsrätsel" levelNr={5} />;
    }

    return (
        <div className="container" >
            <div className="white-box-regular" >
                <HomeLink />
                <span className="title-text">Fülle das Kästchen so, dass die Rechnung stimmt: </span>
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
                {isCorrect && displayCorrectness && <div className="correctness-label-default">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-default">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default" 
                    style={{ top: '90%', left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityFive;