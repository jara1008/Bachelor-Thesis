import React, { useState } from 'react';
import '../styles/activity6.css';
import '../defaults.css';
import { HomeLink, checkButtonTop } from '../defaults';

const tutorialStepsEasy = [
    { message: "Löse die Rechnung:" },
    { message: "Entferne Münzen mit demselben Wert." },
    { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
    { message: "Zähle die restlichen Münzen." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

const tutorialStepsHard = [
    { message: "Löse die Rechnung:" },
    { message: "Entferne Münzen mit demselben Wert." },
    { message: "Tausche 10er Münzen in 1er Münzen um." },
    { message: "Streiche Münzen, bis es auf einer Seite keine mehr hat." },
    { message: "Zähle die restlichen Münzen." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

function TutorialActivity6({ difficulty, onComplete }) {
    const [inputValue, setInputValue] = useState('');
    const [tutorialProgress, setTutorialProgress] = useState(0);
    const [buttonText, setButtonText] = useState('Weiter');
    let leftVal, rightVal;

    if (difficulty === 'easy') {
        leftVal = 5;
        rightVal = 2;
    } else {
        leftVal = 11;
        rightVal = 2;
    }

    const continueTutorial = () => {
        if (difficulty==='easy' && tutorialProgress===3) {
            setInputValue('3');
            setButtonText('Prüfen');
        }
        if (difficulty==='hard' && tutorialProgress===4) {
            setInputValue('9');
            setButtonText('Prüfen');
        }
        if (tutorialProgress < 5) {
            setTutorialProgress(tutorialProgress + 1);
        }
        if ((tutorialProgress === 4 && difficulty === 'easy') || (tutorialProgress === 5 && difficulty === 'hard')){
            onComplete();
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (difficulty==='easy' && tutorialProgress === 3 && value === '3') {
            setTutorialProgress(4);  
            setButtonText("Prüfen");
        }
        else if (difficulty==='hard' && tutorialProgress === 4 && value === '9') {
            setTutorialProgress(5); 
            setButtonText("Prüfen");
        }
    };

    function CoinRowUpperLeft() {
        return (
            <div className="coin-stack-A6">
                {difficulty==='hard' && tutorialProgress<3 &&
                    <div className={ "coin-A6" } 
                        style={{cursor: tutorialProgress!==2 ? 'default' : 'pointer' }}
                            onClick={tutorialProgress === 2 ? () => continueTutorial() : undefined}>
                        10
                    </div>}
                <div className={`coin-A6 ${tutorialProgress === 1 ? 'highlighted' : ''}`} 
                    style={{cursor: tutorialProgress!==1 ? 'default' : 'pointer', 
                        backgroundColor: tutorialProgress < 2 ? '#BFC4F2' : 'red'}}
                        onClick={tutorialProgress === 1 ? () => continueTutorial() : undefined}>
                    1
                </div>
                {difficulty==='easy' && 
                    <div className={`coin-A6 ${tutorialProgress === 2 ? 'highlighted' : ''}`} 
                        style={{cursor: tutorialProgress!==2 ? 'default' : 'pointer',
                            backgroundColor: tutorialProgress < 3 ? '#BFC4F2' : 'red'}}
                            onClick={tutorialProgress === 2 ? () => continueTutorial() : undefined}>
                        1
                    </div>}
                {difficulty==='easy' &&
                    <div className={`coin-A6`} readOnly={true}
                        style={{cursor: 'default' }}>
                        1
                    </div>
                }
                {difficulty==='easy' &&
                    <div className={`coin-A6`} readOnly={true}
                        style={{cursor: 'default' }}>
                        1
                    </div>
                }
                {difficulty==='easy' &&
                    <div className={`coin-A6`} readOnly={true}
                        style={{cursor: 'default' }}>
                        1
                    </div>
                }
                {difficulty==='hard' && tutorialProgress > 2 &&
                    <div
                        className={`coin-A6 ${tutorialProgress === 3 ? 'highlighted' : ''}`}
                        style={{
                            cursor: tutorialProgress !== 3 ? 'default' : 'pointer',
                            backgroundColor: tutorialProgress < 4 ? '#BFC4F2' : 'red'
                        }}
                        onClick={tutorialProgress === 3 ? () => continueTutorial() : undefined}
                    >
                    1
                    </div>
                }
                {difficulty === 'hard' && tutorialProgress > 2 && (
                    Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className={`coin-A6`}
                            style={{ cursor: 'default' }}
                        >
                            1
                        </div>
                    ))
                )}
            </div>
        );
    }

    function CoinRowUpperRight() {
        return (
            <div className="coin-stack-A6">
                <div className={`coin-A6 ${tutorialProgress === 1 ? 'highlighted' : ''}`} 
                    style={{cursor: tutorialProgress!==1 ? 'default' : 'pointer', 
                        backgroundColor: tutorialProgress < 2 ? '#BFC4F2' : 'red'}}
                        onClick={tutorialProgress === 1 ? () => continueTutorial() : undefined}>
                    1
                </div>
                {difficulty==='easy' && 
                    <div className={`coin-A6 ${tutorialProgress === 2 ? 'highlighted' : ''}`} 
                        style={{cursor: tutorialProgress!==2 ? 'default' : 'pointer', 
                            backgroundColor: tutorialProgress < 3 ? '#BFC4F2' : 'red'}}
                            onClick={tutorialProgress === 2 ? () => continueTutorial() : undefined}>
                        1
                    </div>}
                {difficulty==='hard' && 
                    <div
                        className={`coin-A6 ${tutorialProgress === 3 ? 'highlighted' : ''}`}
                        style={{
                            cursor: tutorialProgress !== 3 ? 'default' : 'pointer',
                            backgroundColor: tutorialProgress < 4 ? '#BFC4F2' : 'red'
                        }}
                        onClick={tutorialProgress === 3 ? () => continueTutorial() : undefined}
                    >
                    1
                    </div>
                }
            </div>
        );
    }
    
    function CoinRowLowerLeft() {
        return (
            <div className="coin-stack-A6">
                {difficulty==='hard' && tutorialProgress < 3 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        10
                    </div>
                )}
                {tutorialProgress < 2 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        1
                    </div>
                )}
                {difficulty==='hard' && tutorialProgress > 2 && tutorialProgress < 4 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        1
                    </div>
                )}
                { difficulty === 'easy' && tutorialProgress < 2 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        1
                    </div>
                )}
                {difficulty === 'easy' &&
                    <div
                        className={`coin-A6 ${tutorialProgress === 3 ? 'highlighted' : ''}`}>
                        1
                    </div>}
                {difficulty === 'easy' &&
                    <div
                        className={`coin-A6 ${tutorialProgress === 3 ? 'highlighted' : ''}`}>
                        1
                    </div>}
                {difficulty === 'easy' &&
                    <div
                        className={`coin-A6 ${tutorialProgress === 3 ? 'highlighted' : ''}`}>
                        1
                    </div>}
                {difficulty === 'hard' && tutorialProgress > 2 && (
                    Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className={`coin-A6 ${tutorialProgress === 4 ? 'highlighted' : ''}`}
                            style={{ cursor: 'default' }}
                        >
                            1
                        </div>
                    ))
                )}
            </div>
        );
    }

    function CoinRowLowerRight() {
        return (
            <div className="coin-stack-A6">
                {tutorialProgress < 2 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        1
                    </div>
                )}
                {difficulty==='easy' && tutorialProgress < 3 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        1
                    </div>
                )}
                {difficulty==='hard' && tutorialProgress < 4 && (
                    <div
                        className={`coin-A6`}
                        style={{ cursor: 'default' }}>
                        1
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="white-box-large">
                <HomeLink />
                {difficulty==="easy" && <span className="title-text">{tutorialStepsEasy[tutorialProgress]['message']}</span>}
                {difficulty==="hard" && <span className="title-text">{tutorialStepsHard[tutorialProgress]['message']}</span>}
                {difficulty === 'hard' && (
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <button  className={`header-button ${tutorialProgress === 2 ? 'highlighted' : ''}`} style={{ left: "25%", marginTop: "2vh" }}
                        onClick={() => continueTutorial()}
                        disabled={tutorialProgress !== 2}>
                        Tauschen
                    </button>
                    <button className="header-button" style={{ left: "75%", marginTop: "2vh" }}>
                        Tauschen
                    </button>
                </div>
                )}
    
                <div className="equation-row">
                    <span className='equation-part'>{leftVal}</span>
                    <span className='equation-part'>-</span>
                    <span className='equation-part'>{rightVal}</span>
                </div>
    
                <div className="coin-row-A6">
                    <div className="coin-container-A6">
                        <span className="equal-sign">=</span>
                        <CoinRowUpperLeft />
                    </div>
                    <span className="minus-sign" >-</span>
                    <div className="coin-container-A6">
                        <CoinRowUpperRight />
                    </div>
                </div>

                <div className="coin-row-A6">
                    <div className="coin-container-A6">
                        <span className="equal-sign">=</span>
                        <CoinRowLowerLeft />
                    </div>
                    {((difficulty==='easy' && tutorialProgress < 3) || (difficulty==='hard' && tutorialProgress < 4)) && <span className="minus-sign">-</span>}
                    <div className="coin-container-A6">
                        <CoinRowLowerRight />
                    </div>
                </div>
    
                <div className="equation-row">
                    <span className='equation-part'>{leftVal}</span>
                    <span className='equation-part'>-</span>
                    <span className='equation-part'>{rightVal}</span>
    
                    <span className='equal-sign'>=</span>
                    <input
                        type="text"
                        value={inputValue}
                        placeholder=""
                        onChange={handleInputChange}
                        className={`info-input-A6 ${(difficulty==='easy' && tutorialProgress === 3) || (difficulty==='hard' && tutorialProgress === 4) ? 'highlighted' : ''}`}
                        disabled={(difficulty==='easy' && tutorialProgress !== 3) || (difficulty==='hard' && tutorialProgress !== 4)} 
                    />
                </div>
                <button
                    onClick={continueTutorial}
                    className={`button-default ${((difficulty==='easy' && tutorialProgress===4) 
                        || (difficulty==='hard' && tutorialProgress===5) || tutorialProgress === 0) ? 'highlighted' : ''}`}
                        disabled={
                            (difficulty === 'easy' && [1, 2, 3].includes(tutorialProgress)) ||
                            (difficulty === 'hard' && [1, 2, 3, 4].includes(tutorialProgress))
                        }
                    style={{ top: `${checkButtonTop}%`, left: '50%', cursor: tutorialProgress===3 ? 'default' : 'pointer' }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );    
}

export default TutorialActivity6;