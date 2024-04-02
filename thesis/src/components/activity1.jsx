import React from "react";
import "./activity1.css";
import cloud from "../images/cloud.png";
import star from "../images/star.svg"

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

const generateStars = (count, positions) => {

    const handleStarClick = (index) => {
        console.log(`Star ${index + 1} clicked!`);
    };

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
            onClick={() => handleStarClick(index)}
        />
    ));
};

export const Box = () => {

    const firstCloudCount = Math.floor(Math.random() * 7) + 1;
    const secondCloudCount = Math.floor(Math.random() * 7) + 1;

    const starsInFirstCloud = generateStars(firstCloudCount, leftCloudPositions);
    const starsInSecondCloud = generateStars(secondCloudCount, rightCloudPositions);

    return (
        <div className="container">
            <div className="white-box" >
                <span className="text-wrapper">Verbinde die Sterne miteinander:</span>
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "30%", left: "0%", height: "58%", width: "48%" }} />
                    {starsInFirstCloud}
                    <img src={cloud} alt="Cloud" style={{ position: "absolute", top: "30%", right: "1%", height: "58%", width: "48%" }} />
                    {starsInSecondCloud}
                </div>
            </div>
        </div>
    );
};
