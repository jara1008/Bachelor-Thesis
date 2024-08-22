import React, { useState, useEffect, useCallback } from 'react';
import '../styles/activity9.css';
import '../defaults.css';
import { HomeLink, EndOfGame, CorrectnessLabel, HintLabel, checkButtonTop } from '../defaults';
import { predefinedSetsA9 } from './predefinedSets.jsx';

function Activity9({ difficulty }) {
    const [selectedSet, setSelectedSet] = useState([]);
    const [roundCount, setRoundCount] = useState(0);
    const [activeCoins, setActiveCoins] = useState(new Set());
    const [leftCoinsTen, setLeftCoinsTen] = useState(0);
    const [leftCoinsOne, setLeftCoinsOne] = useState(0);
    const [rightCoinsTen, setRightCoinsTen] = useState(0);
    const [rightCoinsOne, setRightCoinsOne] = useState(0);
    const [leftCoinsVisibleOne, setLeftCoinsVisibleOne] = useState(0);
    const [leftCoinsVisibleTen, setLeftCoinsVisibleTen] = useState(0);
    const [rightCoinsVisibleOne, setRightCoinsVisibleOne] = useState(0);
    const [rightCoinsVisibleTen, setRightCoinsVisibleTen] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [allCoinsCrossed, setAllCoinsCrossed] = useState(false);

    /* Hints */
    const [hintCrossAllCoins, setHintCrossAllCoins] = useState(false);
    const [hintNothingToSwap, setHintNothingToSwap] = useState(false); 

    useEffect(() => {
        const sets = difficulty === 'easy' ? predefinedSetsA9.easy : predefinedSetsA9.hard;
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setSelectedSet(randomSet);
    }, [difficulty]);

    const generateNewNumbers = useCallback(() => {
        if (selectedSet.length > 0 && roundCount < selectedSet.length) {
            const { leftValue, rightValue } = selectedSet[roundCount];
            const leftTen = Math.floor(leftValue / 10);
            const leftOne = leftValue % 10;
            const rightTen = Math.floor(rightValue / 10);
            const rightOne = rightValue % 10;

            setLeftCoinsTen(leftTen);
            setLeftCoinsOne(leftOne);
            setRightCoinsTen(rightTen);
            setRightCoinsOne(rightOne);
            setLeftCoinsVisibleOne(leftOne);
            setLeftCoinsVisibleTen(leftTen);
            setRightCoinsVisibleOne(rightOne);
            setRightCoinsVisibleTen(rightTen);
            setActiveCoins(new Set());
            setIsCorrect(false);
            setCorrectnessLabel(false);
            setInputValue('');
            setAllCoinsCrossed(false);
        }
    }, [roundCount, selectedSet]);

    useEffect(() => {
        if (selectedSet.length > 0) {
            generateNewNumbers();
        }
    }, [selectedSet, roundCount, generateNewNumbers]);

    const leftVal = leftCoinsOne + leftCoinsTen * 10;
    const rightVal = rightCoinsOne + rightCoinsTen * 10;

    const checkAllCoinsCrossed = () => {
        const leftCoinCount = leftCoinsTen + leftCoinsOne;
        const crossedLeftCoins = Array.from(activeCoins).filter(coin => coin.startsWith('left')).length;
        return crossedLeftCoins === (leftCoinCount - 1);
    };

    const CoinRowUpper = ({ coinsTen, coinsOne, type }) => (
        <div className="coin-stack-A9">
            {Array.from({ length: coinsTen }, (_, i) => {
                const coinKey = `${type}-tens-${i}`;
                const isActive = activeCoins.has(coinKey);
                const className = `coin-A9 ${type}-coin ${isActive ? 'active-coin-A9' : ''}`;
                return (
                    <div key={`ten-${i}`} className={className}
                        onClick={() => handleCoinClick(type, 'tens', i)}>10</div>
                );
            })}
            {Array.from({ length: coinsOne }, (_, i) => {
                const coinKey = `${type}-ones-${i}`;
                const isActive = activeCoins.has(coinKey);
                const className = `coin-A9 ${type}-coin ${isActive ? 'active-coin-A9' : ''}`;
                return (
                    <div key={`one-${i}`} className={className}
                        onClick={() => handleCoinClick(type, 'ones', i)}>1</div>
                );
            })}
        </div>
    );

    const CoinRowLower = ({ coinsTen, coinsOne, type }) => (
        <div className="coin-stack-A9">
            {Array.from({ length: coinsTen }, (_, i) => (
                <div key={`ten-${i}`} className={`coin-A9 ${type}-coin`}>10</div>
            ))}
            {Array.from({ length: coinsOne }, (_, i) => (
                <div key={`one-${i}`} className={`coin-A9 ${type}-coin`}>1</div>
            ))}
        </div>
    );

    const handleCoinClick = (type, denomination, index) => {
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

            if (checkAllCoinsCrossed()) {
                setAllCoinsCrossed(true);
            } else {
                setAllCoinsCrossed(false);
            }

            return newActiveCoins;
        });
    };

    const handleConversion = () => {
        if ((leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) || (leftCoinsVisibleTen > 0 && rightCoinsVisibleTen > 0)) {
            setHintCrossAllCoins(true);
            setTimeout(() => {
                setHintCrossAllCoins(false);
            }, 5000);
            return;
        }
        if (rightCoinsVisibleTen === 0 || rightCoinsVisibleOne > 0 || leftCoinsVisibleOne === 0) {
            setHintNothingToSwap(true);
            setTimeout(() => {
                setHintNothingToSwap(false);
            }, 5000);
        }

        if (leftCoinsVisibleTen === 0 && rightCoinsVisibleTen > 0 && rightCoinsVisibleOne === 0) {
            const newRightCoinsTen = rightCoinsTen - 1;
            const newRightCoinsVisibleTen = rightCoinsVisibleTen - 1;
            const newRightCoinsOne = rightCoinsOne + 10;
            const newRightCoinsVisibleOne = rightCoinsVisibleOne + 10;

            setRightCoinsTen(newRightCoinsTen);
            setRightCoinsOne(newRightCoinsOne);
            setRightCoinsVisibleOne(newRightCoinsVisibleOne);
            setRightCoinsVisibleTen(newRightCoinsVisibleTen);
        }
    };

    const checkInput = () => {
        setCorrectnessLabel(true);
        if (parseInt(inputValue) === leftVal - rightVal) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        if (roundCount < selectedSet.length - 1) {
            setRoundCount(roundCount + 1);
        } else {
            // End game condition
        }
    };

    if (roundCount >= Math.max(1, selectedSet.length-1)) {
        return <EndOfGame levelName="Münzen subtrahieren 2" levelNr={8} difficulty={difficulty} />;
    }

    return (
        <div className="container">
            <div className="white-box-large">
                <HomeLink />
                <div className='title-text'>Löse die Rechnung:</div>
                <span className='text-wrapper-abs' style={{ '--top': '20%', '--left': '14%' }}>{leftVal} - {rightVal}</span>
                <div className="coin-row-A9" style={{ '--top': '28%' }}>
                    <span className='symbol-A9' style={{ '--left': '-5%', '--top': '15%' }}>=</span>
                    <CoinRowUpper coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='left' />
                    <span className='symbol-A9' style={{ '--left': '-2%', '--top': '55%' }}>-</span>
                    <CoinRowUpper coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='right' />
                    <hr className="coin-row-divider" />
                </div>
                <div className="coin-row-A9" style={{ '--top': '56%' }}>
                    {!!!allCoinsCrossed && <span className='symbol-A9' style={{ '--left': '-5%', '--top': '17%' }}>=</span>}
                    {allCoinsCrossed && <span className='symbol-A9' style={{ '--left': '-5%', '--top': '45%' }}>=</span>}
                    <CoinRowLower coinsTen={leftCoinsVisibleTen} coinsOne={leftCoinsVisibleOne} type='left' />
                    {!!!allCoinsCrossed && <span className='symbol-A9' style={{ '--left': '-2%', '--top': '68%' }}>-</span>}
                    {allCoinsCrossed && <span className='symbol-A9' style={{ '--left': '-2%', '--top': '40%' }}>-</span>}
                    <CoinRowLower coinsTen={rightCoinsVisibleTen} coinsOne={rightCoinsVisibleOne} type='right' />
                </div>
                <div className="coin-row-A9" style={{ '--top': '85%' }}>
                    <span className='symbol-A9' style={{ '--left': '-5%' }}>=</span>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A9"
                        readOnly={isCorrect}
                    />
                </div>
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} left="79.5%" />}
                {!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} left="79.5%" />}
                {hintNothingToSwap && <HintLabel message="Hier kannst du nichts tauschen!" isVisible={true} left="73.5%" top="76%" />}
                {hintCrossAllCoins && <HintLabel message="Streiche zuerst so viele Münzen, wie du kannst!" isVisible={true} left="73.5%" top="76%" />}
                {difficulty === 'hard' && (<button onClick={handleConversion} className="header-button" style={{ marginTop: "2vh" }}>
                    Tauschen
                </button>)}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                    style={{ top: `${checkButtonTop}%`, left: '50%' }}>
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default Activity9;