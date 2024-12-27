import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/activity1.css";
import "../defaults.css";
import { HomeLink, checkButtonTop } from "../defaults.jsx";
import cloud from "../images/cloud.png";
import star from "../images/star.svg";

/* define fixed positions for stars */
const leftCloudPositions = [
    { top: 50, left: 18 }, { top: 27, left: 32 }, { top: 40, left: 6 },
    { top: 48, left: 28 }, { top: 16, left: 25 }, { top: 32, left: 14 },
    { top: 35, left: 36 }
];
const rightCloudPositions = [
    { top: 25, left: 67 }, { top: 12, left: 77 }, { top: 50, left: 71 },
    { top: 29, left: 90 }, { top: 43, left: 82 }, { top: 43, left: 61 },
    { top: 21, left: 84 }
];

const starSize = 4; // Size of the star in percentage
const yOffset = 3; // Additional y-axis offset in percentage to shift the lines downwards
const xOffset = 2; // Additional x-axis offset in percentage to shift the lines to the left

const tutorialStepsEasy = [
    { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
    { message: "Verknüpfe Sterne, indem du sie anklickst." },
    { message: "Schaue in welcher Wolke Sterne übrig sind." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

const tutorialStepsHard = [
    { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
    { message: "Verknüpfe Sterne, indem du sie anklickst." },
    { message: "Schaue in welcher Wolke Sterne übrig sind." },
    { message: "Wähle <, =, > passend." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

function TutorialActivity1({ difficulty, onComplete }) {
    const [allStars, setAllStars] = useState({ left: [], right: [] }); /* positions of stars in the left and right cloud */
    const [firstPos, setFirstPos] = useState(null); /* start point of a line */
    const [secondPos] = useState(null); /* end point of a line */
    const [lines, setLines] = useState([]); /* stored lines */
    const [connectedStars, setConnectedStars] = useState(new Set()); /* tracks connected stars */
    const firstPosRef = useRef(firstPos);
    const svgRef = useRef(null);
    const [firstCloudCount] = useState(1); /* track #stars in left cloud */
    const [secondCloudCount] = useState(2); /* track #stars in right cloud */
    const [isCheckedRight, setIsRightChecked] = useState(false);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); /* mouse position */
    const [inputValue, setInputValue] = useState('');
    const touchEventRef = useRef(false);

    const [tutorialProgress, setTutorialProgress] = useState(0);
    const [buttonText, setButtonText] = useState('Weiter');

    const continueTutorial = useCallback(() => {
        if (difficulty === 'easy' && tutorialProgress === 2) {
            setButtonText('Prüfen');
        }
        if (difficulty==='hard' && tutorialProgress===2) {
            setInputValue('<');
            setButtonText('Prüfen');
        }
        if ((difficulty === 'easy' && tutorialProgress === 3) || (difficulty === 'hard' && tutorialProgress === 3)) {
            onComplete();
        }
        if (tutorialProgress < 4) {
            setTutorialProgress(tutorialProgress + 1);
        }
    }, [difficulty, tutorialProgress, onComplete]);   

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
            continueTutorial();
        }
    }, [connectedStars, continueTutorial]);

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

    const generateStars = useCallback(() => {
        return (
            <>
                <img
                    src={star}
                    className={`star-A1 ${tutorialProgress===1 ? 'highlighted' : ''}`}
                    alt="Star"
                    style={{
                        position: "absolute",
                        top: `${leftCloudPositions[0].top}%`,
                        left: `${leftCloudPositions[0].left}%`,
                        width: `${starSize}%`,
                        pointerEvents: tutorialProgress !== 1 ? 'none' : 'auto',
                    }}
                    onClick={(e) => handleStarClick(e, { ...leftCloudPositions[0], cloudSide: 'left' })}
                    onTouchStart={(e) => handleTouchStart(e, { ...leftCloudPositions[0], cloudSide: 'left' })}
                />
                <img
                    src={star}
                    className={`star-A1 ${tutorialProgress===1 ? 'highlighted' : ''}`}
                    alt="Star"
                    style={{
                        position: "absolute",
                        top: `${rightCloudPositions[0].top}%`,
                        left: `${rightCloudPositions[0].left}%`,
                        width: `${starSize}%`,
                        pointerEvents: tutorialProgress !== 1 ? 'none' : 'auto',
                    }}
                    onClick={(e) => handleStarClick(e, { ...rightCloudPositions[0], cloudSide: 'right' })}
                    onTouchStart={(e) => handleTouchStart(e, { ...rightCloudPositions[0], cloudSide: 'right' })}
                />
                <img
                    src={star}
                    className={`star-A1 ${tutorialProgress===2 ? 'highlighted' : ''}`}
                    alt="Star"
                    style={{
                        position: "absolute",
                        top: `${rightCloudPositions[1].top}%`,
                        left: `${rightCloudPositions[1].left}%`,
                        width: `${starSize}%`,
                        pointerEvents: 'none',
                    }}
                    onClick={(e) => handleStarClick(e, { ...rightCloudPositions[1], cloudSide: 'left' })}
                    onTouchStart={(e) => handleTouchStart(e, { ...rightCloudPositions[1], cloudSide: 'left' })}
                />
            </>
        );
    }, [handleStarClick, handleTouchStart, tutorialProgress]);
    
    const calculateCoordinates = (position, svgRect) => {
        return {
            x: ((position.left + xOffset) / 100) * svgRect.width,
            y: ((position.top + yOffset) / 100) * svgRect.height,
        };
    };

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

    const handleRightCheckboxChange = () => {
        setIsRightChecked(true);
        continueTutorial();
    };

    return (
        <div className="container" >
            <span className="tutorial-header-regular">TUTORIAL</span>
            <div className="white-box-regular" style={{ boxShadow: "var(--default-highlight)" }} >
                <HomeLink />
                {difficulty==="easy" && <span className="title-text">{tutorialStepsEasy[tutorialProgress]['message']}</span>}<br></br>
                {difficulty==="hard" && <span className="title-text">{tutorialStepsHard[tutorialProgress]['message']}</span>}<br></br>
                <div className="div-A1">
                    {difficulty === 'easy' && <input
                        type="checkbox"
                        style={{ position: "absolute", 
                            marginTop: "1vh", 
                            left: "25%",
                            width: "20px",
                            height: "20px",
                            zIndex: 2, 
                            cursor: tutorialProgress===2 ? "not-allowed": "default", 
                            pointerEvents: 'none',
                            boxShadow: tutorialProgress===2 ? '0 0 10px 5px #ffbf00' : 'none',
                            transition: 'box-shadow 0.3s ease-in-out'
                        }}
                    />}
                    {difficulty === 'hard' && <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A1"
                        readOnly={true}
                    />}
                    <img src={cloud} alt="Cloud" className='cloud-A1' style={{ left: "0%", marginTop: "3vh" }} />
                    {allStars.left}
                    {difficulty === 'easy' && <input
                        type="checkbox"
                        checked={isCheckedRight}
                        onChange={handleRightCheckboxChange}
                        style={{ position: "absolute",   
                        marginTop: "1vh", 
                        left: "75%", 
                        height: "20px", 
                        width: "20px", 
                        zIndex: 2, 
                        cursor: tutorialProgress===2 ? "pointer": "default", 
                        pointerEvents: tutorialProgress===2 ? 'auto' : 'none',
                        boxShadow: tutorialProgress===2 ? '0 0 10px 5px #ffbf00' : 'none',
                        transition: 'box-shadow 0.3s ease-in-out'
                    }}
                    />}
                    <img src={cloud} alt="Cloud" className='cloud-A1' style={{ right: "1%", marginTop: "3vh" }} />
                    {allStars.right}
                    <svg ref={svgRef} style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "none" }}>
                        {lines.map((line, index) => {
                            const svgRect = svgRef.current.getBoundingClientRect();
                            const startCoords = calculateCoordinates(line.start, svgRect);
                            const endCoords = calculateCoordinates(line.end, svgRect);

                            return (
                                <line
                                    key={index}
                                    x1={startCoords.x}
                                    y1={startCoords.y}
                                    x2={endCoords.x}
                                    y2={endCoords.y}
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            );
                        })}
                        {firstPos && !secondPos && (() => {
                            const svgRect = svgRef.current.getBoundingClientRect();
                            const startCoords = calculateCoordinates(firstPos, svgRect);

                            return (
                                <line
                                    x1={startCoords.x}
                                    y1={startCoords.y}
                                    x2={mousePos.x}
                                    y2={mousePos.y}
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            );
                        })()}
                    </svg>
                    {difficulty === 'hard' && (
                        <div>
                            <div className="button-container-A1">
                                <button className={`operator-button-A1 ${tutorialProgress===2 ? 'highlighted' : ''}`} style={{cursor: tutorialProgress===2 ? 'pointer' : 'default'}} disabled={tutorialProgress!==2} onClick={() => continueTutorial('<')}>{'<'}</button>
                                <button className={`operator-button-A1 ${tutorialProgress===2 ? 'highlighted' : ''}`} style={{cursor: tutorialProgress===2 ? 'not-allowed' : 'default'}} disabled={true} >{'='}</button>
                                <button className={`operator-button-A1 ${tutorialProgress===2 ? 'highlighted' : ''}`} style={{cursor: tutorialProgress===2 ? 'not-allowed' : 'default'}} disabled={true} >{'>'}</button>
                            </div>
                            <div className="label-container-A1">
                                <span className="operator-label-A1">kleiner als</span>
                                <span className="operator-label-A1">gleich</span>
                                <span className="operator-label-A1">grösser als</span>
                            </div>
                        </div>
                    )}
                </div>
                <button
                    onClick={continueTutorial}
                    className={`button-default ${((tutorialProgress===0) || tutorialProgress === 3) ? 'highlighted' : ''}`}
                    disabled={tutorialProgress===1 || tutorialProgress===2}
                    style={{ top: `${checkButtonTop}%`, left: '50%', cursor: tutorialProgress===1 || tutorialProgress===2 ? 'default' : 'pointer' }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default TutorialActivity1;