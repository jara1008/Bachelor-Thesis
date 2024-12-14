import React, { useState, useEffect, useCallback } from 'react';
import '../styles/activity7.css';
import '../defaults.css';
import { HomeLink, EndOfGame, CorrectnessLabel } from '../defaults';
import { predefinedSetsA7 } from './predefinedSets.jsx';

function Activity7({ difficulty }) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(0);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [numberLarge, setNumberLarge] = useState([]);
    const [numberSmall, setNumberSmall] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedSet, setSelectedSet] = useState([]);
    const nrCols = difficulty === 'hard' ? 4 : 3;
    const [lastAcceptedTopValues, setLastAcceptedTopValues] = useState(Array(nrCols).fill(0));
    const [lastAcceptedBotValues, setLastAcceptedBotValues] = useState(Array(nrCols).fill(0));

    /* Hints */
    const [hintSwap, setHintSwap] = useState(false);
    const [hintNoSwap, setHintNoSwap] = useState(false);
    const [hintCheckLastRow, setHintCheckLastRow] = useState(false);

    useEffect(() => {
        const sets = difficulty === 'easy' ? predefinedSetsA7.easy : predefinedSetsA7.hard;
        const randomSet = sets[Math.floor(Math.random() * sets.length)];
        setSelectedSet(randomSet);
    }, [difficulty]);

    const generateNewNumbers = useCallback(() => {
        if (selectedSet.length > 0) {
            const { large, small } = selectedSet[roundCount];
            const newLargeValues = String(large).padStart(nrCols, '0').split('').map(Number);
            const newSmallValues = String(small).padStart(nrCols, '0').split('').map(Number);

            setNumberLarge(newLargeValues);
            setNumberSmall(newSmallValues);

            const newRows = [];
            const newInputRow = { type: 'input', valuesTop: Array(nrCols).fill(''), valuesBottom: Array(nrCols).fill('') };
            newRows.push(newInputRow);
            setRows(newRows);

            setLastAcceptedTopValues(newLargeValues.map((value, index) => value));
            setLastAcceptedBotValues(newSmallValues.map((value, index) => value)); 

            setIsCorrect(false);
            setCorrectnessLabel(false);
        }
    }, [nrCols, roundCount, selectedSet]);

    useEffect(() => {
        generateNewNumbers();
    }, [generateNewNumbers]);

    const checkInput = () => {
        const sol = parseInt(numberLarge.join('')) - parseInt(numberSmall.join(''));
        const input = parseInt(rows[rows.length - 1].valuesTop.join(''));
        if (sol === input) {
            setCorrectnessLabel(true);
            setIsCorrect(true);
        } else {
            const currentTopValues = rows[rows.length - 1].valuesTop.map(value => parseInt(value, 10) || 0);
            const currentBotValues = rows[rows.length - 1].valuesBottom.map(value => parseInt(value, 10) || 0);
            if (checkIntermediate(currentTopValues, currentBotValues)) {
                setHintSwap(true);
                setTimeout(() => {
                    setHintSwap(false);
                }, 5000);
                return;
            }
            else {
                setHintCheckLastRow(true);
                setTimeout(() => {
                    setHintCheckLastRow(false);
                }, 5000);
            }
        
            /*const newInputRow = { type: 'input', valuesTop: Array(nrCols).fill(''), valuesBottom: Array(nrCols).fill('') };
            setRows([newInputRow]);*/
        }
    };

    const handleNext = () => {
        if (roundCount < selectedSet.length - 1) {
            generateNewNumbers();
            setRoundCount(prevCount => prevCount + 1);
        } else {
            setRoundCount(selectedSet.length); // End game condition
        }
    };

    const handleRowInputChangeTop = (rowIndex, colIndex, event) => {
        const newRows = [...rows];
        newRows[rowIndex].valuesTop[colIndex] = event.target.value;
        setRows(newRows);
    };

    const handleRowInputChangeBottom = (rowIndex, colIndex, event) => {
        const newRows = [...rows];
        newRows[rowIndex].valuesBottom[colIndex] = event.target.value;
        setRows(newRows);
    };

    const handleDecrease = (index) => {
        // Create a copy of the current input values
        const newRowValues = [...rows];
        // Parse the current value to an integer
        var currentTopValues = newRowValues[newRowValues.length - 1].valuesTop.map(value => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });

        var currentBotValues = newRowValues[newRowValues.length - 1].valuesBottom.map(value => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });
        
        if (!checkIntermediate(currentTopValues, currentBotValues)) {
            setHintCheckLastRow(true);
            setTimeout(() => {
                setHintCheckLastRow(false);
            }, 5000)
            return;
        }

        // Increase the next value by 10
        if (currentTopValues[index] < 1 || currentTopValues[index+1]+10 > 10 || currentBotValues[index+1]===0) {
            setHintNoSwap(true);
                setTimeout(() => {
                    setHintNoSwap(false);
                }, 5000);
            return;
        }
        currentTopValues[index] = currentTopValues[index]-1;
        currentTopValues[index + 1] += 10;

        // Add new rows
        const newRowsCopy = [...rows];
        const newRow = currentTopValues.map((value, idx) => ({
            top: value,
            bottom: currentBotValues[idx]
        }));
        newRowsCopy.push(newRow);

        // Add a new row with input fields
        const newInputRow = { type: 'input', valuesTop: Array(nrCols).fill(''), valuesBottom: Array(nrCols).fill('') };
        newRowsCopy.push(newInputRow);

        setRows(newRowsCopy);

        setLastAcceptedTopValues(currentTopValues);
        setLastAcceptedBotValues(currentBotValues);
        console.log(lastAcceptedBotValues, lastAcceptedTopValues, currentTopValues, currentBotValues)
    };

    const checkIntermediate = (currentTopValues, currentBotValues) => {
        for (let i = 0; i < currentTopValues.length; i++) {
            const topNr = lastAcceptedTopValues[i];
            const botNr = lastAcceptedBotValues[i];
            if (botNr < topNr) {
                if (topNr - botNr !== currentTopValues[i] || currentBotValues[i] !== 0) {
                    setCorrectnessLabel(true);
                    return false;
                }
            } else if (botNr > topNr) {
                if (botNr - topNr !== currentBotValues[i] || currentTopValues[i] !== 0) {
                    setCorrectnessLabel(true);
                    return false;
                }
            } else if (botNr === topNr) {
                if (currentBotValues[i] !== 0 || currentTopValues[i] !== 0) {
                    setCorrectnessLabel(true);
                    return false;
                }
            }
        }
        setCorrectnessLabel(false);
        return true;
    };

    if (roundCount >= Math.max(1, selectedSet.length-1)) {
        return <EndOfGame levelName="Tabellensubtraktion" levelNr={6} difficulty={difficulty} />;
    }

    return (
        <div className="container">
            <div className="white-box-tall">
                <HomeLink top="-6%" />
                <span className="title-text">Löse die Rechnung:</span>
                {isCorrect && displayCorrectness && <CorrectnessLabel message="Richtig!" isVisible={true} top="82%" left="78%" />}
                {hintSwap && <CorrectnessLabel message="Hier kannst du etwas tauschen!" isVisible={true} top="82%" left="78%" />}
                {hintNoSwap && <CorrectnessLabel message="Hier kannst du nichts tauschen!" isVisible={true} top="82%" left="78%" />}
                {hintCheckLastRow && <CorrectnessLabel message="Überprüfe die letzte Reihe!" isVisible={true} top="82%" left="78%" />}

                <table className="number-table-A7">
                    {nrCols === 4 &&
                        <thead>
                            <tr>
                                <th style={{ border: 'none' }}><button className="header-button" onClick={() => handleDecrease(0)}>Tauschen</button></th>
                                <th style={{ border: 'none' }}><button className="header-button" onClick={() => handleDecrease(1)}>Tauschen</button></th>
                                <th style={{ border: 'none' }}><button className="header-button" onClick={() => handleDecrease(2)}>Tauschen</button></th>
                                <th style={{ border: 'none' }}></th>
                            </tr>
                            <tr>
                                <th>1000</th>
                                <th>100</th>
                                <th>10</th>
                                <th>1</th>
                            </tr>
                        </thead>}
                    {nrCols === 3 &&
                        <thead>
                            <tr>
                                <th style={{ border: 'none' }}><button className="header-button" onClick={() => handleDecrease(0)}>Tauschen</button></th>
                                <th style={{ border: 'none' }}><button className="header-button" onClick={() => handleDecrease(1)}>Tauschen</button></th>
                                <th style={{ border: 'none' }}></th>
                            </tr>
                            <tr>
                                <th>100</th>
                                <th>10</th>
                                <th>1</th>
                            </tr>
                        </thead>}
                    <tbody>
                        <tr>
                            {numberLarge.map((digit, index) => (
                                <td key={index} className="number-cell">
                                    <div className="number-font">{digit}</div>
                                    <div className="number-font">
                                        {index === 0 && <span className="minus-sign-A7" style={{ display: 'inline-block' }}>-</span>}
                                        {numberSmall[index]}
                                    </div>
                                </td>
                            ))}
                        </tr>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.type === 'input' ? (
                                    row.valuesTop.map((value, index) => (
                                        <td key={index} className="number-cell">
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(event) => handleRowInputChangeTop(rowIndex, index, event)}
                                                className="input-field-A7"
                                            />
                                            <input
                                                type="text"
                                                value={row.valuesBottom[index]}
                                                onChange={(event) => handleRowInputChangeBottom(rowIndex, index, event)}
                                                className="input-field-A7"
                                                style={{ marginTop: '5px' }}
                                            />
                                            <span className="minus-sign-A7" style={{ display: 'inline-block' }}>-</span>
                                        </td>
                                    ))
                                ) : (
                                    row.map((value, index) => (
                                        <td key={index} className="number-cell">
                                            <div className="number-font">{value.top}</div>
                                            <span className="minus-sign-A7" style={{ display: 'inline-block' }}>-</span>
                                            <div className="number-font">{value.bottom}</div>
                                        </td>
                                    ))
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={isCorrect ? handleNext : checkInput} className="button-default"
                    style={{ top: '94%', left: '50%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default Activity7;