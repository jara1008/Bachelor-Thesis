import React, { useState, useEffect, useRef } from "react";
import "./activityOne.css";
import cloud from "../images/cloud.png";
import star from "../images/star.svg";
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';

const leftCloudPositions = [
    { top: 67, left: 20 }, { top: 45, left: 35 }, { top: 62, left: 6 }, 
    { top: 73, left: 28 }, { top: 38, left: 25 }, { top: 50, left: 17 }, 
    { top: 61, left: 38 } 
];
const rightCloudPositions = [
    { top: 51, left: 67 }, { top: 37, left: 75 }, { top: 72, left: 68 }, 
    { top: 57, left: 90 }, { top: 62, left: 80 }, { top: 59, left: 57 }, 
    { top: 45, left: 84 }  
];

function ActivityOne() {

    const [allStars, setAllStars] = useState({ left: [], right: [] });
    const [firstPos, setFirstPos] = useState(null);
    const [secondPos, setSecondPos] = useState(null);
    const [lines, setLines] = useState([]);
    const firstPosRef = useRef(firstPos);
    const secondPosRef = useRef(secondPos);

    useEffect(() => {
        const firstCloudCount = Math.floor(Math.random() * leftCloudPositions.length) + 1;
        const secondCloudCount = Math.floor(Math.random() * rightCloudPositions.length) + 1;

        const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions, 'left');
        const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions, 'right');

        setAllStars({ left: starsInFirstCloud, right: starsInSecondCloud });
    }, []);

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

    return (
        <div className="container" >
            <div className="white-box" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper">Verbinde die Sterne miteinander:</span>
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "30%", left: "0%", height: "58%", width: "48%" }} />
                    {allStars.left}
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "30%", right: "1%", height: "58%", width: "48%" }} />
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
            </div>
        </div>
    );
};

export default ActivityOne;
