import React, { useState } from 'react';
import './activityThree.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png'; // Assuming this will be used later

function ActivityThree() {
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(Math.floor(Math.random() * 2) + 1); 
    const [leftCoinsOne, setLeftCoinsOne] = useState(Math.floor(Math.random() * 6) + 1); 
    const [rightCoinsTen, setRightCoinsTen] = useState(Math.floor(Math.random() * 2) + 1); 
    const [rightCoinsOne, setRightCoinsOne] = useState(Math.floor(Math.random() * 6) + 1);
    const [activeCoins, setActiveCoins] = useState(new Set());
    const [leftVisibility, setLeftVisibility] = useState({
        tens: Array(leftCoinsTen).fill(true),
        ones: Array(leftCoinsOne).fill(true)
    });
    const [rightVisibility, setRightVisibility] = useState({
        tens: Array(rightCoinsTen).fill(true),
        ones: Array(rightCoinsOne).fill(true)
    });

    function CoinRowUpper({ coinsTen, coinsOne, type }) {
        return (
            <div className="coin-stack">
                {Array.from({ length: coinsTen }, (_, i) => {
                    const coinKey = `${type}-tens-${i}`;
                    const isActive = activeCoins.has(coinKey)
                    const className = `coin ${type}-coin ${isActive ? 'active-coin' : ''}`;
                    return (
                        <div key={`ten-${i}`} className={className}
                            onClick={() => handleCoinClick(type, 'tens', i)}>10</div>
                    );
                })}
                {Array.from({ length: coinsOne }, (_, i) => {
                    const coinKey = `${type}-ones-${i}`;
                    const isActive = activeCoins.has(coinKey)
                    const className = `coin ${type}-coin ${isActive ? 'active-coin' : ''}`;
                    return (
                        <div key={`one-${i}`} className={className}
                            onClick={() => handleCoinClick(type, 'ones', i)}>1</div>
                    );
                })}
            </div>
        );
    }    

    function CoinRowLower({ coinsTen, coinsOne, type, visibility }) {
        return (
            <div className="coin-stack">
                {Array.from({ length: coinsTen }, (_, i) => visibility.tens[i] && (
                    <div key={`ten-${i}`} className={`coin ${type}-coin`}>10</div>
                ))}
                {Array.from({ length: coinsOne }, (_, i) => visibility.ones[i] && (
                    <div key={`one-${i}`} className={`coin ${type}-coin`}>1</div>
                ))}
            </div>
        );
    }

    function handleCoinClick(type, denomination, index) {
        const coinKey = `${type}-${denomination}-${index}`;

        setActiveCoins(prevActiveCoins => {
            const newActiveCoins = new Set(prevActiveCoins);
            if (leftVisibility[denomination][index] != rightVisibility[denomination][index]) {
                alert("WRONG!"); //BETTER: make a disclaimer!
            }
            else if (newActiveCoins.has(coinKey)) {
                newActiveCoins.delete(coinKey);
            } else {
                newActiveCoins.add(coinKey);
            }
            return newActiveCoins;
        });

        if (leftVisibility[denomination][index] === rightVisibility[denomination][index]) {
            const updateVisibility = (visibility, setVisibility) => {
                const newVisibility = {...visibility};
                newVisibility[denomination][index] = !newVisibility[denomination][index];
                setVisibility(newVisibility);
            };

            if (type === 'upper') {
                updateVisibility(leftVisibility, setLeftVisibility);
                updateVisibility(rightVisibility, setRightVisibility);
            }
        }
    }

    if (roundCount >= 5) {
        return (
            <div className="container">
                <div className="white-box">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message">
                        Gratulation! Du hast Level xy geschafft!
                    </div>
                    <Link to={"/"}>
                        <button className='button' style={{ top: '85%', left: '50%', width: '30%' }}>
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
                <div className='text-wrapper'>TODO:</div>
                <div className="coin-row">
                    <CoinRowUpper coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='upper' visibility={leftVisibility} setVisibility={setLeftVisibility} />
                    <span className='text-wrapper-abs' style={{ '--left': '50%' }}>?</span>
                    <CoinRowUpper coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='upper' visibility={rightVisibility} setVisibility={setRightVisibility} />
                </div>
                <span className='text-wrapper-abs' style={{ '--top': '45%', '--left': '25%' }}>↓</span>
                <span className='text-wrapper-abs' style={{ '--top': '45%', '--left': '75%' }}>↓</span>
                <div className="coin-row" style={{ '--top': '38%' }}>
                    <CoinRowLower coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='lower' visibility={leftVisibility} setVisibility={setLeftVisibility} />
                    <input className='info-input'></input>
                    <CoinRowLower coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='lower' visibility={rightVisibility} setVisibility={setRightVisibility} />
                </div>
            </div>
        </div>
    );    
}

export default ActivityThree;
