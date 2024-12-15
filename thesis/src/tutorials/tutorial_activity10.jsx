import React, { useState } from 'react';
import '../styles/activity10.css';
import '../defaults.css';
import { HomeLink, checkButtonTop } from '../defaults';

const tutorialStepsEasy = [
    { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
    { message: "Subtrahiere die untere Zahl von der oberen Zahl." },
    { message: "Nutze die blauen Felder um einen 10er hinzuzufügen." },
    { message: "Nun kannst du 11-5 berechnen." },
    { message: "Subtrahiere 4-1. Ziehe auch den 10er ab." },
    { message: "Subtrahiere 2-1." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

const tutorialStepsHard = [
    { message: 'Klicke auf "Weiter" um das Tutorial zu starten.' },
    { message: "Tausche die grössere Zahl nach oben." },
    { message: "Subtrahiere die untere Zahl von der oberen Zahl." },
    { message: "Subtrahiere die untere Zahl von der oberen Zahl." },
    { message: "Nutze die blauen Felder um einen 10er hinzuzufügen." },
    { message: "Nun kannst du 10-1 berechnen." },
    { message: "Subtrahiere 8-3. Ziehe auch den 10er ab." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

function TutorialActivity10({ difficulty, onComplete }) {
    const [numberLarge, setNumberLarge] = useState([' ', 8, 0, 1, 2]); 
    const [numberSmall, setNumberSmall] = useState(['-', 3, 1, 1, 1]);
    const [columnValues, setColumnValues] = useState({ col1: '', col2: '', col3: '', col4: '' });
    const [blueSquareValues, setBlueSquareValues] = useState({ blue1: '', blue2: '', blue3: '' });
    const [minus, setMinus] = useState(false);
    const [tutorialProgress, setTutorialProgress] = useState(0);
    const [buttonText, setButtonText] = useState('Weiter');

    const continueTutorial = (value) => {
        if ((difficulty === 'easy' && tutorialProgress === 6) || (difficulty === 'hard' && tutorialProgress === 7)) {
            onComplete();
        }
        if (tutorialProgress<7) {
            if (difficulty==='easy') {
                if (tutorialProgress===1 && value!=='0') {
                    return;
                }
                if (tutorialProgress===2 && value!=='1') {
                    return;
                }
                if (tutorialProgress===3 && value!=='6') {
                    return;
                }
                if (tutorialProgress===4 && value!=='2') {
                    return;
                }
                if (tutorialProgress===5 && value!=='1') {
                    return;
                }
            }
            if (difficulty==='hard') {
                if (tutorialProgress===2 && value!=='1') {
                    return;
                }
                if (tutorialProgress===3 && value!=='0') {
                    return;
                }
                if (tutorialProgress===4 && value!=='1') {
                    return;
                }
                if (tutorialProgress===5 && value!=='9') {
                    return;
                }
                if (tutorialProgress===6 && value!=='4') {
                    return;
                }
            }
            if ((difficulty==='easy' && tutorialProgress===5) || (difficulty==='hard' && tutorialProgress===6)) {
                setButtonText("Prüfen");
            }
            setTutorialProgress(tutorialProgress + 1);
        }
    }

    const handleInputChange = (column, value) => {
        setColumnValues(prevState => ({
            ...prevState,
            [column]: value
        }));
        continueTutorial(value);
    };

    const handleBlueSquareChange = (blueSquare, value) => {
        setBlueSquareValues(prevState => ({
            ...prevState,
            [blueSquare]: value
        }));
        continueTutorial(value);
    };

    const invertNumbers = () => {
        let swap = numberSmall;
        setNumberSmall(numberLarge);
        setNumberLarge(swap);
        setMinus(!minus);
        continueTutorial();
    };

    return (
        <div className="container">
            <span className="tutorial-header-regular">TUTORIAL</span>
            <div className="white-box-regular" style={{ boxShadow: "var(--default-highlight)" }} >
                <HomeLink />
                {difficulty==="easy" && <span className="title-text">{tutorialStepsEasy[tutorialProgress]['message']}</span>}
                {difficulty==="hard" && <span className="title-text">{tutorialStepsHard[tutorialProgress]['message']}</span>}
                <div className="number-container-A10">
                    <div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            {minus && <div className='minus-top-A10'>-</div>}
                            {difficulty === 'hard' && (
                                <button 
                                    onClick={invertNumbers} 
                                    className={`invert-button-A10 ${tutorialProgress === 1 ? 'highlighted' : ''}`} 
                                    disabled={tutorialProgress!==1}>
                                        ↓↑
                                </button>
                            )}
                            {(difficulty==='easy' && <div className="number-box-A10">
                                <div className="number-row-A10">
                                    <span className="number-A10-tutorial" style={{ width: '1vw', display: 'inline-block' }}>{''}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 5 ? 'highlighted' : ''}`}>{2}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 4 ? 'highlighted' : ''}`}>{4}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 2 || tutorialProgress === 3 ? 'highlighted' : ''}`}>{1}</span>
                                    <span className={`number-A10-tutorial ${(difficulty==='easy' && tutorialProgress===1) || (difficulty==='hard' && tutorialProgress === 2) ? 'highlighted' : ''}`}>{0}</span>
                                </div>
                                <div className="number-row-A10">
                                        <span className="number-A10-tutorial">-</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 5 ? 'highlighted' : ''}`}>{1}</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 4 ? 'highlighted' : ''}`}>{1}</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 2 || tutorialProgress === 3 ? 'highlighted' : ''}`}>{5}</span>
                                        <span className={`number-A10-tutorial ${(difficulty==='easy' && tutorialProgress===1) || (difficulty==='hard' && tutorialProgress === 2) ? 'highlighted' : ''}`}>{0}</span>
                                </div>
                            </div>)}
                            {(difficulty==='hard' && <div className="number-box-A10">
                                <div className="number-row-A10">
                                    <span className="number-A10-tutorial" style={{ width: '1vw', display: 'inline-block' }}>{''}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 6 ? 'highlighted' : ''}`}>{numberSmall[1]}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 4 || tutorialProgress === 5 ? 'highlighted' : ''}`}>{numberSmall[2]}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 3 ? 'highlighted' : ''}`}>{numberSmall[3]}</span>
                                    <span className={`number-A10-tutorial ${tutorialProgress === 2 ? 'highlighted' : ''}`}>{numberSmall[4]}</span>
                                </div>
                                <div className="number-row-A10">
                                        <span className="number-A10-tutorial">-</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 6 ? 'highlighted' : ''}`}>{numberLarge[1]}</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 4 || tutorialProgress === 5 ? 'highlighted' : ''}`}>{numberLarge[2]}</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 3 ? 'highlighted' : ''}`}>{numberLarge[3]}</span>
                                        <span className={`number-A10-tutorial ${tutorialProgress === 2 ? 'highlighted' : ''}`}>{numberLarge[4]}</span>
                                </div>
                            </div>)}
                        </div>
                        <div className="input-fields-A10">
                            <div className="input-row-A10">
                                <input
                                    type="text"
                                    className="input-A10"
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                    value={blueSquareValues.blue1}
                                    onChange={e => handleBlueSquareChange('blue1', e.target.value)}
                                    readOnly={true}
                                />
                                <input
                                    type="text"
                                    className={`input-A10 ${(difficulty==='easy' && tutorialProgress===1) || (difficulty==='hard' && tutorialProgress === 2) ? 'highlighted' : ''}`}
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                    readOnly={(difficulty==='easy' && tutorialProgress!==1) || (difficulty==='hard' && tutorialProgress!==2)}
                                />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input
                                    type="text"
                                    className={`input-A10 ${(tutorialProgress==='easy' && (tutorialProgress === 2 || tutorialProgress === 4)) ? 'highlighted' : ''}`}
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                    value={blueSquareValues.blue2}
                                    onChange={e => handleBlueSquareChange('blue2', e.target.value)}
                                    readOnly={difficulty==='hard' || tutorialProgress!==2}
                                />
                                <input
                                    type="text"
                                    className={`input-A10 ${tutorialProgress === 3 ? 'highlighted' : ''}`}
                                    value={columnValues.col3}
                                    onChange={e => handleInputChange('col3', e.target.value)}
                                    readOnly={tutorialProgress!==3}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                <input
                                    type="text"
                                    className={`input-A10 ${(difficulty==='hard' && tutorialProgress === 4) || (difficulty==='hard' && tutorialProgress === 6) ? 'highlighted' : ''}`}
                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                    value={blueSquareValues.blue3}
                                    onChange={e => handleBlueSquareChange('blue3', e.target.value)}
                                    readOnly={difficulty==='easy' || tutorialProgress!==4}
                                />
                                <input
                                    type="text"
                                    className={`input-A10 ${(difficulty==='easy' && tutorialProgress===4) || (difficulty==='hard' && tutorialProgress===5) ? 'highlighted' : ''}`}
                                    value={columnValues.col2}
                                    onChange={e => handleInputChange('col2', e.target.value)}
                                    readOnly={(difficulty==='easy' && tutorialProgress!==4) || (difficulty==='hard' && tutorialProgress!==5)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col3}
                                    onChange={e => handleInputChange('col3', e.target.value)}
                                    readOnly={true}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                            <div className="coin-row-divider-A10" />
                            <div className="input-row-A10">
                                {minus && <div className='minus-bot-A10'>-</div>}
                                <input
                                    type="text"
                                    className={`input-A10 ${(difficulty==='easy' && tutorialProgress === 5) || (difficulty==='hard' && tutorialProgress === 6) ? 'highlighted' : ''}`}
                                    value={columnValues.col1}
                                    onChange={e => handleInputChange('col1', e.target.value)}
                                    readOnly={(difficulty==='easy' && tutorialProgress!==5) || (difficulty==='hard' && tutorialProgress!==6)}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col2}
                                    onChange={e => handleInputChange('col2', e.target.value)}
                                    readOnly={true}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col3}
                                    onChange={e => handleInputChange('col3', e.target.value)}
                                    readOnly={true}
                                />
                                <input
                                    type="text"
                                    className="input-A10"
                                    value={columnValues.col4}
                                    onChange={e => handleInputChange('col4', e.target.value)}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={continueTutorial}
                    className={`button-default ${((difficulty==='easy' && tutorialProgress===6) 
                        || (difficulty==='hard' && tutorialProgress===7) || tutorialProgress === 0) ? 'highlighted' : ''}`}
                    disabled={
                        (difficulty === 'easy' && [1, 2, 3, 4, 5].includes(tutorialProgress)) ||
                        (difficulty === 'hard' && [1, 2, 3, 4, 5, 6].includes(tutorialProgress))
                    }
                    style={{ top: `${checkButtonTop}%`, left: '50%', cursor: tutorialProgress===0 || (difficulty==='easy' && tutorialProgress===6) || (difficulty==='hard' && tutorialProgress===7) ? 'pointer' : 'default' }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default TutorialActivity10;