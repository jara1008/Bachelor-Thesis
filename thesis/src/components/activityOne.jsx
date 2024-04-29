import React, { useState, useEffect, useRef } from "react";
import "./activityOne.css";
import cloud from "../images/cloud.png";
import star from "../images/star.svg";
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';

const leftCloudPositions = [
    { top: 49, left: 20 }, { top: 27, left: 35 }, { top: 44, left: 6 }, 
    { top: 55, left: 28 }, { top: 20, left: 25 }, { top: 32, left: 17 }, 
    { top: 43, left: 38 } 
];
const rightCloudPositions = [
    { top: 33, left: 67 }, { top: 19, left: 75 }, { top: 54, left: 68 }, 
    { top: 39, left: 90 }, { top: 44, left: 80 }, { top: 41, left: 57 }, 
    { top: 27, left: 84 }  
];

function ActivityOne() {
    const [allStars, setAllStars] = useState({ left: [], right: [] });
    const [firstPos, setFirstPos] = useState(null);
    const [secondPos, setSecondPos] = useState(null);
    const [lines, setLines] = useState([]);
    const firstPosRef = useRef(firstPos);
    const secondPosRef = useRef(secondPos);
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [firstCloudCount, setFirstCloudCount] = useState(0);
    const [secondCloudCount, setSecondCloudCount] = useState(0);

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

    const handleStarClick = (position) => {
        if (!firstPosRef.current) {
            console.log("First star clicked");
            setFirstPos(position);
        } 
        else if (!secondPosRef.current) {
            console.log("Second star clicked");
            setSecondPos(position);
    
            if (firstPosRef.current.cloudSide !== position.cloudSide) {
                setLines(prevLines => [
                    ...prevLines,
                { start: firstPosRef.current, end: position }
            ]);
            setFirstPos(null);
            setSecondPos(null);
        }
        }
    };

    useEffect(() => {
        firstPosRef.current = firstPos;
        console.log("Updated firstPos:", firstPos);
    }, [firstPos]);
    
    useEffect(() => {
        secondPosRef.current = secondPos;
        console.log("Updated secondPos:", secondPos);
    }, [secondPos]);

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
            setLines([]);
            return;
        }

        for (const line of lines) {
            const { start, end } = line;
            if (!((start.cloudSide === 'left' && end.cloudSide === 'right') || 
                  (start.cloudSide === 'right' && end.cloudSide === 'left'))) {
                console.log("Invalid line configuration:", line);
                setLines([]);
                return;
            }
    
            const startPos = `start-${start.top}-${start.left}`;
            const endPos = `end-${end.top}-${end.left}`;
    
            if (seenPositions.has(startPos) || seenPositions.has(endPos)) {
                console.log("Duplicate positions found:", line);
                setLines([]);
                return;
            }
            seenPositions.add(startPos);
            seenPositions.add(endPos);
        }
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
        setIsCorrect(false);
        setCorrectnessLabel(false);
        setLines([]);
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
                <span className="text-wrapper">Verbinde die Sterne miteinander:</span>
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "12%", left: "0%", height: "58%", width: "48%" }} />
                    {allStars.left}
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "12%", right: "1%", height: "58%", width: "48%" }} />
                    {allStars.right}
                    <svg style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "none" }}>
                        {lines.map((line, index) => (
                            <line key={index}
                                  x1={`calc(${line.start.left}% + 1.4vw)`} y1={`calc(${line.start.top}% + 1.4vw)`}
                                  x2={`calc(${line.end.left}% + 1.4vw)`} y2={`calc(${line.end.top}% + 1.4vw)`}
                                  stroke="black" strokeWidth="2" />
                        ))}
                    </svg>
                </div>
                {isCorrect && displayCorrectness && <div className="correctness-label-correct1">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-false1">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
};

export default ActivityOne;
