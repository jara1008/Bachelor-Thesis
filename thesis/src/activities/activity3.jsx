import React, { useState, useEffect } from 'react';
import '../styles/activity3.css';
import '../defaults.css';
import { HomeLink, EndOfGame, CorrectnessLabel, checkButtonTop, HintLabel } from '../defaults';
import { predefinedSetsA3 } from './predefinedSets.jsx';

function Activity3({ difficulty }) {
    const [roundCount, setRoundCount] = useState(0);
    const [selectedSet, setSelectedSet] = useState([]);
    const [leftCoinsTen, setLeftCoinsTen] = useState(0);
    const [leftCoinsOne, setLeftCoinsOne] = useState(0);
    const [rightCoinsTen, setRightCoinsTen] = useState(0);
    const [rightCoinsOne, setRightCoinsOne] = useState(0);
    const [activeCoins, setActiveCoins] = useState(new Set());
    const [leftCoinsVisibleOne, setLeftCoinsVisibleOne] = useState(0);
    const [leftCoinsVisibleTen, setLeftCoinsVisibleTen] = useState(0);
    const [rightCoinsVisibleOne, setRightCoinsVisibleOne] = useState(0);
    const [rightCoinsVisibleTen, setRightCoinsVisibleTen] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [inputValue, setInputValue] = useState('');

    /* Hints */
    const [hintCrossAllCoins, setHintCrossAllCoins] = useState(false);
    const [hintNothingToSwap, setHintNothingToSwap] = useState(false); 

    useEffect(() => {
        const sets = difficulty === 'easy' ? predefinedSetsA3.easy : predefinedSetsA3.hard;
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setSelectedSet(randomSet);
    }, [difficulty]);

    useEffect(() => {
        if (selectedSet.length > 0) {
            const { left, right } = selectedSet[roundCount];
            setLeftCoinsTen(Math.floor(left / 10));
            setLeftCoinsOne(left % 10);
            setRightCoinsTen(Math.floor(right / 10));
            setRightCoinsOne(right % 10);
            setLeftCoinsVisibleTen(Math.floor(left / 10));
            setLeftCoinsVisibleOne(left % 10);
            setRightCoinsVisibleTen(Math.floor(right / 10));
            setRightCoinsVisibleOne(right % 10);
        }
    }, [selectedSet, roundCount]);

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
        if (leftCoinsVisibleTen === 0) {
            setHintNothingToSwap(true);
            setTimeout(() => {
                setHintNothingToSwap(false);
            }, 5000);
            return;
        }
        if ((leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) || (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen > 0)) {
            setHintCrossAllCoins(true);
            setTimeout(() => {
                setHintCrossAllCoins(false);
            }, 5000);
        }
        if (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen === 0 && leftCoinsVisibleOne === 0) {
            setLeftCoinsTen(prev => prev - 1);
            setLeftCoinsOne(prev => prev + 10);
            setLeftCoinsVisibleTen(prev => prev - 1);
            setLeftCoinsVisibleOne(prev => prev + 10);
        }
    }

    function handleConversionRight() {
        if (rightCoinsVisibleTen === 0) {
            setHintNothingToSwap(true);
            setTimeout(() => {
                setHintNothingToSwap(false);
            }, 5000);
            return;
        }
        if ((leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) || (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen > 0)) {
            setHintCrossAllCoins(true);
            setTimeout(() => {
                setHintCrossAllCoins(false);
            }, 5000);
        }
        if (rightCoinsVisibleTen > 0 && leftCoinsVisibleTen === 0 && rightCoinsVisibleOne === 0) {
            setRightCoinsTen(prev => prev - 1);
            setRightCoinsOne(prev => prev + 10);
            setRightCoinsVisibleTen(prev => prev - 1);
            setRightCoinsVisibleOne(prev => prev + 10);
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
        setHintNothingToSwap(false);
        setHintCrossAllCoins(false);
        setCorrectnessLabel(true);
        const leftVal = leftCoinsOne + leftCoinsTen * 10;
        const rightVal = rightCoinsOne + rightCoinsTen * 10;
        if ((inputValue === '<' && leftVal < rightVal) ||
            (inputValue === '>' && leftVal > rightVal) ||
            (inputValue === '=' && leftVal === rightVal)) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    function handleNext() {
        setRoundCount(prev => prev + 1);
        setActiveCoins(new Set());
        setIsCorrect(false);
        setCorrectnessLabel(false);
        setInputValue('');
    }

    if (roundCount >= Math.max(1, selectedSet.length-1)) {
        return <EndOfGame levelName="Münz Vergleich" levelNr={3} difficulty={difficulty} />;
    }

    return (
        <div className="container">
            <div className="white-box-large">
                <HomeLink />
                {difficulty === 'easy' && <div className='title-text' style={{ marginBottom: '5vh' }}>Klicke auf die Münzen, um sie zu streichen. Wähle {"<, >, ="} passend:</div>}
                {difficulty === 'hard' && <div className='title-text'>Klicke auf die Münzen, um sie zu streichen. Tausche zu grosse Münzen um. Wähle {"<, >, ="} passend:</div>}
                {difficulty === 'hard' && (
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
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} left="79.5%" />}
                {!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} left="79.5%" />}
                {hintNothingToSwap && <HintLabel message="Hier kannst du nichts tauschen!" isVisible={true} left="73.5%" top="76%" />}
                {hintCrossAllCoins && <HintLabel message="Streiche zuerst so viele Münzen, wie du kannst!" isVisible={true} left="73.5%" top="76%" />}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                    style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default Activity3;