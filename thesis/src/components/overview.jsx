import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./overview.css";

function Overview() {
    const [boxes, setBoxes] = useState([
        { id: 1, top: '14%', left: '37%', path: "/instructionsOne" },
        { id: 2, top: '14%', left: '52%', path: "/activityTwo" },
        { id: 3, top: '14%', left: '67%' },
        { id: 4, top: '41%', left: '37%' },
        { id: 5, top: '41%', left: '52%', path: "/activityFive" },
        { id: 6, top: '41%', left: '67%' },
        { id: 7, top: '68%', left: '37%' },
        { id: 8, top: '68%', left: '52%' },
        { id: 9, top: '68%', left: '67%' }
    ])

    const [dots, setDots] = useState([]);
    const numberOfDots = 9; 

    useEffect(() => {
        const topOffset = 8; 
        const bottomOffset = 90;
        const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
            id: index,
            top: `${topOffset + index * ((bottomOffset - topOffset) / (numberOfDots - 1))}%`
        }));
        setDots(newDots);
    }, [numberOfDots]);

    return (
        <div className="overview">
           <div className="progress-line">
                {dots.map((dot) => (
                    <div key={dot.id} style={{ 
                        position: 'absolute', 
                        top: dot.top, 
                        left: '50%', 
                        transform: 'translateX(-50%)'
                    }} className="dot"></div>
                ))}
            </div>
            {boxes.map((box) => (
                <Link to={box.path} key={box.id} style={{ position: 'absolute', top: box.top, left: box.left }}>
                    <div className="rectangle" />
                </Link>
            ))}
        </div>
    );
}

export default Overview;