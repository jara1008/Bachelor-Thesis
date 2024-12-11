import React, { useState } from 'react';
import '../styles/activity7.css';
import '../defaults.css';
import { HomeLink, checkButtonTop } from '../defaults';

const tutorialStepsEasy = [
    { message: "Löse die Rechnung:" },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 1." },
    { message: "Rechne 2-1. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 1-1. Schreibe die Lösung ins Kästchen." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 0." },
    { message: "Rechne 0-0. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 2-0. Schreibe die Lösung ins Kästchen." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 1." },
    { message: "Rechne 2-1. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 1-1. Schreibe die Lösung ins Kästchen." },
    { message: "Hier kannst du noch mehr abziehen! Tausche dafür einen 10er." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 2." },
    { message: "Rechne 10-2. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 2-2. Schreibe die Lösung ins Kästchen." },
    { message: "Jetzt können wir nichts mehr abziehen." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

const tutorialStepsHard = [
    { message: "Löse die Rechnung:" },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 0." },
    { message: "Rechne 0-0. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 5-0. Schreibe die Lösung ins Kästchen." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 1." },
    { message: "Rechne 5-1. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 1-1. Schreibe die Lösung ins Kästchen." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 0." },
    { message: "Rechne 4-0. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 0-0. Schreibe die Lösung ins Kästchen." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 3." },
    { message: "Rechne 6-3. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 3-3. Schreibe die Lösung ins Kästchen." },
    { message: "Hier kannst du noch mehr abziehen! Tausche dafür einen 10er." },
    { message: "Finde heraus welche Zahl kleiner ist. Hier ist es 5." },
    { message: "Rechne 10-5. Schreibe die Lösung ins Kästchen." },
    { message: "Rechne 5-5. Schreibe die Lösung ins Kästchen." },
    { message: "Jetzt können wir nichts mehr abziehen." },
    { message: "Klicke auf Prüfen, um die Aufgabe abzuschliessen."}
];

function TutorialActivity7({ difficulty, onComplete }) {
    const [numberLarge] = useState(difficulty === 'easy' ? [2, 0, 2] : [6, 4, 5, 0]);
    const [numberSmall] = useState(difficulty === 'easy' ? [1, 2, 1] : [3, 0, 1, 5]);
    const nrCols = difficulty === 'hard' ? 4 : 3;
    const [rows, setRows] = useState([
        { type: 'input', valuesTop: Array(nrCols).fill(''), valuesBottom: Array(nrCols).fill('') }
    ]);
    const [tutorialProgress, setTutorialProgress] = useState(0);
    const [buttonText, setButtonText] = useState('Weiter');

    const continueTutorial = (value) => {
        if (difficulty==='easy') {
            if (tutorialProgress===2 && value!=="1") { return; }
            if (tutorialProgress===3 && value!=="0") { return; }
            if (tutorialProgress===5 && value!=="0") { return; }
            if (tutorialProgress===6 && value!=="2") { return; }
            if (tutorialProgress===8 && value!=="1") { return; }
            if (tutorialProgress===9 && value!=="0") { return; }
            if (tutorialProgress===12 && value!=="8") { return; }
            if (tutorialProgress===13 && value!=="0") { return; }
            if (tutorialProgress===14) {
                setButtonText("Prüfen");
            }
            if (tutorialProgress === 15) {
                onComplete();
            }
        }

        if (difficulty==='hard') {
            if (tutorialProgress===2 && value!=="0") { return; }
            if (tutorialProgress===3 && value!=="5") { return; }
            if (tutorialProgress===5 && value!=="4") { return; }
            if (tutorialProgress===6 && value!=="0") { return; }
            if (tutorialProgress===8 && value!=="4") { return; }
            if (tutorialProgress===9 && value!=="0") { return; }
            if (tutorialProgress===11 && value!=="3") { return; }
            if (tutorialProgress===12 && value!=="0") { return; }
            if (tutorialProgress===15 && value!=="5") { return; }
            if (tutorialProgress===16 && value!=="0") { return; }
            if (tutorialProgress===17) {
                setButtonText("Prüfen");
            }
            if (tutorialProgress === 18) {
                onComplete();
            }
        }
        
        if (tutorialProgress < 18) {
            setTutorialProgress(tutorialProgress + 1);
        }
    };

    const handleRowInputChangeTop = (rowIndex, colIndex, event) => {
        const newRows = [...rows];
        newRows[rowIndex].valuesTop[colIndex] = event.target.value;
        setRows(newRows);
        continueTutorial(event.target.value);
    };

    const handleRowInputChangeBottom = (rowIndex, colIndex, event) => {
        const newRows = [...rows];
        newRows[rowIndex].valuesBottom[colIndex] = event.target.value;
        setRows(newRows);
        continueTutorial(event.target.value);
    };

    const handleDecrease = (index) => {
        const newRows = [...rows];
        const lastRow = newRows[newRows.length - 1];

        // Parse values from the last input row
        const currentTopValues = lastRow.valuesTop.map((value) => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });

        const currentBotValues = lastRow.valuesBottom.map((value) => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });

        // Perform the decrease logic
        currentTopValues[index] -= 1;
        currentTopValues[index + 1] += 10;

        // Add a new static row with the updated values
        const newStaticRow = currentTopValues.map((value, idx) => ({
            top: value,
            bottom: currentBotValues[idx]
        }));
        newRows.push(newStaticRow);

        // Add a new input row
        const newInputRow = { type: 'input', valuesTop: Array(nrCols).fill(''), valuesBottom: Array(nrCols).fill('') };
        for (let i = 0; i < nrCols; i++) {
            if (i===index) {
                newInputRow.valuesTop[i] = currentBotValues[i] !== 0 ? '' : lastRow.valuesTop[i]-1;
                newInputRow.valuesBottom[i] = currentBotValues[i] !== 0 ? '' : lastRow.valuesBottom[i];
            }
            else {
                newInputRow.valuesTop[i] = currentBotValues[i] !== 0 ? '' : lastRow.valuesTop[i];
                newInputRow.valuesBottom[i] = currentBotValues[i] !== 0 ? '' : lastRow.valuesBottom[i];
            }
        }
        newRows.push(newInputRow);

        setRows(newRows);
        continueTutorial();
    };

    return (
        <div className="container">
            <div className="white-box-tall">
                <HomeLink top="-6%" />
                {difficulty==="easy" && <span className="title-text">{tutorialStepsEasy[tutorialProgress]['message']}</span>}
                {difficulty==="hard" && <span className="title-text">{tutorialStepsHard[tutorialProgress]['message']}</span>}

                <table className="number-table-A7">
                    {nrCols === 4 && (
                        <thead>
                            <tr>
                                <th style={{ border: 'none' }}>
                                    <button  disabled={true }className="header-button" onClick={() => handleDecrease(0)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <button disabled={true} className="header-button" onClick={() => handleDecrease(1)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <button disabled={tutorialProgress !== 13} className={`header-button ${tutorialProgress === 13 ? 'highlighted' : ''}`} onClick={() => handleDecrease(2)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}></th>
                            </tr>
                            <tr>
                                <th>1000</th>
                                <th>100</th>
                                <th>10</th>
                                <th>1</th>
                            </tr>
                        </thead>
                    )}
                    {nrCols === 3 && (
                        <thead>
                            <tr>
                                <th style={{ border: 'none' }}>
                                    <button disabled={tutorialProgress !== 10} className={`header-button ${tutorialProgress === 10 ? 'highlighted' : ''}`} onClick={() => handleDecrease(0)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <button disabled={true} className="header-button" onClick={() => handleDecrease(1)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}></th>
                            </tr>
                            <tr>
                                <th>100</th>
                                <th>10</th>
                                <th>1</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        <tr>
                            {numberLarge.map((digit, index) => (
                                <td key={index} className={`number-cell 
                                        ${(difficulty==='easy' && ((tutorialProgress === 1 && index === 2) ||
                                        (tutorialProgress === 4 && index === 1) ||
                                        (tutorialProgress === 7 && index === 0)))
                                        || (difficulty==='hard' && ((tutorialProgress === 1 && index === 3) ||
                                        (tutorialProgress === 4 && index ===2) ||
                                        (tutorialProgress === 7 && index ===1) ||
                                        (tutorialProgress === 10 && index === 0)))
                                         ? 'highlighted' : ''}`}>
                                    <div className="number-font">{digit}</div>
                                    <div className="number-font">
                                        {index===0 && <span className="minus-sign-A7">-</span>}
                                        {numberSmall[index]}
                                    </div>
                                </td>
                            ))}
                        </tr>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.type === 'input' ? (
                                    row.valuesTop.map((value, index) => (
                                        <td key={index} className={`number-cell ${
                                            (difficulty==='easy' && tutorialProgress===10  && index===1) ||
                                            (difficulty==='hard' && tutorialProgress===13  && index===3) 
                                            ? 'highlighted' : ''}`}>
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(event) => handleRowInputChangeTop(rowIndex, index, event)}
                                                className={`input-field-A7 
                                                    ${(difficulty==='easy' && ((tutorialProgress === 2 && index===2) ||
                                                    (tutorialProgress === 5 && index===1) ||
                                                    (tutorialProgress === 8 && index===0) ||
                                                    (tutorialProgress === 12 && index===1 && rowIndex===2)))
                                                    || (difficulty==='hard' && ((tutorialProgress === 2 && index===3) ||
                                                    (tutorialProgress === 5 && index===2) ||
                                                    (tutorialProgress === 8 && index===1) ||
                                                    (tutorialProgress === 11 && index===0) ||
                                                    (tutorialProgress === 15 && index===3 && rowIndex===2)))
                                                        ? 'highlighted' : ''}`}
                                                disabled={
                                                    !(
                                                        (difficulty === 'easy' &&
                                                            (
                                                                (tutorialProgress === 2 && index === 2) ||
                                                                (tutorialProgress === 5 && index === 1) ||
                                                                (tutorialProgress === 8 && index === 0) ||
                                                                (tutorialProgress === 12 && index === 1 && rowIndex === 2)
                                                            )
                                                        ) ||
                                                        (difficulty === 'hard' &&
                                                            (
                                                                (tutorialProgress === 2 && index === 3) ||
                                                                (tutorialProgress === 5 && index === 2) ||
                                                                (tutorialProgress === 8 && index === 1) ||
                                                                (tutorialProgress === 11 && index === 0) ||
                                                                (tutorialProgress === 15 && index === 3 && rowIndex === 2)
                                                            )
                                                        )
                                                    )                                                    
                                                }
                                            />
                                            <input
                                                type="text"
                                                value={row.valuesBottom[index]}
                                                onChange={(event) => handleRowInputChangeBottom(rowIndex, index, event)}
                                                className={`input-field-A7 
                                                    ${(difficulty==='easy' && ((tutorialProgress === 3 && index===2) ||
                                                    (tutorialProgress === 6 && index===1) ||
                                                    (tutorialProgress === 9 && index===0) ||
                                                    (tutorialProgress === 13 && index===1 && rowIndex===2) ||
                                                    (tutorialProgress === 14 && index===2 && rowIndex===2) ||
                                                    (tutorialProgress === 14 && index===1 && rowIndex===2) ||
                                                    (tutorialProgress === 14 && index===0 && rowIndex===2)))
                                                    || (difficulty==='hard' && ((tutorialProgress === 3 && index===3) ||
                                                    (tutorialProgress === 6 && index===2) ||
                                                    (tutorialProgress === 9 && index===1) ||
                                                    (tutorialProgress === 12 && index===0) ||
                                                    (tutorialProgress === 16 && index===3 && rowIndex===2) ||
                                                    (tutorialProgress === 17 && index===3 && rowIndex===2) ||
                                                    (tutorialProgress === 17 && index===2 && rowIndex===2) ||
                                                    (tutorialProgress === 17 && index===1 && rowIndex===2) ||
                                                    (tutorialProgress === 17 && index===0 && rowIndex===2)))
                                                        ? 'highlighted' : ''}`}
                                                style={{ marginTop: '5px' }}
                                                disabled={
                                                    !(
                                                        (difficulty==='easy' &&
                                                            (
                                                                (tutorialProgress === 3 && index === 2) ||
                                                                (tutorialProgress === 6 && index === 1) ||
                                                                (tutorialProgress === 9 && index === 0) ||
                                                                (tutorialProgress === 13 && index === 1 && rowIndex===2)
                                                            )
                                                        ) ||
                                                        (difficulty==='hard' &&
                                                            (
                                                                (tutorialProgress === 3 && index === 3) ||
                                                                (tutorialProgress === 6 && index === 2) ||
                                                                (tutorialProgress === 9 && index === 1) ||
                                                                (tutorialProgress === 12 && index===0) ||
                                                                (tutorialProgress === 16 && index === 3 && rowIndex===2)
                                                            )
                                                        )
                                                    )
                                                }
                                            />
                                        </td>
                                    ))
                                ) : (
                                    row.map((value, index) => (
                                        <td key={index} className={`number-cell ${
                                            (difficulty==='easy' && tutorialProgress === 11 && index===1) ||
                                            (difficulty==='hard' && tutorialProgress === 14 && index===3)
                                            ? 'highlighted' : ''}`}>
                                            <div className="number-font">{value.top}</div>
                                            <div className="number-font">{value.bottom}</div>
                                        </td>
                                    ))
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={continueTutorial}
                    className={`button-default ${
                        (tutorialProgress===0 || tutorialProgress===1 || tutorialProgress===4 || tutorialProgress===7 || tutorialProgress===14) ||
                        (difficulty==='easy' && (tutorialProgress===11 || tutorialProgress===15)) ||
                        (difficulty==='hard' && (tutorialProgress===10 || tutorialProgress===17 || tutorialProgress===18))
                        ? 'highlighted' : ''}`}
                        disabled={
                            (difficulty === 'easy' && [2, 3, 5, 6, 8, 9, 10, 12, 13].includes(tutorialProgress)) ||
                            (difficulty === 'hard' && [2, 3, 5, 6, 8, 9, 11, 12, 13, 15, 16].includes(tutorialProgress))
                        }
                    style={{ top: `${checkButtonTop}%`, left: '50%', cursor: tutorialProgress===3 ? 'default' : 'pointer' }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default TutorialActivity7;