import React, { useState, useEffect, useCallback } from 'react';
import '../styles/activity10.css';
import '../defaults.css';
import { HomeLink, EndOfGame, ROUNDCOUNT, CorrectnessLabel, checkButtonTop } from '../defaults';

function ActivityTen({ difficulty }) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [numberLarge, setNumberLarge] = useState([]);
    const [numberSmall, setNumberSmall] = useState([]);
    const [columnValues, setColumnValues] = useState({ col1: '', col2: '', col3: '', col4: '' });
    const [blueSquareValues, setBlueSquareValues] = useState({ blue1: '', blue2: '', blue3: '' });
    const [minus, setMinus] = useState(false);

    const generateRandomNumbers = useCallback(() => {
        const randomNumber1 = Math.floor(Math.random() * 9999) + 1;
        const randomNumber2 = Math.floor(Math.random() * 9999) + 1;
        if (randomNumber1 < randomNumber2 && difficulty==='easy') {
            setNumberSmall(randomNumber1);
            setNumberLarge(randomNumber2);
        } else {
            setNumberLarge(randomNumber1);
            setNumberSmall(randomNumber2);
        }
    }, [difficulty]);

    useEffect(() => {
        generateRandomNumbers();
    }, [generateRandomNumbers]);

    const handleInputChange = (column, value) => {
        setColumnValues(prevState => ({
            ...prevState,
            [column]: value
        }));
    };

    const handleBlueSquareChange = (blueSquare, value) => {
        setBlueSquareValues(prevState => ({
            ...prevState,
            [blueSquare]: value
        }));
    };

    const invertNumbers = () => {
        let swap = numberSmall;
        setNumberSmall(numberLarge);
        setNumberLarge(swap);
        setMinus(true);
    };

    const checkInput = () => {
        setCorrectnessLabel(true);
        const { col1, col2, col3, col4 } = columnValues;
        const number =  parseInt(`${col1}${col2}${col3}${col4}`, 10);
        if ((numberLarge - numberSmall) === number) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        generateRandomNumbers();
        setColumnValues({ col1: '', col2: '', col3: '', col4: '' });
        setBlueSquareValues({ blue1: '', blue2: '', blue3: '' });
        setCorrectnessLabel(false);
        setIsCorrect(false);
        setMinus(false);
    };

    if (roundCount >= ROUNDCOUNT) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Schriftliche Subtraktion" levelNr={4} />;
    }

    return (
        <div className="container">
            <div className="white-box-regular">
                <HomeLink />
                <span className="title-text">Löse die Rechnung:</span>
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} />}
                {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} />}

                {difficulty === 'hard' && (
                    <button onClick={invertNumbers} className="button-invert-A10"></button>
                )}

                <div className="number-container-A10">
                    <div>
                        <div className="number-box-A10">
                            {minus && <div className="number-A10">{numberLarge}</div>}
                            <div className="number-A10">-{numberSmall}</div>
                        </div>
                        <div className="input-fields-A10">
                            <div className="input-row-A10">
                                <input
                                    type="text"
                                    className="input-A10"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                    value={blueSquareValues.blue1}
                                    onChange={e => handleBlueSquareChange('blue1', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input
                                    type="text"
                                    className="input-A10"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                    value={blueSquareValues.blue2}
                                    onChange={e => handleBlueSquareChange('blue2', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col3}
                                    onChange={e => handleInputChange('col3', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input
                                    type="text"
                                    className="input-A10"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                    value={blueSquareValues.blue3}
                                    onChange={e => handleBlueSquareChange('blue3', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col2}
                                    onChange={e => handleInputChange('col2', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col3}
                                    onChange={e => handleInputChange('col3', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                {minus && <div className='number-A10'>-</div>}
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col1}
                                    onChange={e => handleInputChange('col1', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col2}
                                    onChange={e => handleInputChange('col2', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col3}
                                    onChange={e => handleInputChange('col3', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                    style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityTen;