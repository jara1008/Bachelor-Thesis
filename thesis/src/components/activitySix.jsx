import React, { useState } from 'react';
import './activitySix.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png'; // Assuming this will be used later

function ActivitySix() {
    let initialLeftCoinsTen, initialLeftCoinsOne, initialRightCoinsTen, initialRightCoinsOne;
    let initialLeftVal, initialRightVal;
    do {
        initialLeftCoinsTen = Math.floor(Math.random() * 2) + 1;
        initialLeftCoinsOne = Math.floor(Math.random() * 6) + 1;
        initialRightCoinsTen = Math.floor(Math.random() * 2) + 1;
        initialRightCoinsOne = Math.floor(Math.random() * 6) + 1;
        initialLeftVal = initialLeftCoinsOne + initialLeftCoinsTen * 10;
        initialRightVal = initialRightCoinsOne + initialRightCoinsTen * 10;
    } while (initialLeftVal <= initialRightVal);

    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(initialLeftCoinsTen);
    const [leftCoinsOne, setLeftCoinsOne] = useState(initialLeftCoinsOne);
    const [rightCoinsTen, setRightCoinsTen] = useState(initialRightCoinsTen);
    const [rightCoinsOne, setRightCoinsOne] = useState(initialRightCoinsOne);
    const leftVal = leftCoinsOne + leftCoinsTen * 10;
    const rightVal = rightCoinsOne + rightCoinsTen * 10;

    const [activeCoins, setActiveCoins] = useState(new Set());
    const [leftVisibility, setLeftVisibility] = useState({
        tens: Array(leftCoinsTen).fill(true),
        ones: Array(leftCoinsOne).fill(true)
    });
    const [rightVisibility, setRightVisibility] = useState({
        tens: Array(rightCoinsTen).fill(true),
        ones: Array(rightCoinsOne).fill(true)
    });
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [inputValue, setInputValue] = useState('');

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

    function checkInput() {
        setCorrectnessLabel(true);
        if (inputValue == leftVal-rightVal) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        } else {
            setIsCorrect(false);
        }
    }

    function handleNext() {
        if (roundCount < 5) {
            let newLeftCoinsTen, newLeftCoinsOne, newRightCoinsTen, newRightCoinsOne, newLeftVal, newRightVal;
            do {
                newLeftCoinsTen = Math.floor(Math.random() * 2) + 1;
                newLeftCoinsOne = Math.floor(Math.random() * 6) + 1;
                newRightCoinsTen = Math.floor(Math.random() * 2) + 1;
                newRightCoinsOne = Math.floor(Math.random() * 6) + 1;
                newLeftVal = newLeftCoinsOne + newLeftCoinsTen * 10;
                newRightVal = newRightCoinsOne + newRightCoinsTen * 10;
            } while (newLeftVal <= newRightVal);
    
            setLeftCoinsTen(newLeftCoinsTen);
            setLeftCoinsOne(newLeftCoinsOne);
            setRightCoinsTen(newRightCoinsTen);
            setRightCoinsOne(newRightCoinsOne);
    
            setLeftVisibility({
                tens: Array(newLeftCoinsTen).fill(true),
                ones: Array(newLeftCoinsOne).fill(true)
            });
            setRightVisibility({
                tens: Array(newRightCoinsTen).fill(true),
                ones: Array(newRightCoinsOne).fill(true)
            });

            setActiveCoins(new Set());
            setIsCorrect(false);
            setCorrectnessLabel(false);
            setInputValue('');
        }
    }

    function handleConversion() {
        const hasVisibleTens = leftVisibility.tens.some(isVisible => isVisible);
        if (leftCoinsTen > 0 && hasVisibleTens) {
            const newLeftCoinsTen = leftCoinsTen - 1;
            const newLeftCoinsOne = leftCoinsOne + 10;
            
            const newLeftVisibility = {
                tens: leftVisibility.tens.slice(0, newLeftCoinsTen),
                ones: leftVisibility.ones.concat(Array(10).fill(true))
            };
    
            setLeftCoinsTen(newLeftCoinsTen);
            setLeftCoinsOne(newLeftCoinsOne);
            setLeftVisibility(newLeftVisibility);
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
                <div className='text-wrapper'>TODO</div>
                <span className='text-wrapper-abs' style={{ '--left': '12%', '--top': '20%' }}>{leftVal} - {rightVal}</span>
                <div className="coin-row" style={{ '--top': '28%' }}>
                    <span className='text-wrapper-abs' style={{ '--left': '-2%' }}>=</span>
                    <CoinRowUpper coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='upper' visibility={leftVisibility} setVisibility={setLeftVisibility} />
                    <span className='text-wrapper-abs' style={{ '--left': '50%' }}>-</span>
                    <CoinRowUpper coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='upper' visibility={rightVisibility} setVisibility={setRightVisibility} />
                </div>
                <div className="coin-row" style={{ '--top': '55%' }}>
                    <span className='text-wrapper-abs' style={{ '--left': '-2%' }}>=</span>
                    <CoinRowLower coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='lower' visibility={leftVisibility} setVisibility={setLeftVisibility} />
                    <span className='text-wrapper-abs' style={{ '--left': '50%' }}>-</span>
                    <CoinRowLower coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='lower' visibility={rightVisibility} setVisibility={setRightVisibility} />
                </div>
                <div className="coin-row" style={{ '--top': '85%' }}>
                    <span className='text-wrapper-abs' style={{ '--left': '-2%' }}>=</span>
                    <input
                    type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-5"
                        readOnly={isCorrect}
                    />
                </div>
                {isCorrect && displayCorrectness && <div className="correctness-label-correct-bottom">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-false-bottom">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>

                <button onClick={handleConversion} className="button" style={{ top: '88%', left: '60%' }}>
                    Tauschen
                </button>

            </div>
        </div>
    );    
}

export default ActivitySix;
