import React, { useState } from 'react';
import './activityThree.css';
import '../defaults.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png'; // Assuming this will be used later
import { incrementHighestUnlockedLevel } from "../utils/utils.jsx";

function ActivityThree() {
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(Math.floor(Math.random() * 2) + 1); 
    const [leftCoinsOne, setLeftCoinsOne] = useState(Math.floor(Math.random() * 9) + 1); 
    const [rightCoinsTen, setRightCoinsTen] = useState(Math.floor(Math.random() * 2) + 1); 
    const [rightCoinsOne, setRightCoinsOne] = useState(Math.floor(Math.random() * 9) + 1);
    const [activeCoins, setActiveCoins] = useState(new Set());
    
    const [leftCoinsVisibleOne, setLeftCoinsVisibleOne] = useState(leftCoinsOne);
    const [leftCoinsVisibleTen, setLeftCoinsVisibleTen] = useState(leftCoinsTen);
    const [rightCoinsVisibleOne, setRightCoinsVisibleOne] = useState(rightCoinsOne);
    const [rightCoinsVisibleTen, setRightCoinsVisibleTen] = useState(rightCoinsTen);

    const [coinColors, setCoinColors] = useState(new Map());

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

    function CoinRowLower({ coinsTen, coinsOne, type }) {
        console.log("LOWER: ", coinsTen, coinsOne, type);
        return (
            <div className="coin-stack-A3">
                {Array.from({ length: coinsTen }, (_, i) => (
                    <div key={`ten-${i}`} className={`coin-A3 ${type}-coin`}>10</div>
                ))}
                {Array.from({ length: coinsOne }, (_, i) => (
                    <div key={`one-${i}`} className={`coin-A3 ${type}-coin`}>1</div>
                ))}
            </div>
        );
    }

    function handleConversionLeft() {
        if (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen === 0) {
            const newLeftCoinsTen = leftCoinsTen - 1;
            const newLeftCoinsVisibleTen = leftCoinsVisibleTen - 1;
            const newLeftCoinsOne = leftCoinsOne + 10;
            const newLeftCoinsVisibleOne = leftCoinsVisibleOne + 10;
    
            setLeftCoinsTen(newLeftCoinsTen);
            setLeftCoinsOne(newLeftCoinsOne);
            setLeftCoinsVisibleOne(newLeftCoinsVisibleOne);
            setLeftCoinsVisibleTen(newLeftCoinsVisibleTen);
        }
    } 

    function handleConversionRight() {
        if (rightCoinsVisibleTen > 0 && leftCoinsVisibleTen === 0) {
            const newRightCoinsTen = rightCoinsTen - 1;
            const newRightCoinsVisibleTen = rightCoinsVisibleTen - 1;
            const newRightCoinsOne = rightCoinsOne + 10;
            const newRightCoinsVisibleOne = rightCoinsVisibleOne + 10;

            setRightCoinsTen(newRightCoinsTen);
            setRightCoinsOne(newRightCoinsOne);
            setRightCoinsVisibleOne(newRightCoinsVisibleOne);
            setRightCoinsVisibleTen(newRightCoinsVisibleTen);
        }
        else {
            return (<span>Streich zuerst so viele 10er wie möglich!</span>);
        }
    } 

    function handleCoinClick(type, denomination, index) {
        const coinKey = `${type}-${denomination}-${index}`;
        const oppositeType = type === 'left' ? 'right' : 'left';

        setActiveCoins(prevActiveCoins => {
            const newActiveCoins = new Set(prevActiveCoins);
    
            if (newActiveCoins.has(coinKey)) {
                newActiveCoins.delete(coinKey);
    
                let found = false;
                const maxCoins = denomination === "tens" ? leftCoinsTen : leftCoinsOne;
                for (let i = 0; i < maxCoins; i++) {
                    const oppositeCoinKey = `${oppositeType}-${denomination}-${i}`;
                    if (newActiveCoins.has(oppositeCoinKey)) {
                        newActiveCoins.delete(oppositeCoinKey);
                        found = true;
                        break;
                    }
                }
    
                if (denomination === "tens") {
                    setLeftCoinsVisibleTen(prevCount => prevCount + 1);
                    setRightCoinsVisibleTen(prevCount => prevCount + 1);
                } else {
                    setLeftCoinsVisibleOne(prevCount => prevCount + 1);
                    setRightCoinsVisibleOne(prevCount => prevCount + 1);
                }
            } else if ((denomination === "tens" && leftCoinsVisibleTen > 0 && rightCoinsVisibleTen > 0) || (denomination === "ones" && leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0)) {
                newActiveCoins.add(coinKey);
    
                let found = false;
                const maxCoins = denomination === "tens" ? leftCoinsTen : leftCoinsOne;
                for (let i = 0; i < maxCoins; i++) {
                    const oppositeCoinKey = `${oppositeType}-${denomination}-${i}`;
                    if (!newActiveCoins.has(oppositeCoinKey)) {
                        newActiveCoins.add(oppositeCoinKey);
                        found = true;
                        break;
                    }
                }
    
                if (denomination === "tens") {
                    setLeftCoinsVisibleTen(prevCount => prevCount - 1);
                    setRightCoinsVisibleTen(prevCount => prevCount - 1);
                } else if (leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) {
                    setLeftCoinsVisibleOne(prevCount => prevCount - 1);
                    setRightCoinsVisibleOne(prevCount => prevCount - 1);
                }
            }
    
            return newActiveCoins;
        });
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
            const newLeftCoinsTen = Math.floor(Math.random() * 2) + 1;
            const newLeftCoinsOne = Math.floor(Math.random() * 9) + 1;
            const newRightCoinsTen = Math.floor(Math.random() * 2) + 1;
            const newRightCoinsOne = Math.floor(Math.random() * 9) + 1;
    
            setLeftCoinsTen(newLeftCoinsTen);
            setLeftCoinsOne(newLeftCoinsOne);
            setRightCoinsTen(newRightCoinsTen);
            setRightCoinsOne(newRightCoinsOne);
            
            setLeftCoinsVisibleOne(newLeftCoinsOne);
            setLeftCoinsVisibleTen(newLeftCoinsTen);
            setRightCoinsVisibleOne(newRightCoinsOne);
            setRightCoinsVisibleTen(newRightCoinsTen);
            

            setActiveCoins(new Set());
            setIsCorrect(false);
            setCorrectnessLabel(false);
            setInputValue('');
        }
    }
    

    if (roundCount >= 5) {
        return (
            <div className="container">
                <div className="white-box-regular">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message">
                        Gratulation! Du hast das Level Münz Vergleich geschafft!
                    </div>
                    <Link to={"/"}>
                        <button className='button-default' 
                            style={{ top: '85%', left: '50%', width: '30%' }}
                            onClick={incrementHighestUnlockedLevel(3)}
                        >zur Übersicht</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-">
            <div className="white-box-large">
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <div className='title-text'>Wähle {"<, >, ="} passend:</div>

                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <button onClick={handleConversionLeft} className="button-default" style={{}}>
                    Tauschen
                </button>
                <button onClick={handleConversionRight} className="button-default" style={{}}>
                    Tauschen
                </button>
                </div>

                <div className="coin-row-A3">
                    <CoinRowUpper coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='left' />
                    <span className='title-text' style={{ '--left': '50%' }}>?</span>
                    <CoinRowUpper coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='right' />
                </div>
                <div className='arrows-A3'>
                    <span className='title-text'>↓</span>
                    <span className='title-text'>↓</span>
                </div>
                <div className="coin-row-A3">
                    <CoinRowLower coinsTen={leftCoinsVisibleTen} coinsOne={leftCoinsVisibleOne} type='left' />
                    <input
                    type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A3"
                        readOnly={isCorrect}
                    />
                    <CoinRowLower coinsTen={rightCoinsVisibleTen} coinsOne={rightCoinsVisibleOne} type='right' />
                </div>
                <div className="button-container-A3">
                    <button className="operator-button-A3" onClick={() => handleButtonClick('<')}>{'<'}</button>
                    <button className="operator-button-A3" onClick={() => handleButtonClick('=')}>{'='}</button>
                    <button className="operator-button-A3" onClick={() => handleButtonClick('>')}>{'>'}</button>
                </div>
                {isCorrect && displayCorrectness && <div className="correctness-label">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label">Versuche es nochmals!</div>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-absolute-A3" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );    
}

export default ActivityThree;
