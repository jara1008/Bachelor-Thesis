import React, { useState, useEffect, useCallback } from 'react';
import '../styles/activityTen.css';
import '../defaults.css';
import { HomeLink, EndOfGame, ROUNDCOUNT, CorrectnessLabel } from '../defaults';

function ActivityTen({ difficulty }) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [numberLarge, setNumberLarge] = useState([]);
    const [numberSmall, setNumberSmall] = useState([]);
    const [rows, setRows] = useState([]);

    const generateRandomNumber = () => {
        const randomNumber1 = Math.floor(Math.random() * 9999) + 1;
        const randomNumber2 = Math.floor(Math.random() * 9999) + 1;
        if (randomNumber1 < randomNumber2) {
            setNumberSmall(randomNumber1);
            setNumberLarge(randomNumber2);
        }
        else {
            setNumberLarge(randomNumber1);
            setNumberSmall(randomNumber2);
        }
    }

    useEffect(() => {
        const numberOne = generateRandomNumber();
        const numberTwo = generateRandomNumber();
    }, []); // Empty dependency array to run only once on mount

    const checkInput = () => {

    }

    const handleNext = () => {
        
    }

    if (roundCount >= ROUNDCOUNT) {
        /* Message that the game is completed */
        return <EndOfGame levelName="Schriftliche Subtraktion" levelNr={4} />;
    }

    return (
        <div className="container" >
            <div className="white-box-tall" >
                <HomeLink top="-6%"/>
                <span className="title-text">Löse die Rechnung:</span>
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} top="82%" left="78%"/>}
                {!!!isCorrect && displayCorrectness && <CorrectnessLabel message="Versuche es nochmal!" isVisible={true} top="82%" left="78%"/>}
                
                <div className="number-container-A10">
                    <div>
                        <div className="number-box-A10">
                            <div className="number-A10">{numberLarge}</div>
                            <div className="number-A10">-{numberSmall}</div>
                        </div>
                        <div className="input-fields-A10">
                            <div className="input-row-A10">
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                                <input type="text" className="input-A10" />
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={isCorrect ? handleNext : checkInput} className="button-default" 
                    style={{ top: '94%', left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivityTen;