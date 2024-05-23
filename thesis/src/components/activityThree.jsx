import React, { useState } from 'react';
import './activityThree.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png'; // Assuming this will be used later

function ActivityThree() {
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(Math.floor(Math.random() * 3) + 1); 
    const [leftCoinsOne, setLeftCoinsOne] = useState(Math.floor(Math.random() * 9) + 1); 
    const [rightCoinsTen, setRightCoinsTen] = useState(Math.floor(Math.random() * 3) + 1); 
    const [rightCoinsOne, setRightCoinsOne] = useState(Math.floor(Math.random() * 9) + 1);
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
        console.log("UPPER: ", coinsTen, coinsOne, type);
        return (
            <div className="coin-stack-A3">
                {Array.from({ length: coinsTen }, (_, i) => {
                    const coinKey = `${type}-tens-${i}`;
                    const isActive = activeCoins.has(coinKey)
                    const className = `coin-A3 ${type}-coin ${isActive ? 'active-coin-A3' : ''}`;
                    return (
                        <div key={`ten-${i}`} className={className}
                            onClick={() => handleCoinClick(type, 'tens', i)}>10</div>
                    );
                })}
                {Array.from({ length: coinsOne }, (_, i) => {
                    const coinKey = `${type}-ones-${i}`;
                    const isActive = activeCoins.has(coinKey)
                    const className = `coin-A3 ${type}-coin ${isActive ? 'active-coin-A3' : ''}`;
                    return (
                        <div key={`one-${i}`} className={className}
                            onClick={() => handleCoinClick(type, 'ones', i)}>1</div>
                    );
                })}
            </div>
        );
    }    

    function CoinRowLower({ coinsTen, coinsOne, type, visibility }) {
        console.log("LOWER: ", coinsTen, coinsOne, type, visibility);
        return (
            <div className="coin-stack-A3">
                {Array.from({ length: coinsTen }, (_, i) => visibility.tens[i] && (
                    <div key={`ten-${i}`} className={`coin-A3 ${type}-coin`}>10</div>
                ))}
                {Array.from({ length: coinsOne }, (_, i) => visibility.ones[i] && (
                    <div key={`one-${i}`} className={`coin-A3 ${type}-coin`}>1</div>
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

    const handleButtonClick = (value) => {
        setInputValue(value);
    }; 

    function checkInput() {
        setCorrectnessLabel(true);
        const leftVal = leftCoinsOne + leftCoinsTen*10;
        const rightVal = rightCoinsOne + rightCoinsTen*10;
        console.log(leftVal, rightVal)
        if ((inputValue === '<' && leftVal < rightVal) ||
            (inputValue === '>' && leftVal > rightVal) ||
            (inputValue === '=' && leftVal === rightVal)) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        } else {
            setIsCorrect(false);
        }
    }

    function handleNext() {
        if (roundCount < 5) {
            const newLeftCoinsTen = Math.floor(Math.random() * 3) + 1;
            const newLeftCoinsOne = Math.floor(Math.random() * 9) + 1;
            const newRightCoinsTen = Math.floor(Math.random() * 3) + 1;
            const newRightCoinsOne = Math.floor(Math.random() * 9) + 1;
    
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
    

    if (roundCount >= 5) {
        return (
            <div className="container-A3">
                <div className="white-box-A3">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message-A3">
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
        <div className="container-A3">
            <div className="white-box-A3">
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <div className='text-wrapper-A3'>Wähle {"<, >, ="} passend:</div>
                <div className="coin-row-A3">
                    <CoinRowUpper coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='upper' visibility={leftVisibility} setVisibility={setLeftVisibility} />
                    <span className='text-wrapper-A3' style={{ '--left': '50%' }}>?</span>
                    <CoinRowUpper coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='upper' visibility={rightVisibility} setVisibility={setRightVisibility} />
                </div>
                <div className='arrows-A3'>
                    <span className='text-wrapper-A3'>↓</span>
                    <span className='text-wrapper-A3'>↓</span>
                </div>
                <div className="coin-row-A3">
                    <CoinRowLower coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='lower' visibility={leftVisibility} setVisibility={setLeftVisibility} />
                    <input
                    type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A3"
                        readOnly={isCorrect}
                    />
                    <CoinRowLower coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='lower' visibility={rightVisibility} setVisibility={setRightVisibility} />
                </div>
                <div className="button-container-A3">
                    <button className="operator-button-A3" onClick={() => handleButtonClick('<')}>{'<'}</button>
                    <button className="operator-button-A3" onClick={() => handleButtonClick('=')}>{'='}</button>
                    <button className="operator-button-A3" onClick={() => handleButtonClick('>')}>{'>'}</button>
                </div>
                {isCorrect && displayCorrectness && <div className="correctness-label-A3">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-A3">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-A3" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );    
}

export default ActivityThree;
