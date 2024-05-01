import React, { useState, useEffect, useRef } from "react";
import "./activityOne.css";
import cloud from "../images/cloud.png";
import star from "../images/star.svg";
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';

/* define fix positions for stars */
const leftCloudPositions = [
    { top: 49, left: 20 }, { top: 27, left: 35 }, { top: 44, left: 6 }, 
    { top: 53, left: 28 }, { top: 20, left: 25 }, { top: 32, left: 17 }, 
    { top: 43, left: 38 } 
];
const rightCloudPositions = [
    { top: 33, left: 67 }, { top: 19, left: 75 }, { top: 53, left: 68 }, 
    { top: 39, left: 90 }, { top: 44, left: 80 }, { top: 41, left: 57 }, 
    { top: 27, left: 84 }  
];

function ActivityOne() {
    const [allStars, setAllStars] = useState({ left: [], right: [] }); /* positions of stars in the left and right cloud*/
    const [firstPos, setFirstPos] = useState(null); /* start point of a line */
    const [secondPos, setSecondPos] = useState(null); /* end point of a line */
    const [lines, setLines] = useState([]); /* stored lines */
    const firstPosRef = useRef(firstPos); 
    const secondPosRef = useRef(secondPos);
    const [isCorrect, setIsCorrect] = useState(false); /* tracks if the stars are correctly connected */
    const [displayCorrectness, setCorrectnessLabel] = useState(false); /* enables a message that confirmes correctness */
    const [roundCount, setRoundCount] = useState(1); /* counts the amount of repetitions played */
    const [firstCloudCount, setFirstCloudCount] = useState(0); /* track #stars in left cloud */
    const [secondCloudCount, setSecondCloudCount] = useState(0); /* track #stars in right cloud */
    const [isCheckedLeft, setIsLeftChecked] = useState(false);
    const [isCheckedRight, setIsRightChecked] = useState(false);
    const [checkBoxCorrectness, setCheckBoxCorrectness] = useState(false);


    useEffect(() => {
        setFirstCloudCount(Math.floor(Math.random() * leftCloudPositions.length) + 1);
        setSecondCloudCount(Math.floor(Math.random() * rightCloudPositions.length) + 1);
    }, []); 
    
    useEffect(() => {
        if (leftCloudPositions.length > 0 && rightCloudPositions.length > 0) {
            const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions, 'left');
            const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions, 'right');
    
            setAllStars({ left: starsInFirstCloud, right: starsInSecondCloud });
        }
    }, [firstCloudCount, secondCloudCount, leftCloudPositions, rightCloudPositions]);

    useEffect(() => {
        firstPosRef.current = firstPos;
    }, [firstPos]);
    
    useEffect(() => {
        secondPosRef.current = secondPos;
    }, [secondPos]);

    /* tracks clicked stars */ 
    const handleStarClick = (position) => {
        if (!firstPosRef.current) {
            setFirstPos(position);
        } 
        else if (!secondPosRef.current) {
            setSecondPos(position);
    
            setLines(prevLines => [
                ...prevLines,
            { start: firstPosRef.current, end: position }
            ]);
            setFirstPos(null);
            setSecondPos(null);
        }
    };

    const generateStars = (count, positions, cloudSide) => {
        return positions.slice(0, count).map((pos, index) => (
            <img
                key={`${cloudSide}-${index}`}
                src={star}
                className="star"
                alt="Star"
                style={{
                    position: "absolute",
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                }}
                onClick={() => handleStarClick({ ...pos, cloudSide })}
            />
        ));
    };

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
    
            const startPos = `start-${start.top}-${start.left}`;
            const endPos = `end-${end.top}-${end.left}`;
    
            if (seenPositions.has(startPos) || seenPositions.has(endPos)) {
                setIsLeftChecked(false);
                setIsRightChecked(false);
                setLines([]);
                return;
            }
            seenPositions.add(startPos);
            seenPositions.add(endPos);
        }

        if (firstCloudCount > secondCloudCount && (!!!isCheckedLeft || isCheckedRight)) {
            setIsLeftChecked(false);
            setIsRightChecked(false);
            setLines([]);
            return;
        }
        else if (secondCloudCount > firstCloudCount && (!!!isCheckedRight || isCheckedLeft)) {
            setIsLeftChecked(false);
            setIsRightChecked(false);
            setLines([]);
            return;
        }

        if (!!!isCheckedLeft && !!!isCheckedRight && (firstCloudCount !== secondCloudCount)) {
            setCheckBoxCorrectness(true);
            return;
        }
        
        setCheckBoxCorrectness(false);
        setIsCorrect(true);
        setRoundCount(roundCount + 1);
    };

    const handleNext = () => {
        setFirstCloudCount(Math.floor(Math.random() * leftCloudPositions.length) + 1);
        setSecondCloudCount(Math.floor(Math.random() * rightCloudPositions.length) + 1);

        if (leftCloudPositions.length > 0 && rightCloudPositions.length > 0) {
            const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions, 'left');
            const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions, 'right');
    
            setAllStars({ left: starsInFirstCloud, right: starsInSecondCloud });
        }
        setIsLeftChecked(false);
        setIsRightChecked(false);
        setCheckBoxCorrectness(false);
        setIsCorrect(false);
        setCorrectnessLabel(false);
        setLines([]);
    };

    const handleLeftCheckboxChange = (event) => {
        console.log("is checked left");
        setIsLeftChecked(event.target.checked);
    };

    const handleRightCheckboxChange = (event) => {
        setIsRightChecked(event.target.checked);
    };

    /* the game is finished */
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
                <span className="text-wrapper">Verbinde die Sterne miteinander und wähle die Wolke mit MEHR Sternen an:</span>
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                    <input
                        type="checkbox"
                        checked={isCheckedLeft}
                        onChange={handleLeftCheckboxChange}
                        style={{ position: "absolute", top: "6%", left: "25%", height: "5%", width: "5%", zIndex: 2 }}
                    />
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "10%", left: "0%", height: "58%", width: "48%" }} />
                    {allStars.left}
                    <input
                        type="checkbox"
                        checked={isCheckedRight}
                        onChange={handleRightCheckboxChange}
                        style={{ position: "absolute", top: "6%", left: "75%", height: "5%", width: "5%", zIndex: 2 }}
                    />
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "10%", right: "1%", height: "58%", width: "48%" }} />
                    {allStars.right}
                    <svg style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "none" }}>
                        {lines.map((line, index) => (
                            <line key={index}
                                  x1={`calc(${line.start.left}% + 1.4vw)`} y1={`calc(${line.start.top}% + 1.4vw)`}
                                  x2={`calc(${line.end.left}% + 1.4vw)`} y2={`calc(${line.end.top}% + 1.4vw)`}
                                  stroke="black" strokeWidth="2" />
                        ))}
                    </svg>
                {isCorrect && displayCorrectness && <div className="correctness-label-correct1">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-false1">Versuche es nochmals!</div>}
                {checkBoxCorrectness && !!!displayCorrectness && <div className="correctness-label-false1">Wähle das richtige Kästchen!</div>}
                </div>
                <button onClick={isCorrect ? handleNext : checkInput} className="button" 
                    style={{ top: '91%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
};

export default ActivityOne;
