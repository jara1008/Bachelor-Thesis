import React, { useState, useEffect } from 'react';
import './activityEight.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';
import tree from '../images/tree.png';
import car from '../images/car_large.png';

function ActivityEight() {
    const [numbers, setNumbers] = useState({ largeNum: 0, smallNum: 0 });
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [position, setPosition] = useState(Math.random(-6, 8));

    const leftNumbers = [7, 6, 5, 4, 3, 2, 1];
    const rightNumbers = [1, 2, 3, 4, 5, 6, 7];

    const [carPosition, setCarPosition] = useState(Math.floor(Math.random() * (leftNumbers.length + rightNumbers.length + 1)));
    console.log(carPosition);

    const renderNumberLine = () => (
        <div>
            <img src={tree} style={{
                position: 'relative',
                top: '10vh',
                left: '50%',
                width: '40px',
                height: '40px',
                transform:'translate(-50%)',
            }}></img>
            <img src={car} style={{ 
                left: `${2 + (carPosition * 6.1)}%`, //TODO: make resizable...
                position: 'relative',
                top: '10.2vh',
                width: '6%',
                height: '3%',
                transform:'translateX(-50%)',
            }}></img>
            <div className="number-line">
                {leftNumbers.map((num, index) => (
                    <div key={`left-${index}`} className="number-dot red-dot">
                        {num}
                    </div>
                ))}
                <div key={ 'zero' } className="number-dot">0</div>
                {rightNumbers.map((num, index) => (
                    <div key={`right-${index}`} className="number-dot blue-dot">{num}</div>
                ))}
            </div>
        </div>
    );

    const checkInput = () => {
        
    };

    const handleNext = () => {
        
    };

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
                <span className="text-wrapper">TODO: </span>
                {renderNumberLine()}
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

export default ActivityEight;