import React, { useState, useEffect } from 'react';
import '../styles/activity5.css';
import '../defaults.css';
import { HomeLink, EndOfGame, CorrectnessLabel, checkButtonTop } from '../defaults';
import { predefinedSetsA5 } from './predefinedSets.jsx';

function Activity5({ difficulty }) {
    const [numbers, setNumbers] = useState({ largeNum: 0, smallNum: 0 });
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(0);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [randomSet, setRandomSet] = useState([]);

    useEffect(() => {
        const sets = predefinedSetsA5[difficulty];
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setRandomSet(randomSet);
        setNumbers(randomSet[roundCount]);
    }, [difficulty, roundCount]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const checkInput = () => {
        setCorrectnessLabel(true);
        if (parseInt(inputValue) === numbers.largeNum - numbers.smallNum) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNext = () => {
        setRoundCount(prevCount => prevCount + 1);
        if (roundCount + 1 < randomSet.length) {
            setNumbers(randomSet[roundCount + 1]);
            setIsCorrect(false);
            setInputValue('');
            setCorrectnessLabel(false);
        }
    };

    if (roundCount >= randomSet.length) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Additionsrätsel" levelNr={4} difficulty={difficulty} />;
    }

    return (
        <div className="container">
            <div className="white-box-regular">
                <HomeLink />
                <span className="title-text">Fülle das Kästchen so, dass die Rechnung stimmt: </span>
                <div className="info-A5">
                    {numbers.smallNum} +
                    <input
                        type="text"
                        value={inputValue}
                        placeholder=""
                        onChange={handleInputChange}
                        className="info-input-A5"
                        readOnly={isCorrect}
                    />
                    = {numbers.largeNum}
                </div>
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} />}
                {!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} />}
                <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                    style={{ top: `${checkButtonTop}%`, left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default Activity5;