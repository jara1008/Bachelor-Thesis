import React, { useState, useEffect } from 'react';
import './activityTwo.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';


function ActivityTwo() {
    const [numCubesFirstRow, setNumCubesFirstRow] = useState(0);
    const [numCubesSecondRow, setNumCubesSecondRow] = useState(0);

    useEffect(() => {
        const randomNumCubesFirstRow = Math.floor(Math.random() * 10) + 1;
        const randomNumCubesSecondRow = Math.floor(Math.random() * 10) + 1;
        setNumCubesFirstRow(randomNumCubesFirstRow);
        setNumCubesSecondRow(randomNumCubesSecondRow);
    }, []);

    return (
        <div className="container" >
            <div className="white-box" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper">TODO</span>
                <div className="cube-rows">
                    <div className="cube-row">
                        {Array.from({ length: numCubesFirstRow }, (_, index) => (
                            <div key={index} className="cube">
                                <span className="cube-label">1cm</span>
                            </div>
                        ))}
                    </div>
                    <div className="cube-row">
                        {Array.from({ length: numCubesSecondRow }, (_, index) => (
                            <div key={index} className="cube">
                                <span className="cube-label">1cm</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivityTwo;