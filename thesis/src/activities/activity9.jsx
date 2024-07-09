import React, { useState, useEffect } from 'react';
import '../styles/activity9.css';
import '../defaults.css';
import { HomeLink, EndOfGame, ROUNDCOUNT, CorrectnessLabel, checkButtonTop } from '../defaults';

function ActivityNine({ difficulty }) {
    const generateInitialValues = () => {
        let initialLeftCoinsTen, initialLeftCoinsOne, initialRightCoinsTen, initialRightCoinsOne;
        let leftVal, rightVal;

        do {
            initialLeftCoinsTen = Math.floor(Math.random() * 5) + 1;
            initialLeftCoinsOne = Math.floor(Math.random() * 9) + 1;
            initialRightCoinsTen = Math.floor(Math.random() * 5) + 1;
            initialRightCoinsOne = Math.floor(Math.random() * 9) + 1;

            leftVal = initialLeftCoinsOne + initialLeftCoinsTen * 10;
            rightVal = initialRightCoinsOne + initialRightCoinsTen * 10;
        } while (leftVal >= rightVal || (difficulty==='hard' && leftVal >= rightVal && initialLeftCoinsOne > initialRightCoinsOne));

        return { initialLeftCoinsTen, initialLeftCoinsOne, initialRightCoinsTen, initialRightCoinsOne };
    };

    const {
        initialLeftCoinsTen,
        initialLeftCoinsOne,
        initialRightCoinsTen,
        initialRightCoinsOne
    } = generateInitialValues();

    const [activeCoins, setActiveCoins] = useState(new Set());
    const [roundCount, setRoundCount] = useState(1);
    const [leftCoinsTen, setLeftCoinsTen] = useState(initialLeftCoinsTen);
    const [leftCoinsOne, setLeftCoinsOne] = useState(initialLeftCoinsOne);
    const [rightCoinsTen, setRightCoinsTen] = useState(initialRightCoinsTen);
    const [rightCoinsOne, setRightCoinsOne] = useState(initialRightCoinsOne);

    const [leftCoinsVisibleOne, setLeftCoinsVisibleOne] = useState(leftCoinsOne);
    const [leftCoinsVisibleTen, setLeftCoinsVisibleTen] = useState(leftCoinsTen);
    const [rightCoinsVisibleOne, setRightCoinsVisibleOne] = useState(rightCoinsOne);
    const [rightCoinsVisibleTen, setRightCoinsVisibleTen] = useState(rightCoinsTen);

    const leftVal = leftCoinsOne + leftCoinsTen * 10;
    const rightVal = rightCoinsOne + rightCoinsTen * 10;
    const [hint, setHint] = useState(false);

    const [isCorrect, setIsCorrect] = useState(false);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [allCoinsCrossed, setAllCoinsCrossed] = useState(false);

    const checkAllCoinsCrossed = () => {
        const leftCoinCount = leftCoinsTen + leftCoinsOne;
        const crossedLeftCoins = Array.from(activeCoins).filter(coin => coin.startsWith('left')).length;
        console.log(leftCoinCount, crossedLeftCoins)
        return crossedLeftCoins === (leftCoinCount-1);
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

    useEffect(() => {
        if (hint) {
            const timer = setTimeout(() => {
                setHint(false);
            }, 10000); // 10000 milliseconds = 10 seconds
            return () => clearTimeout(timer);
        }
    }, [hint]);

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

    const checkInput = () => {
        setCorrectnessLabel(true);
        if (parseInt(inputValue) === leftVal - rightVal) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        const { initialLeftCoinsTen, initialLeftCoinsOne, initialRightCoinsTen, initialRightCoinsOne } = generateInitialValues();

        setLeftCoinsTen(initialLeftCoinsTen);
        setLeftCoinsOne(initialLeftCoinsOne);
        setRightCoinsTen(initialRightCoinsTen);
        setRightCoinsOne(initialRightCoinsOne);

        setLeftCoinsVisibleOne(initialLeftCoinsOne);
        setLeftCoinsVisibleTen(initialLeftCoinsTen);
        setRightCoinsVisibleOne(initialRightCoinsOne);
        setRightCoinsVisibleTen(initialRightCoinsTen);

        setActiveCoins(new Set());
        setIsCorrect(false);
        setCorrectnessLabel(false);
        setInputValue('');
        setAllCoinsCrossed(false);
    };

    const handleConversion = () => {
        if (leftCoinsVisibleTen === 0 && rightCoinsVisibleTen > 0) {
            const newRightCoinsTen = rightCoinsTen - 1;
            const newRightCoinsVisibleTen = rightCoinsVisibleTen - 1;
            const newRightCoinsOne = rightCoinsOne + 10;
            const newRightCoinsVisibleOne = rightCoinsVisibleOne + 10;

            setRightCoinsTen(newRightCoinsTen);
            setRightCoinsOne(newRightCoinsOne);
            setRightCoinsVisibleOne(newRightCoinsVisibleOne);
            setRightCoinsVisibleTen(newRightCoinsVisibleTen);
        } else {
            setHint(true);
        }
    };

    if (roundCount >= ROUNDCOUNT) {
        return <EndOfGame levelName="Münzen subtrahieren 2" levelNr={9} />;
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
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} left="79.5%"/>}
                {!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} left="79.5%"/>}
                {hint && <CorrectnessLabel message="Streiche erst alle möglichen Münzen!" isVisible={true} style={{top: '0%', left: '0%', height: '15vh', width: '20vw'}}/>}
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

export default ActivityNine;