import React, { useState, useEffect } from 'react';
import './activityThree.css';
import '../defaults.css';
import { HomeLink, EndOfGame, ROUNDCOUNT, CorrectnessLabel, checkButtonTop } from '../defaults';

function ActivityThree({ difficulty }) {
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(Math.floor(Math.random() * 3)); 
    const [leftCoinsOne, setLeftCoinsOne] = useState(Math.floor(Math.random() * 9) + 1);
    const [rightCoinsTen, setRightCoinsTen] = useState(Math.floor(Math.random() * 3)); 
    const [rightCoinsOne, setRightCoinsOne] = useState(Math.floor(Math.random() * 9) + 1);
    const [activeCoins, setActiveCoins] = useState(new Set());
    
    const [leftCoinsVisibleOne, setLeftCoinsVisibleOne] = useState(leftCoinsOne);
    const [leftCoinsVisibleTen, setLeftCoinsVisibleTen] = useState(leftCoinsTen);
    const [rightCoinsVisibleOne, setRightCoinsVisibleOne] = useState(rightCoinsOne);
    const [rightCoinsVisibleTen, setRightCoinsVisibleTen] = useState(rightCoinsTen);
    console.log(leftCoinsTen, rightCoinsTen, rightCoinsVisibleTen)

    useEffect(() => {
        if (difficulty === 'easy') {
            setRightCoinsTen(leftCoinsTen);
            setRightCoinsVisibleTen(leftCoinsTen);
        }
    }, [difficulty, leftCoinsTen]);
    console.log(leftCoinsTen, rightCoinsTen, rightCoinsVisibleTen)

    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [inputValue, setInputValue] = useState('');

    function CoinRowUpper({ coinsTen, coinsOne, type }) {
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
    } 

    function handleCoinClick(type, denomination, index) {
        const coinKey = `${type}-${denomination}-${index}`;
        const oppositeType = type === 'left' ? 'right' : 'left';

        setActiveCoins(prevActiveCoins => {
            const newActiveCoins = new Set(prevActiveCoins);
    
            if (newActiveCoins.has(coinKey)) {
                newActiveCoins.delete(coinKey);
    
                const maxCoins = denomination === "tens" ? leftCoinsTen : leftCoinsOne;
                for (let i = 0; i < maxCoins; i++) {
                    const oppositeCoinKey = `${oppositeType}-${denomination}-${i}`;
                    if (newActiveCoins.has(oppositeCoinKey)) {
                        newActiveCoins.delete(oppositeCoinKey);
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
    
                const maxCoins = denomination === "tens" ? leftCoinsTen : leftCoinsOne;
                for (let i = 0; i < maxCoins; i++) {
                    const oppositeCoinKey = `${oppositeType}-${denomination}-${i}`;
                    if (!newActiveCoins.has(oppositeCoinKey)) {
                        newActiveCoins.add(oppositeCoinKey);
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
        const newLeftCoinsTen = Math.floor(Math.random() * 3);
        const newLeftCoinsOne = Math.floor(Math.random() * 9) + 1;
        const newRightCoinsTen = Math.floor(Math.random() * 3);
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
    

    if (roundCount >= ROUNDCOUNT) {
        return <EndOfGame levelName="Münz Vergleich" levelNr={3} />;
    }

    return (
        <div className="container">
            <div className="white-box-large">
                <HomeLink />
                {difficulty==='easy' && <div className='title-text' style={{ marginBottom: '5vh' }}>Wähle {"<, >, ="} passend:</div>}
                {difficulty==='hard' && <div className='title-text'>Wähle {"<, >, ="} passend:</div>}
                {difficulty==='hard' && (
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        <button onClick={handleConversionLeft} className="header-button" style={{ left: "25%", marginTop: "2vh" }}>
                            Tauschen
                        </button>
                        <button onClick={handleConversionRight} className="header-button" style={{ left: "75%", marginTop: "2vh" }}>
                            Tauschen
                        </button>
                    </div>
                )}

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
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} left="79.5%"/>}
                {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} left="79.5%"/>}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default" 
                    style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );    
}

export default ActivityThree;