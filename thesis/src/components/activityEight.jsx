import React, { useState } from 'react';
import './activityEight.css';
import '../defaults.css';
import { HomeLink, EndOfGame, ROUNDCOUNT, CorrectnessLabel, checkButtonTop } from '../defaults';
import tree from '../images/tree.png';
import car from '../images/car_large.png';

function ActivityEight() {
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(0);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);

    const leftNumbers = [7, 6, 5, 4, 3, 2, 1];
    const rightNumbers = [1, 2, 3, 4, 5, 6, 7];
    const allNumbers = [...leftNumbers, ...rightNumbers];

    const [carPosition, setCarPosition] = useState(Math.floor(Math.random() * (leftNumbers.length + rightNumbers.length)));
    const [carIndex, setCarIndex] = useState(allNumbers[carPosition]);
    const pickedNumbers = new Set();
    pickedNumbers.add(carPosition);

    const [isLeftRed, setIsLeftRed] = useState(Math.random() < 0.5);
    const [isLeftLeft, setIsLeftLeft] = useState(Math.random() < 0.5);
    const [isLeftPos, setIsLeftPos] = useState(Math.random() < 0.5);
    const [rectangleValues, setRectangleValues] = useState(() => {

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
                leftValue: isLeftPos ? `+${carIndex}` : -carIndex,
                rightValue: isLeftPos ? -carIndex : `+${carIndex}`,
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
            <img src={tree} alt={tree} style={{
                position: 'relative',
                top: '5vh',
                left: '50%',
                width: '40px',
                height: '40px',
                transform:'translate(-50%)',
            }}></img>
            <div className="number-line">
                {leftNumbers.map((num, index) => (
                    <div key={`left-${index}`} className="number-dot red-dot">
                        {num}
                        {index === carPosition && <img src={car} alt={car} className='car_img'/>}
                    </div>
                ))}
                <div key={ 'zero' } className="number-dot">0</div>
                {rightNumbers.map((num, index) => (
                    <div key={`right-${index}`} className="number-dot blue-dot">
                        {num}
                        {index === (carPosition-leftNumbers.length) && <img src={car} alt={car} className='car_img'/>}
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
        setCorrectnessLabel(true);
        if (carPosition <= 6) {
            if (((isLeftRed && rectangleValues[0].leftColor === '#BFC4F2') || (!isLeftRed && rectangleValues[0].rightColor === '#BFC4F2')) &&
                ((isLeftLeft && rectangleValues[1].leftColor === '#BFC4F2') || (!isLeftLeft && rectangleValues[1].rightColor === '#BFC4F2')) &&
                ((!isLeftPos && rectangleValues[2].leftColor === '#BFC4F2') || (isLeftPos && rectangleValues[2].rightColor === '#BFC4F2'))) {
                setIsCorrect(true);
                setRoundCount(roundCount + 1);
            }
        }
        else if (carPosition >= 7) {
            if (((!isLeftRed && rectangleValues[0].leftColor === '#BFC4F2') || (isLeftRed && rectangleValues[0].rightColor === '#BFC4F2')) &&
                ((!isLeftLeft && rectangleValues[1].leftColor === '#BFC4F2') || (isLeftLeft && rectangleValues[1].rightColor === '#BFC4F2')) &&
                ((isLeftPos && rectangleValues[2].leftColor === '#BFC4F2') || (!isLeftPos && rectangleValues[2].rightColor === '#BFC4F2'))) {
                setIsCorrect(true);
                setRoundCount(roundCount + 1);
            }
        }
        else {
            
        }
    };

    const handleNext = () => {
        setIsCorrect(false);
        setCorrectnessLabel(false);

        let newCarPosition = Math.floor(Math.random() * (leftNumbers.length + rightNumbers.length));
        while (pickedNumbers.has(newCarPosition)) {
            newCarPosition = Math.floor(Math.random() * (leftNumbers.length + rightNumbers.length));
        }
        pickedNumbers.add(newCarPosition);
        const newIsLeftRed = Math.random() < 0.5;
        const newIsLeftLeft = Math.random() < 0.5;
        const newIsLeftPos = Math.random() < 0.5;
        const newCarIndex = allNumbers[newCarPosition];

        setCarPosition(newCarPosition);
        setCarIndex(newCarIndex);
        setIsLeftRed(newIsLeftRed);
        setIsLeftLeft(newIsLeftLeft);
        setIsLeftPos(newIsLeftPos);


        setRectangleValues([
            {
                leftValue: newCarIndex,
                rightValue: newCarIndex,
                leftColor: '#eceefa',
                rightColor: '#eceefa',
                leftTextColor: newIsLeftRed ? 'red-text' : 'blue-text',
                rightTextColor: newIsLeftRed ? 'blue-text' : 'red-text',
                leftArrow: null,
                rightArrow: null
            },
            {
                leftValue: newCarIndex,
                rightValue: newCarIndex,
                leftColor: '#eceefa',
                rightColor: '#eceefa',
                leftTextColor: 'black-text',
                rightTextColor: 'black-text',
                leftArrow: newIsLeftLeft ? <div>&larr;</div> : <div>&rarr;</div>,
                rightArrow: newIsLeftLeft ? <div>&rarr;</div> : <div>&larr;</div>
            },
            {
                leftValue: newIsLeftPos ? `+${newCarIndex}` : -newCarIndex,
                rightValue: newIsLeftPos ? -newCarIndex : `+${newCarIndex}`,
                leftColor: '#eceefa',
                rightColor: '#eceefa',
                leftTextColor: 'black-text',
                rightTextColor: 'black-text',
                leftArrow: null,
                rightArrow: null
            }
        ]);
    };

    if (roundCount >= ROUNDCOUNT) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Distanzen erkennen" levelNr={8} />;
    }

    return (
        <div className="container" >
            <div className="white-box-regular" >
                <HomeLink />
                <span className="title-text">Wo ist das Auto? Wähle die richtigen Kästchen aus: </span>
                {renderNumberLine()}
                {renderRectangles()}
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true}/>}
                {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true}/>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default" 
                    style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityEight;