import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/activity1.css";
import "../defaults.css";
import { HomeLink, EndOfGame, CorrectnessLabel, checkButtonTop } from "../defaults.jsx";
import { predefinedSetsA1 } from "./predefinedSets.jsx";
import cloud from "../images/cloud.png";
import star from "../images/star.svg";

/* define fixed positions for stars */
const leftCloudPositions = [
    { top: 52, left: 20 }, { top: 27, left: 32 }, { top: 45, left: 6 },
    { top: 58, left: 28 }, { top: 16, left: 25 }, { top: 32, left: 14 },
    { top: 42, left: 36 }
];
const rightCloudPositions = [
    { top: 33, left: 67 }, { top: 15, left: 77 }, { top: 56, left: 71 },
    { top: 39, left: 90 }, { top: 51, left: 80 }, { top: 45, left: 61 },
    { top: 27, left: 84 }
];

const starSize = 4; // Size of the star in percentage
const yOffset = 1; // Additional y-axis offset in percentage to shift the lines downwards

function Activity1({ difficulty }) {
    const [allStars, setAllStars] = useState({ left: [], right: [] }); /* positions of stars in the left and right cloud */
    const [firstPos, setFirstPos] = useState(null); /* start point of a line */
    const [secondPos, setSecondPos] = useState(null); /* end point of a line */
    const [lines, setLines] = useState([]); /* stored lines */
    const [connectedStars, setConnectedStars] = useState(new Set()); /* tracks connected stars */
    const firstPosRef = useRef(firstPos);
    const svgRef = useRef(null);
    const [isCorrect, setIsCorrect] = useState(false); /* tracks if the stars are correctly connected */
    const [displayCorrectness, setCorrectnessLabel] = useState(false); /* enables a message that confirms correctness */
    const [roundCount, setRoundCount] = useState(0); /* counts the number of repetitions played */
    const [firstCloudCount, setFirstCloudCount] = useState(0); /* track #stars in left cloud */
    const [secondCloudCount, setSecondCloudCount] = useState(0); /* track #stars in right cloud */
    const [isCheckedLeft, setIsLeftChecked] = useState(false);
    const [isCheckedRight, setIsRightChecked] = useState(false);
    const [checkBoxCorrectness, setCheckBoxCorrectness] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); /* mouse position */
    const [inputValue, setInputValue] = useState('');
    const touchEventRef = useRef(false);

    const [selectedSet, setSelectedSet] = useState([]);

    useEffect(() => {
        const sets = difficulty === 'easy' ? predefinedSetsA1.easy : predefinedSetsA1.hard;
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setSelectedSet(randomSet);
    }, [difficulty]);

    const handleStarPosition = useCallback((position) => {
        if (!firstPosRef.current) {
            setFirstPos(position);
        } else {
            /* Check if stars are on different sides */
            if (firstPosRef.current.cloudSide !== position.cloudSide &&
                !connectedStars.has(`${firstPosRef.current.top}-${firstPosRef.current.left}`) &&
                !connectedStars.has(`${position.top}-${position.left}`)) {
                
                setLines(prevLines => [
                    ...prevLines,
                    { start: firstPosRef.current, end: position }
                ]);

                setConnectedStars(prevConnectedStars => {
                    const newConnectedStars = new Set(prevConnectedStars);
                    newConnectedStars.add(`${firstPosRef.current.top}-${firstPosRef.current.left}`);
                    newConnectedStars.add(`${position.top}-${position.left}`);
                    return newConnectedStars;
                });
            }
            setFirstPos(null);
        }
    }, [connectedStars]);

    const handleStarClick = useCallback((e, position) => {
        if (touchEventRef.current) {
            touchEventRef.current = false;
            return;
        }
        handleStarPosition(position);
    }, [handleStarPosition]);

    const handleTouchStart = useCallback((e, position) => {
        e.preventDefault();
        touchEventRef.current = true;
        handleStarPosition(position);
    }, [handleStarPosition]);

    const generateStars = useCallback((count, positions, cloudSide) => {
        return positions.slice(0, count).map((pos, index) => (
            <img
                key={`${cloudSide}-${index}`}
                src={star}
                className="star-A1"
                alt="Star"
                style={{
                    position: "absolute",
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    width: `${starSize}%`
                }}
                onClick={(e) => handleStarClick(e, { ...pos, cloudSide })}
                onTouchStart={(e) => handleTouchStart(e, { ...pos, cloudSide })}
            />
        ));
    }, [handleStarClick, handleTouchStart]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (svgRef.current) {
                const rect = svgRef.current.getBoundingClientRect();
                setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
            }
        };

        const handleTouchMove = (event) => {
            if (svgRef.current && event.touches.length === 1) {
                const rect = svgRef.current.getBoundingClientRect();
                setMousePos({ x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const generateNewCounts = useCallback(() => {
        let leftCount, rightCount;

        if (selectedSet.length > 0) {
            leftCount = selectedSet[roundCount].left;
            rightCount = selectedSet[roundCount].right;
        }

        setFirstCloudCount(leftCount);
        setSecondCloudCount(rightCount);
    }, [roundCount, selectedSet]);

    useEffect(() => {
        if (selectedSet.length === 0) return;
        generateNewCounts();
    }, [generateNewCounts, selectedSet]);

    useEffect(() => {
        if (leftCloudPositions.length > 0 && rightCloudPositions.length > 0) {
            const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions, 'left');
            const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions, 'right');

            setAllStars({ left: starsInFirstCloud, right: starsInSecondCloud });
        }
    }, [firstCloudCount, secondCloudCount, generateStars]);

    useEffect(() => {
        firstPosRef.current = firstPos;
    }, [firstPos]);

    const checkInput = () => {
        setCorrectnessLabel(true);
        const seenPositions = new Set();

        if (lines.length !== Math.min(firstCloudCount, secondCloudCount)) {
            setIsLeftChecked(false);
            setIsRightChecked(false);
            setLines([]);
            return;
        }

        for (const line of lines) {
            const { start, end } = line;
            if (!((start.cloudSide === 'left' && end.cloudSide === 'right') ||
                (start.cloudSide === 'right' && end.cloudSide === 'left'))) {
                setIsLeftChecked(false);
                setIsRightChecked(false);
                setLines([]);
                return;
            }

            const startPos = `${start.top}-${start.left}`;
            const endPos = `${end.top}-${end.left}`;

            if (seenPositions.has(startPos) || seenPositions.has(endPos)) {
                setIsLeftChecked(false);
                setIsRightChecked(false);
                setLines([]);
                return;
            }
            seenPositions.add(startPos);
            seenPositions.add(endPos);
        }

        if (difficulty === 'easy') {
            if (!isCheckedLeft && !isCheckedRight) {
                setCheckBoxCorrectness(true);
                return;
            }
            setCheckBoxCorrectness(false);

            if (firstCloudCount > secondCloudCount && (!isCheckedLeft || isCheckedRight)) {
                setIsLeftChecked(false);
                setIsRightChecked(false);
                setLines([]);
                return;
            } else if (secondCloudCount > firstCloudCount && (!isCheckedRight || isCheckedLeft)) {
                setIsLeftChecked(false);
                setIsRightChecked(false);
                setLines([]);
                return;
            }
        } else {
            if (inputValue === '') {
                setCheckBoxCorrectness(true);
                return;
            }
            setCheckBoxCorrectness(false);

            if (
                (inputValue === '<' && firstCloudCount < secondCloudCount) ||
                (inputValue === '>' && firstCloudCount > secondCloudCount) ||
                (inputValue === '=' && firstCloudCount === secondCloudCount)
            ) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
                return;
            }
        }

        setIsCorrect(true);
    };

    const handleNext = () => {
        generateNewCounts();

        if (leftCloudPositions.length > 0 && rightCloudPositions.length > 0) {
            const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions, 'left');
            const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions, 'right');

            setAllStars({ left: starsInFirstCloud, right: starsInSecondCloud });
        }
        setIsLeftChecked(false);
        setIsRightChecked(false);
        setInputValue('');
        setCheckBoxCorrectness(false);
        setIsCorrect(false);
        setCorrectnessLabel(false);
        setLines([]);
        setFirstPos(null);
        setSecondPos(null); // Reset secondPos state
        setConnectedStars(new Set());
        setRoundCount((prevRoundCount) => prevRoundCount + 1);
    };

    const handleLeftCheckboxChange = (event) => {
        setIsLeftChecked(event.target.checked);
    };

    const handleRightCheckboxChange = (event) => {
        setIsRightChecked(event.target.checked);
    };

    const handleButtonClick = (value) => {
        setInputValue(value);
    };

    /* The game is finished */
    if (roundCount > selectedSet.length) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Mengen Vergleich" levelNr={1} difficulty={difficulty}/>;
    }

    return (
        <div className="container" >
            <div className="white-box-regular" >
                <HomeLink />
                {difficulty === 'easy' && <span className="title-text">Verbinde die Sterne miteinander. Wähle die Wolke mit MEHR Sternen aus:</span>}
                {difficulty === 'hard' && <span className="title-text">Verbinde die Sterne miteinander. Wähle {"<, >, ="} passend:</span>}
                <div className="div-A1">
                    {difficulty === 'easy' && <input
                        type="checkbox"
                        checked={isCheckedLeft}
                        onChange={handleLeftCheckboxChange}
                        style={{ position: "absolute", marginTop: "2vh", left: "25%", height: "5%", width: "5%", zIndex: 2, cursor: "pointer" }}
                    />}
                    {difficulty === 'hard' && <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A1"
                        readOnly={isCorrect}
                    />}
                    <img src={cloud} alt="Cloud" className='cloud-A1' style={{ left: "0%" }} />
                    {allStars.left}
                    {difficulty === 'easy' && <input
                        type="checkbox"
                        checked={isCheckedRight}
                        onChange={handleRightCheckboxChange}
                        style={{ position: "absolute", marginTop: "2vh", left: "75%", height: "5%", width: "5%", zIndex: 2, cursor: "pointer" }}
                    />}
                    <img src={cloud} alt="Cloud" className='cloud-A1' style={{ right: "1%" }} />
                    {allStars.right}
                    <svg ref={svgRef} style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "none" }}>
                        {lines.map((line, index) => (
                            <line key={index}
                                x1={`calc(${line.start.left}% + ${starSize / 2}%)`} y1={`calc(${line.start.top}% + ${starSize / 2 + yOffset}%)`}
                                x2={`calc(${line.end.left}% + ${starSize / 2}%)`} y2={`calc(${line.end.top}% + ${starSize / 2 + yOffset}%)`}
                                stroke="black" strokeWidth="2" />
                        ))}
                        {firstPos && !secondPos && (
                            <line
                                x1={`calc(${firstPos.left}% + ${starSize / 2}%)`} y1={`calc(${firstPos.top}% + ${starSize / 2 + yOffset}%)`}
                                x2={`${mousePos.x}px`} y2={`${mousePos.y}px`}
                                stroke="black" strokeWidth="2" />
                        )}
                    </svg>
                    {difficulty === 'hard' && <div className="button-container-A1">
                        <button className="operator-button-A1" onClick={() => handleButtonClick('<')}>{'<'}</button>
                        <button className="operator-button-A1" onClick={() => handleButtonClick('=')}>{'='}</button>
                        <button className="operator-button-A1" onClick={() => handleButtonClick('>')}>{'>'}</button>
                    </div>}
                    {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} top="76%" left="77%" />}
                    {!isCorrect && displayCorrectness && !checkBoxCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} top="76%" left="77%" />}
                    {checkBoxCorrectness && difficulty === 'easy' && <CorrectnessLabel message="Wähle das richtige Kästchen an!" isVisible={true} top="73%" left="71%" height="24%" width="30%" />}
                    {checkBoxCorrectness && difficulty === 'hard' && <CorrectnessLabel message="Wähle <, =, > passend!" isVisible={true} top="73%" left="71%" height="24%" width="30%" />}
                </div>
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                    style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
};

export default Activity1;