import React, { useState } from 'react';
import '../styles/activity2.css';
import { HomeLink } from '../defaults';
import '../defaults.css';
import { checkButtonTop } from '../defaults';

const tutorialStepsEasy = [
    { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
    { message: "Die Länge der oberen Reihe entspricht 3." },
    { message: "Die Länge der unteren Reihe entspricht 2." },
    { message: "Wähle <, =, > passend." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

const tutorialStepsHard = [
    { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
    { message: "Die Länge der oberen Reihe entspricht 3." },
    { message: "Die Länge der unteren Reihe entspricht 2." },
    { message: "Wähle <, =, > passend." },
    { message: "Zähle die überschüssigen Kästchen."},
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

const TutorialActivity2 = ({ difficulty, onComplete }) => {
    const numCubesFirstRow = 3;
    const numCubesSecondRow = 2;
    const [inputValue, setInputValue] = useState('');
    const [differenceValue, setDifferenceValue] = useState('');
    const [tutorialProgress, setTutorialProgress] = useState(0);
    const [buttonText, setButtonText] = useState('Weiter');

    const handleButtonClick = (value) => {
        setInputValue(value);
    };

    const setDifference = (value) => {
        setDifferenceValue(value);
        if (value==='1') { continueTutorial() };
    }

    const continueTutorial = () => {
        if (difficulty==='hard' && tutorialProgress===4) {
            console.log("HERE")
            setButtonText('Prüfen');
        }
        if (tutorialProgress===3) {
            setInputValue('>');
            if (difficulty==='easy') {setButtonText('Prüfen')};
        }
        if ((difficulty === 'easy' && tutorialProgress === 4) || (difficulty === 'hard' && tutorialProgress === 5)) {
            onComplete();
        }
        if (tutorialProgress<5) {
            setTutorialProgress(tutorialProgress + 1);
        }
    }

    return (
        <div className="container">
            <span className="tutorial-header-regular">TUTORIAL</span>
            <div className="white-box-regular" style={{ boxShadow: "var(--default-highlight)" }} >
                <HomeLink />
                {difficulty==="easy" && <span className="title-text">{tutorialStepsEasy[tutorialProgress]['message']}</span>}
                {difficulty==="hard" && <span className="title-text">{tutorialStepsHard[tutorialProgress]['message']}</span>}
                <div className="cube-rows-A2">
                    <div className={`cube-row-A2 ${tutorialProgress === 1 ? 'highlighted' : ''}`}>
                        {Array.from({ length: numCubesFirstRow }, (_, index) => (
                            <div key={index} className={`cube-A2 ${difficulty==='hard' && tutorialProgress === 4 && index === numCubesFirstRow - 1 ? 'highlighted' : ''}`}>
                                <span className="cube-label-A2">1cm</span>
                            </div>
                        ))}
                    </div>
                    <div className={`cube-row-A2 ${tutorialProgress === 2 ? 'highlighted' : ''}`}>
                        {Array.from({ length: numCubesSecondRow }, (_, index) => (
                            <div key={index} className="cube-A2">
                                <span className="cube-label-A2">1cm</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="info-A2">
                <span className={`number-label ${tutorialProgress === 1 ? 'highlighted' : ''}`}>{numCubesFirstRow}</span>
                    <input
                        type="text"
                        value={inputValue}
                        disabled='true'
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                        className="info-input-A2"
                        readOnly={tutorialProgress!==3}
                    />
                <span className={`number-label ${tutorialProgress === 2 ? 'highlighted' : ''}`}>{numCubesSecondRow} </span>
                </div>
                <div>
                    <div className="button-container-A2">
                        <button className={`operator-button-A2 ${tutorialProgress === 3 ? 'highlighted' : ''}`} disabled='true' style={{cursor: tutorialProgress!==3 ? 'default' : 'not-allowed'}} onClick={() => handleButtonClick('<')}>{'<'}</button>
                        <button className={`operator-button-A2 ${tutorialProgress === 3 ? 'highlighted' : ''}`} disabled='true' style={{cursor: tutorialProgress!==3 ? 'default' : 'not-allowed'}} onClick={() => handleButtonClick('=')}>{'='}</button>
                        <button className={`operator-button-A2 ${tutorialProgress === 3 ? 'highlighted' : ''}`} disabled={tutorialProgress!==3} style={{cursor: tutorialProgress!==3 ? 'default' : 'pointer'}} onClick={() => continueTutorial()}>{'>'}</button>
                    </div>
                    <div className="label-container-A2">
                        <span className="operator-label-A2">kleiner als</span>
                        <span className="operator-label-A2">gleich</span>
                        <span className="operator-label-A2">grösser als</span>
                    </div>
                </div>
                {difficulty === 'hard' && (
                    <div className="difference-container">
                        <span className='title-text-small'>Der Längenunterschied beträgt:</span>
                        <input
                            type="text"
                            value={differenceValue}
                            onChange={(e) => setDifference(e.target.value)}
                            placeholder=""
                            className={`info-input-A2 ${tutorialProgress === 4 ? 'highlighted' : ''}`}
                            readOnly={tutorialProgress!==4}
                        />
                    </div>
                )}
                <button
                    onClick={continueTutorial}
                    className={`button-default ${
                        ((difficulty==='easy' && tutorialProgress===4) ||
                        (difficulty==='hard' && tutorialProgress===5) || 
                        tutorialProgress===0 || tutorialProgress===1 || tutorialProgress===2) 
                        ? 'highlighted' : ''}`}
                    disabled={tutorialProgress===3}
                    style={{ top: `${checkButtonTop}%`, left: '50%', cursor: tutorialProgress===3 ? 'default' : 'pointer' }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}


export default TutorialActivity2;