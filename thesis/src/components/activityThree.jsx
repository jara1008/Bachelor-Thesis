import React, { useState, useEffect } from 'react';
import './activityThree.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';


function ActivityThree() {
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(Math.floor(Math.random() * 4) + 1); 
    const [leftCoinsOne, setLeftCoinsOne] = useState(Math.floor(Math.random() * 4) + 1); 
    const [rightCoinsTen, setRightCoinsTen] = useState(Math.floor(Math.random() * 4) + 1); 
    const [rightCoinsOne, setRightCoinsOne] = useState(Math.floor(Math.random() * 4) + 1); 

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
        <div className="container">
            <div className="white-box">
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className='text-wrapper'>TODO:</span>
                <div className="coin-row">
                    <div className="left-coins">
                        {Array.from({ length: leftCoinsTen }, (_, i) => (
                            <div key={i} className='coin'>10</div>
                        ))}
                        {Array.from({ length: leftCoinsOne }, (_, i) => (
                            <div key={i} className='coin'>1</div>
                        ))}
                    </div>
                    <span className='text-wrapper-questionmark'>?</span>
                    <div className="right-coins">
                        {Array.from({ length: rightCoinsTen }, (_, i) => (
                            <div key={i} className='coin'>10</div>
                        ))}
                        {Array.from({ length: rightCoinsOne }, (_, i) => (
                            <div key={i} className='coin'>1</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default ActivityThree;