import React, { useState, useEffect, useCallback } from 'react';
import '../styles/activity8.css';
import '../defaults.css';
import { HomeLink, EndOfGame, CorrectnessLabel, checkButtonTop } from '../defaults';
import { predefinedSetsA8 } from './predefinedSets.jsx';
import tree from '../images/tree.png';
import car from '../images/car_large.png';

function Activity8({ difficulty }) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(0);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [selectedSet, setSelectedSet] = useState([]);
    const [carIndex, setCarIndex] = useState(0);
    const [isLeftRed, setIsLeftRed] = useState(Math.random() < 0.5);
    const [isLeftLeft, setIsLeftLeft] = useState(Math.random() < 0.5);
    const [isLeftPos, setIsLeftPos] = useState(Math.random() < 0.5);
    const [rectangleValues, setRectangleValues] = useState([]);
    const [car2d, setCar2d] = useState([1, 1]);

    useEffect(() => {
        const sets = difficulty === 'easy' ? predefinedSetsA8.easy : predefinedSetsA8.hard;
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setSelectedSet(randomSet);
    }, [difficulty]);

    const generateNewNumbers = useCallback(() => {
        if (selectedSet.length > 0) {

            const { number } = selectedSet[roundCount];
            const position = Math.abs(number);
            const newIsLeftRed = Math.random() < 0.5;
            const newIsLeftLeft = Math.random() < 0.5;
            const newIsLeftPos = Math.random() < 0.5;

            setCarIndex(number);
            setIsLeftRed(newIsLeftRed);
            setIsLeftLeft(newIsLeftLeft);
            setIsLeftPos(newIsLeftPos);

            setIsCorrect(false);
            setCorrectnessLabel(false);

            setRectangleValues([
                {
                    leftValue: position,
                    rightValue: position,
                    leftColor: '#eceefa',
                    rightColor: '#eceefa',
                    leftTextColor: newIsLeftRed ? 'red-text' : 'blue-text',
                    rightTextColor: newIsLeftRed ? 'blue-text' : 'red-text',
                    leftArrow: null,
                    rightArrow: null
                },
                {
                    leftValue: position,
                    rightValue: position,
                    leftColor: '#eceefa',
                    rightColor: '#eceefa',
                    leftTextColor: 'black-text',
                    rightTextColor: 'black-text',
                    leftArrow: newIsLeftLeft ? <div>&larr;</div> : <div>&rarr;</div>,
                    rightArrow: newIsLeftLeft ? <div>&rarr;</div> : <div>&larr;</div>
                },
                {
                    leftValue: newIsLeftPos ? `+${position}` : -position,
                    rightValue: newIsLeftPos ? -position : `+${position}`,
                    leftColor: '#eceefa',
                    rightColor: '#eceefa',
                    leftTextColor: 'black-text',
                    rightTextColor: 'black-text',
                    leftArrow: null,
                    rightArrow: null
                }
            ]);
        };
    }, [selectedSet, roundCount]);

    const generateNewNumbersHard = useCallback(() => {
        if (selectedSet.length > 0) {
            const { x, y } = selectedSet[roundCount];
            setCar2d([x, y]);
        }
    }, [selectedSet, roundCount]);

    useEffect(() => {
        if (difficulty === 'easy') {
            generateNewNumbers()
        }
        else {
            generateNewNumbersHard()
        };
    }, [generateNewNumbers, generateNewNumbersHard, difficulty]);

    const renderNumberLine = () => (
        <div>
            <img src={tree} alt='tree' style={{
                position: 'relative',
                top: '5vh',
                left: '50%',
                width: '40px',
                height: '40px',
                transform: 'translate(-50%)',
            }}></img>
            <div className="number-line">
                {[-7, -6, -5, -4, -3, -2, -1].map((num, index) => (
                    <div key={`left-${index}`} className="number-dot red-dot">
                        {Math.abs(num)}
                        {num === carIndex && <img src={car} alt="car" className='car_img' />}
                    </div>
                ))}
                <div key={'zero'} className="number-dot">0</div>
                {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                    <div key={`right-${index}`} className="number-dot blue-dot">
                        {num}
                        {num === carIndex && <img src={car} alt="car" className='car_img' />}
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
                if (side === 'left') {
                    if (rect.rightColor === '#BFC4F2') {
                        return {
                            ...rect,
                            leftColor: rect.leftColor === '#eceefa' ? '#BFC4F2' : '#eceefa',
                            rightColor: '#eceefa'
                        };
                    }
                    return {
                        ...rect,
                        leftColor: rect.leftColor === '#eceefa' ? '#BFC4F2' : '#eceefa'
                    };
                } else if (side === 'right') {
                    if (rect.leftColor === '#BFC4F2') {
                        return {
                            ...rect,
                            rightColor: rect.rightColor === '#eceefa' ? '#BFC4F2' : '#eceefa',
                            leftColor: '#eceefa'
                        };
                    }
                    return {
                        ...rect,
                        rightColor: rect.rightColor === '#eceefa' ? '#BFC4F2' : '#eceefa'
                    };
                }
            }
            return rect;
        }));
    };

    const checkInput = () => {
        setCorrectnessLabel(true);
        if (carIndex < 0) {
            if (((isLeftRed && rectangleValues[0].leftColor === '#BFC4F2') || (!isLeftRed && rectangleValues[0].rightColor === '#BFC4F2')) &&
                ((isLeftLeft && rectangleValues[1].leftColor === '#BFC4F2') || (!isLeftLeft && rectangleValues[1].rightColor === '#BFC4F2')) &&
                ((!isLeftPos && rectangleValues[2].leftColor === '#BFC4F2') || (isLeftPos && rectangleValues[2].rightColor === '#BFC4F2'))) {
                setIsCorrect(true);
            }
        }
        else if (carIndex > 0) {
            if (((!isLeftRed && rectangleValues[0].leftColor === '#BFC4F2') || (isLeftRed && rectangleValues[0].rightColor === '#BFC4F2')) &&
                ((!isLeftLeft && rectangleValues[1].leftColor === '#BFC4F2') || (isLeftLeft && rectangleValues[1].rightColor === '#BFC4F2')) &&
                ((isLeftPos && rectangleValues[2].leftColor === '#BFC4F2') || (!isLeftPos && rectangleValues[2].rightColor === '#BFC4F2'))) {
                setIsCorrect(true);
            }
        }
    };

    const handleNext = () => {
        setRoundCount((prevRoundCount) => prevRoundCount + 1);
        generateNewNumbers();
    };

    const borderstyle = (x, y) => {
        let borderBottom = 'none';
        let borderRight = 'none';
        let borderTop = x === 0 ? 'none' : (x === 6 ? '0.4vh solid black' : '0.25vh solid black');
        let borderLeft = y === 0 ? 'none' : (y === 6 ? '0.4vh solid black' : '0.25vh solid black');
        return {
            borderTop,
            borderBottom,
            borderLeft,
            borderRight
        }
    }

    const renderGrid = () => (
        <div className="grid">
            <div style={{ display: "flex", flexDirection: "column", height: "37vw", width: "37vw" }}>
                {Array.from({ length: 12 }).map((_, id) => (
                    <div key={id} style={{ display: "flex", height: "2.5vw", width: "37vw" }}>
                        {Array.from({ length: 12 }).map((_, id2) => (
                            <div
                                className="rectangle2"
                                key={[id, id2]}
                                style={{
                                    ...borderstyle(id, id2),
                                    height: "2.5vw",
                                    width: "2.5vw",
                                    fontSize: "2.5vh",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    position: "relative",
                                }}
                            >
                                {/* Car */}
                                {id2 - 5 === car2d[0] && 5 - id === car2d[1] && (
                                    <img
                                        src={car}
                                        alt="car"
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-10%, 0)",
                                            width: "3.5vw",
                                            height: "2vw",
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                                {/* Tree */}
                                {id === 6 && id2 === 6 && (
                                    <img
                                        src={tree}
                                        alt="tree"
                                        style={{
                                            position: "absolute",
                                            transform: "translate(-50%, -50%)",
                                            width: "3.5vw",
                                            height: "3.5vw",
                                        }}
                                    />
                                )}
                                {/* Triangles and Plus/Minus Signs */}
                                {id === 6 && id2 === 11 && (
                                    <>
                                        <div className="triangle right"></div>
                                        <div className="plus-sign right">+</div>
                                    </>
                                )}
                                {id === 6 && id2 === 1 && (
                                    <>
                                        <div className="triangle left"></div>
                                        <div className="plus-sign left">-</div>
                                    </>
                                )}
                                {id2 === 6 && id === 11 && (
                                    <>
                                        <div className="triangle down"></div>
                                        <div className="plus-sign down">-</div>
                                    </>
                                )}
                                {id2 === 6 && id === 1 && (
                                    <>
                                        <div className="triangle up"></div>
                                        <div className="plus-sign up">+</div>
                                    </>
                                )}
                                {/* Horizontal Numbers */}
                                {id === 6 && id2 !== 0 && id2 !== 6 && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            transform: "translate(-50%, -50%)",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            zIndex: 2,
                                            backgroundColor: 'var(--secondary-color)',
                                            padding: "0vw 0.2vw",
                                            borderRadius: "0.2vw",
                                            color: id2 - 6 < 0 ? "red" : "blue",
                                        }}
                                    >
                                        {Math.abs(id2 - 6)}
                                    </div>
                                )}
                                {/* Vertical Numbers */}
                                {id2 === 6 && id !== 0 && id !== 6 && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            transform: "translate(-65%, -50%)",
                                            fontWeight: "bold",
                                            zIndex: 2,
                                            backgroundColor: 'var(--secondary-color)',
                                            padding: "0vw 0.2vw",
                                            borderRadius: "0.2vw",
                                            color: 6 - id < 0 ? "red" : "blue",
                                        }}
                                    >
                                        {Math.abs(6 - id)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
    

    const [clickedTop, setClickedTop] = useState(-1)
    const [clickedMid, setClickedMid] = useState(-1)
    const [clickedBot, setClickedBot] = useState(-1)

    const rectangleValuesHard =
        [{
            leftValueTop: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            rightValueTop: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            leftValueBot: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            rightValueBot: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            leftTextColorTop: ['red', 'red'],
            rightTextColorTop: ['blue', 'red'],
            leftTextColorBot: ['red', 'blue'],
            rightTextColorBot: ['blue', 'blue'],
        },
        {
            leftValueTop: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            rightValueTop: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            leftValueBot: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            rightValueBot: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            leftArrow: <div>&larr;</div>,
            rightArrow: <div>&rarr;</div>,
            topArrow: <div>&uarr;</div>,
            bottomArrow: <div>&darr;</div>,
            leftTextColorTop: ['black', 'black'],
            rightTextColorTop: ['black', 'black'],
            leftTextColorBot: ['black', 'black'],
            rightTextColorBot: ['black', 'black'],
        }, {
            leftValueTop: [-Math.abs(car2d[0]), Math.abs(car2d[1])],
            rightValueTop: [Math.abs(car2d[0]), Math.abs(car2d[1])],
            leftValueBot: [-Math.abs(car2d[0]), -Math.abs(car2d[1])],
            rightValueBot: [Math.abs(car2d[0]), -Math.abs(car2d[1])],
            leftTextColorTop: ['black', 'black'],
            rightTextColorTop: ['black', 'black'],
            leftTextColorBot: ['black', 'black'],
            rightTextColorBot: ['black', 'black'],
        }]

    const handleClickHard = (i, x) => {
        if (i === 0) {
            setClickedTop(x);
        }
        else if (i === 1) {
            setClickedMid(x);
        }
        else {
            setClickedBot(x);
        }
    }

    const renderRectanglesHard = () => {
        return (
            <div className="rectangle-container-hard" style={{ display: 'flex', flexDirection: 'column' }}>
                {rectangleValuesHard.map((rect, index) => (
                    <div key={index}>
                        <div className="rectangle2">
                            <div className="squareHard"
                                onClick={() => handleClickHard(index, 0)}
                                style={{
                                    backgroundColor:
                                        (index === 0 && clickedTop === 0) ||
                                            (index === 1 && clickedMid === 0) ||
                                            (index === 2 && clickedBot === 0) ? '#BFC4F2' : '#eceefa'
                                }}>
                                <div style={{ display: 'flex' }}>
                                    {rect.rightArrow}
                                    {rect.topArrow}
                                </div>
                                <div>
                                    <span style={{ color: rect.leftTextColorTop[0] }}>{rect.leftValueTop[0]}</span>,
                                    <span style={{ color: rect.leftTextColorTop[1] }}>{rect.leftValueTop[1]}</span>
                                </div>
                            </div>
                            <div className="squareHard"
                                onClick={() => handleClickHard(index, 1)}
                                style={{
                                    backgroundColor:
                                        (index === 0 && clickedTop === 1) ||
                                            (index === 1 && clickedMid === 1) ||
                                            (index === 2 && clickedBot === 1) ? '#BFC4F2' : '#eceefa'
                                }}>
                                <div style={{ display: 'flex' }}>
                                    {rect.leftArrow}
                                    {rect.topArrow}
                                </div>
                                <div>
                                    <span style={{ color: rect.rightTextColorTop[0] }}>{rect.rightValueTop[0]}</span>,
                                    <span style={{ color: rect.rightTextColorTop[1] }}>{rect.rightValueTop[1]}</span>
                                </div>
                            </div>
                            <div className="squareHard"
                                onClick={() => handleClickHard(index, 2)}
                                style={{
                                    backgroundColor:
                                        (index === 0 && clickedTop === 2) ||
                                            (index === 1 && clickedMid === 2) ||
                                            (index === 2 && clickedBot === 2) ? '#BFC4F2' : '#eceefa'
                                }}>
                                <div style={{ display: 'flex' }}>
                                    {rect.leftArrow}
                                    {rect.bottomArrow}
                                </div>
                                <div>
                                    <span style={{ color: rect.leftTextColorBot[0] }}>{rect.leftValueBot[0]}</span>,
                                    <span style={{ color: rect.leftTextColorBot[1] }}>{rect.leftValueBot[1]}</span>
                                </div>
                            </div>
                            <div className="squareHard"
                                onClick={() => handleClickHard(index, 3)}
                                style={{
                                    backgroundColor:
                                        (index === 0 && clickedTop === 3) ||
                                            (index === 1 && clickedMid === 3) ||
                                            (index === 2 && clickedBot === 3) ? '#BFC4F2' : '#eceefa'
                                }}>
                                <div style={{ display: 'flex' }}>
                                    {rect.rightArrow}
                                    {rect.bottomArrow}
                                </div>
                                <div>
                                    <span style={{ color: rect.rightTextColorBot[0] }}>{rect.rightValueBot[0]}</span>,
                                    <span style={{ color: rect.rightTextColorBot[1] }}>{rect.rightValueBot[1]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const checkInputHard = () => {
        setCorrectnessLabel(true);
        if (car2d[0] >= 0 && car2d[1] >= 0 && clickedTop === 3 && clickedMid === 0 && clickedBot === 1) {
            setIsCorrect(true);
        }
        else if (car2d[0] >= 0 && car2d[1] < 0 && clickedTop === 1 && clickedMid === 3 && clickedBot === 3) {
            setIsCorrect(true);
        }
        else if (car2d[0] < 0 && car2d[1] >= 0 && clickedTop === 2 && clickedMid === 1 && clickedBot === 0) {
            setIsCorrect(true);
        }
        else if (car2d[0] < 0 && car2d[1] < 0 && clickedTop === 0 && clickedMid === 2 && clickedBot === 2) {
            setIsCorrect(true);
        }
    }

    const handleNextHard = () => {
        setIsCorrect(false);
        setCorrectnessLabel(false);

        generateNewNumbersHard();
        setRoundCount((prevRoundCount) => prevRoundCount + 1);

        setClickedTop(-1);
        setClickedMid(-1);
        setClickedBot(-1);
    }


    if (roundCount >= Math.max(1, selectedSet.length-1)) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Distanzen erkennen" levelNr={7} difficulty={difficulty} />;
    }

    return (
        <div className="container" >
            <div className="white-box-regular" >
                <HomeLink />
                {difficulty === "easy" && <>
                    <span className="title-text">Wo ist das Auto? Wähle 3 mal das richtige Kästchen aus:</span>
                    {renderNumberLine()}
                    {renderRectangles()}
                    {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} />}
                    {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} />}
                    <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                        style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                        {isCorrect ? "Weiter" : "Prüfen"}
                    </button>
                </>}
                {difficulty === "hard" && <div>
                    <span className="title-text">Wähle 3 mal das richtige Kästchen aus:</span>
                    <div style={{ display: 'flex' }}>
                        {renderGrid()}
                        {renderRectanglesHard()}
                    </div>
                    {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} />}
                    {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} />}
                    <button onClick={isCorrect ? handleNextHard : checkInputHard} className="button-default"
                        style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                        {isCorrect ? "🌟 Weiter 🌟" : "Prüfen"}
                    </button>
                </div>
                }
            </div>
        </div>
    );
}

export default Activity8;