import React, { useState, useEffect } from 'react';
import './activityThree.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';


function ActivityThree() {
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(Math.floor(Math.random() * 2) + 1); 
    const [leftCoinsOne, setLeftCoinsOne] = useState(Math.floor(Math.random() * 6) + 1); 
    const [rightCoinsTen, setRightCoinsTen] = useState(Math.floor(Math.random() * 2) + 1); 
    const [rightCoinsOne, setRightCoinsOne] = useState(Math.floor(Math.random() * 6) + 1); 

    function CoinRow({ coinsTen, coinsOne, type }) {
        return (
            <div className="coin-stack">
                {Array.from({ length: coinsTen }, (_, i) => (
                    <div key={`ten-${i}`} className={`coin ${type}-coin`}
                    onClick={() => handleCoinClick(type)}>10</div>
                ))}
                {Array.from({ length: coinsOne }, (_, i) => (
                    <div key={`one-${i}`} className={`coin ${type}-coin`}
                    onClick={() => handleCoinClick(type)}>1</div>
                ))}
            </div>
        );
    }

    function handleCoinClick(type) {
        if (type === 'lower') {
            return;
        }
        //add logic to make coins dis- and reappear upon clicking on the upper coin
    }
      
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
                    <CoinRow coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='upper' />
                    <span className='text-wrapper-abs' style={{ '--left': '50%' }}>?</span>
                    <CoinRow coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='upper' />
                </div>
                <span className='text-wrapper-abs' style={{ '--top': '45%', '--left': '25%' }}>↓</span>
                <span className='text-wrapper-abs' style={{ '--top': '45%', '--left': '75%' }}>↓</span>
                <div className="coin-row" style={{ '--top': '38%' }}>
                    <CoinRow coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='lower' />
                    <input className='info-input'></input>
                    <CoinRow coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='lower' />
                </div>
            </div>
        </div>
    );    
}

export default ActivityThree;