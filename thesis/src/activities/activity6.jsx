import React, { useState, useEffect } from 'react';
import '../styles/activity6.css';
import '../defaults.css';
import { HomeLink, EndOfGame, CorrectnessLabel, checkButtonTop, HintLabel } from '../defaults';
import { predefinedSetsA6 } from './predefinedSets.jsx';

function Activity6({ difficulty }) {
    const [activeCoins, setActiveCoins] = useState(new Set());
    const [roundCount, setRoundCount] = useState(0);
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
    const [displayMinus, setDisplayMinus] = useState(true);
    const [selectedSet, setSelectedSet] = useState([]);

    useEffect(() => {
        const sets = difficulty === 'easy' ? predefinedSetsA6.easy : predefinedSetsA6.hard;
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

    const CoinRowUpper = ({ coinsTen, coinsOne, type }) => (
        <div className="coin-stack-A6">
            {Array.from({ length: coinsTen }, (_, i) => {
                const coinKey = `${type}-tens-${i}`;
                const isActive = activeCoins.has(coinKey);
                const className = `coin-A6 ${type}-coin ${isActive ? 'active-coin-A6' : ''}`;
                return (
                    <div key={`ten-${i}`} className={className}
                        onClick={() => handleCoinClick(type, 'tens', i)}>10</div>
                );
            })}
            {Array.from({ length: coinsOne }, (_, i) => {
                const coinKey = `${type}-ones-${i}`;
                const isActive = activeCoins.has(coinKey);
                const className = `coin-A6 ${type}-coin ${isActive ? 'active-coin-A6' : ''}`;
                return (
                    <div key={`one-${i}`} className={className}
                        onClick={() => handleCoinClick(type, 'ones', i)}>1</div>
                );
            })}
        </div>
    );

    const CoinRowLower = ({ coinsTen, coinsOne, type }) => (
        <div className="coin-stack-A6">
            {Array.from({ length: coinsTen }, (_, i) => (
                <div key={`ten-${i}`} className={`coin-A6 ${type}-coin`}>10</div>
            ))}
            {Array.from({ length: coinsOne }, (_, i) => (
                <div key={`one-${i}`} className={`coin-A6 ${type}-coin`}>1</div>
            ))}
        </div>
    );

    const handleCoinClick = (type, denomination, index) => {
        let nrRightTens = rightCoinsVisibleTen;
        let nrRightOnes = rightCoinsVisibleOne;
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
                    nrRightTens += 1;
                } else {
                    setLeftCoinsVisibleOne(prevCount => prevCount + 1);
                    setRightCoinsVisibleOne(prevCount => prevCount + 1);
                    nrRightOnes += 1;
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
                    nrRightTens -= 1;
                } else if (leftCoinsVisibleOne > 0 && rightCoinsVisibleOne > 0) {
                    setLeftCoinsVisibleOne(prevCount => prevCount - 1);
                    setRightCoinsVisibleOne(prevCount => prevCount - 1);
                    nrRightOnes -= 1;
                }
                else {
                    return <HintLabel message="Streiche erst alle möglichen Münzen!" />;
                }
            }

            if (nrRightTens === 0 && nrRightOnes === 0) {
                setDisplayMinus(false);
            } else {
                setDisplayMinus(true);
            }

            return newActiveCoins;
        });
    };

    const checkInput = () => {
        setCorrectnessLabel(true);
        const leftVal = leftCoinsOne + leftCoinsTen * 10;
        const rightVal = rightCoinsOne + rightCoinsTen * 10;
        if (parseInt(inputValue) === leftVal - rightVal) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        setRoundCount(roundCount + 1);
        const { left, right } = selectedSet[roundCount + 1];
        setLeftCoinsTen(Math.floor(left / 10));
        setLeftCoinsOne(left % 10);
        setRightCoinsTen(Math.floor(right / 10));
        setRightCoinsOne(right % 10);
        setLeftCoinsVisibleTen(Math.floor(left / 10));
        setLeftCoinsVisibleOne(left % 10);
        setRightCoinsVisibleTen(Math.floor(right / 10));
        setRightCoinsVisibleOne(right % 10);

        setDisplayMinus(true);
        setActiveCoins(new Set());
        setIsCorrect(false);
        setCorrectnessLabel(false);
        setInputValue('');
    };

    const handleConversion = () => {
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
    };

    if (roundCount >= selectedSet.length) {
        return <EndOfGame levelName="Münzen subtrahieren" levelNr={5} difficulty={difficulty} />;
    }

    const leftVal = leftCoinsOne + leftCoinsTen * 10;
    const rightVal = rightCoinsOne + rightCoinsTen * 10;

    return (
        <div className="container">
            <div className="white-box-large">
                <HomeLink />
                <div className='title-text'>Löse die Rechnung:</div>
                <span className='text-wrapper-abs' style={{ '--top': '20%', '--left': '14%' }}>{leftVal} - {rightVal}</span>
                <div className="coin-row-A6" style={{ '--top': '28%' }}>
                    <span className='text-wrapper-abs' style={{ '--left': '-2%' }}>=</span>
                    <CoinRowUpper coinsTen={leftCoinsTen} coinsOne={leftCoinsOne} type='left' />
                    <span className='text-wrapper-abs' style={{ '--left': '50%' }}>-</span>
                    <CoinRowUpper coinsTen={rightCoinsTen} coinsOne={rightCoinsOne} type='right' />
                </div>
                <div className="coin-row-A6" style={{ '--top': '54%' }}>
                    <span className='text-wrapper-abs' style={{ '--left': '-2%' }}>=</span>
                    <CoinRowLower coinsTen={leftCoinsVisibleTen} coinsOne={leftCoinsVisibleOne} type='left' />
                    {displayMinus && <span className='text-wrapper-abs' style={{ '--left': '50%' }}>-</span>}
                    <CoinRowLower coinsTen={rightCoinsVisibleTen} coinsOne={rightCoinsVisibleOne} type='right' />
                </div>
                <div className="coin-row-A6" style={{ '--top': '85%' }}>
                    <span className='text-wrapper-abs' style={{ '--left': '-2%' }}>=</span>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A6"
                        readOnly={isCorrect}
                    />
                </div>
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} left="79.5%" />}
                {!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} left="79.5%" />}
                <HintLabel message="Streiche erst alle möglichen Münzen!" />
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

export default Activity6;