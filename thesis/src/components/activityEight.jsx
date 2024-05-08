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

    const leftNumbers = [7, 6, 5, 4, 3, 2, 1];
    const rightNumbers = [1, 2, 3, 4, 5, 6, 7];
    const allNumbers = [...leftNumbers, ...rightNumbers];

    const [carPosition, setCarPosition] = useState(Math.floor(Math.random() * (leftNumbers.length + rightNumbers.length)));
    const [carIndex, setCarIndex] = useState(allNumbers[carPosition]);

    const [rectangleValues, setRectangleValues] = useState(() => {
        const isLeftRed = Math.random() < 0.5;
        const isLeftLeft = Math.random() < 0.5;
        const isLeftPos = Math.random() < 0.5;

        return [
            {
                leftValue: carIndex,
                rightValue: carIndex,
                leftColor: '#eceefa',
                rightColor: '#eceefa',
                leftTextColor: isLeftRed ? 'red-text' : 'blue-text',
                rightTextColor: isLeftRed ? 'blue-text' : 'red-text',
                leftArrow: null,
                rightArrow: null
            },
            {
                leftValue: carIndex,
                rightValue: carIndex,
                leftColor: '#eceefa',
                rightColor: '#eceefa',
                leftTextColor: 'black-text',
                rightTextColor: 'black-text',
                leftArrow: isLeftLeft ? <div>&larr;</div> : <div>&rarr;</div>,
                rightArrow: isLeftLeft ? <div>&rarr;</div> : <div>&larr;</div>
            },
            {
                leftValue: isLeftPos ? -carIndex : `+${carIndex}`,
                rightValue: isLeftPos ? `+${carIndex}` : -carIndex,
                leftColor: '#eceefa',
                rightColor: '#eceefa',
                leftTextColor: 'black-text',
                rightTextColor: 'black-text',
                leftArrow: null,
                rightArrow: null
            }
        ];
    });

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
            <div className="number-line">
                {leftNumbers.map((num, index) => (
                    <div key={`left-${index}`} className="number-dot red-dot">
                        {num}
                        {index === carPosition && <img src={car} className='car_img'/>}
                    </div>
                ))}
                <div key={ 'zero' } className="number-dot">0</div>
                {rightNumbers.map((num, index) => (
                    <div key={`right-${index}`} className="number-dot blue-dot">
                        {num}
                        {index === (carPosition-leftNumbers.length) && <img src={car} className='car_img'/>}
                    </div>
                ))}
            </div>
        </div>
    );    

    const renderRectangles = () => {
        return (
            <div className="rectangle-container">
                {rectangleValues.map((rect, index) => (
                    <div key={index} className="rectangle2">
                        <div className={`square ${rect.leftTextColor}`}
                            onClick={() => handleSquareClick(index, 'left')}
                            style={{ backgroundColor: rect.leftColor }}>
                            {rect.leftArrow}
                            <div>{rect.leftValue}</div>
                        </div>
                        <div className={`square ${rect.rightTextColor}`}
                            onClick={() => handleSquareClick(index, 'right')}
                            style={{ backgroundColor: rect.rightColor }}>
                            {rect.rightArrow}
                            <div>{rect.rightValue}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleSquareClick = (index, side) => {
        setRectangleValues(prev => prev.map((rect, idx) => {
            if (idx === index) {
                if (side === 'left' && rect.rightColor !== '#BFC4F2') {
                    return { ...rect, leftColor: rect.leftColor === '#eceefa' ? '#BFC4F2' : '#eceefa' };
                } else if (side === 'right' && rect.leftColor !== '#BFC4F2') {
                    return { ...rect, rightColor: rect.rightColor === '#eceefa' ? '#BFC4F2' : '#eceefa' };
                }
            }
            return rect;
        }));
    };

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
                {renderRectangles()}
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