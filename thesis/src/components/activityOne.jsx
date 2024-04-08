import React, { useState, useEffect } from "react";
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

    const [clickedStars, setClickedStars] = useState([]);
    const [allStars, setAllStars] = useState({ left: [], right: [] });
    const [lines, setLines] = useState([]);
    const [drawnLines, setDrawnLines] = useState([])

    useEffect(() => {
        const firstCloudCount = Math.floor(Math.random() * leftCloudPositions.length) + 1;
        const secondCloudCount = Math.floor(Math.random() * rightCloudPositions.length) + 1;

        const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions);
        const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions);

        setAllStars({ left: starsInFirstCloud, right: starsInSecondCloud });
    }, []);

    useEffect(() => {
        setDrawnLines(renderLines());
    }, [lines])


    const handleStarClick = (position) => {
        setClickedStars(prevStars => {
            const updatedStars = [...prevStars, position];
            
            if (updatedStars.length === 2) {
                console.log("two stars selected: ", updatedStars);
                setLines(prevLines => [...prevLines, { start: updatedStars[0], end: updatedStars[1] }]);
                console.log(clickedStars)
                return [];
            }
            console.log(clickedStars)
            return updatedStars;
        });
    };

    const generateStars = (count, positions) => {
        return positions.slice(0, count).map((pos, index) => (
            <img
                key={index}
                src={star}
                className="star"
                alt="Star"
                style={{
                    position: "absolute",
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                }}
                onClick={() => handleStarClick(pos)}
            />
        ));
    };

    const renderLines = () => {
        console.log("Drawing lines: ",lines)
        return lines.map((line, index) => (
        <svg key={index} style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}>
            <line x1={`${line.start.left}%`} y1={`${line.start.top}%`} x2={`${line.end.left}%`} y2={`${line.end.top}%`} stroke="black" strokeWidth="2" />
        </svg>
    ))};

    return (
        <div className="container">
            <Link to={"/"}>
                <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "5%", left: "78%" }} />
            </Link>
            <div className="white-box" >
                <span className="text-wrapper">Verbinde die Sterne miteinander:</span>
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "30%", left: "0%", height: "58%", width: "48%" }} />
                    {allStars.left}
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "30%", right: "1%", height: "58%", width: "48%" }} />
                    {allStars.right}
                    {drawnLines}
                </div>
            </div>
        </div>
    );
};

export default ActivityOne;
