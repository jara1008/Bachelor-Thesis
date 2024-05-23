import React, { useState, useEffect } from 'react';
import './activityFive.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';

function ActivityFive() {
    const [numbers, setNumbers] = useState({ largeNum: 0, smallNum: 0 });
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const generateRandomNumbers = () => {
        if (roundCount<5) {
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
        };
    };

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

    if (roundCount >= 5) {
        // Message that the game is completed
        return (
            <div className="container-A5">
                <div className="white-box-A5">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message-A5">
                        Gratulation! Du hast Level xy geschafft!
                        { /* Add party icon */ }
                    </div>
                    <Link to={"/"}>
                        <button className='button-A5'
                            style={{ top: '85%', left: '50%', width: '30%' }} >
                            zur Übersicht
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-A5" >
            <div className="white-box-A5" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper-A5">Fülle das Kästchen so, dass die Rechnung stimmt: </span>
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
                {isCorrect && displayCorrectness && <div className="correctness-label-A5">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-A5">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-A5" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityFive;