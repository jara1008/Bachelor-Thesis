import React, { useState, useEffect } from 'react';
import './activitySeven.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';
import { incrementHighestUnlockedLevel } from '../utils/utils.jsx';

function ActivitySeven() {
    const [isCorrect, setIsCorrect] = useState(false);
    const [roundCount, setRoundCount] = useState(1);
    const [displayCorrectness, setCorrectnessLabel] = useState(false);
    const [numberLarge, setNumberLarge] = useState([]);
    const [numberSmall, setNumberSmall] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const numberOne = generateRandomNumber();
        const numberTwo = generateRandomNumber();
        setNumberLarge(String(Math.max(numberOne, numberTwo)).padStart(4, '0').split('').map(Number));
        setNumberSmall(String(Math.min(numberOne, numberTwo)).padStart(4, '0').split('').map(Number));
        const newRows = [];
        const newInputRow = { type: 'input', valuesTop: Array(4).fill(''), valuesBottom: Array(4).fill('') };
        newRows.push(newInputRow);
        setRows(newRows);
    }, []); // Empty dependency array to run only once on mount

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 8999 + 1000) + 1;
    }

    const checkInput = () => {
        const sol = parseInt(numberLarge.join('')) - parseInt(numberSmall.join(''));
        const input = parseInt(rows[rows.length-1].valuesTop.join(''));
        if (sol === input) {
            setIsCorrect(true);
            setRoundCount(roundCount + 1);
        }
        else {
            const newInputRow = { type: 'input', valuesTop: Array(4).fill(''), valuesBottom: Array(4).fill('') };
            setRows([newInputRow]);
        }
    }

    const handleNext = () => {
        const numberOne = generateRandomNumber();
        const numberTwo = generateRandomNumber();
        setNumberLarge(String(Math.max(numberOne, numberTwo)).padStart(4, '0').split('').map(Number));
        setNumberSmall(String(Math.min(numberOne, numberTwo)).padStart(4, '0').split('').map(Number));
        
        const newInputRow = { type: 'input', valuesTop: Array(4).fill(''), valuesBottom: Array(4).fill('') };
        setRows([newInputRow]);

        setIsCorrect(false);
    }


    const handleRowInputChangeTop = (rowIndex, colIndex, event) => {
        const newRows = [...rows];
        newRows[rowIndex].valuesTop[colIndex] = event.target.value;
        setRows(newRows);
    }

    const handleRowInputChangeBottom = (rowIndex, colIndex, event) => {
        const newRows = [...rows];
        newRows[rowIndex].valuesBottom[colIndex] = event.target.value;
        setRows(newRows);
    }

    const handleDecrease = (index) => {
        // Create a copy of the current input values
        const newRowValues = [...rows];
        // Parse the current value to an integer
        var currentTopValues = newRowValues[newRowValues.length-1].valuesTop.map(value => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });

        var currentBotValues = newRowValues[newRowValues.length-1].valuesBottom.map(value => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? 0 : parsedValue;
        });

        if (rows.length < 2) {
            if (!checkIntermediate(currentTopValues, currentBotValues)) {
                return
            }
        }
        
        // Increase the next value by 10
        if(currentTopValues[index]<1) return;
        currentTopValues[index] = currentTopValues[index]-1;
        currentTopValues[index+1] += 10;

        // Add new rows
        const newRows = [...rows];
        const newRow = currentTopValues.map((value, idx) => ({
            top: value,
            bottom: currentBotValues[idx]
        }));
        newRows.push(newRow);

        // Add a new row with input fields
        const newInputRow = { type: 'input', valuesTop: Array(4).fill(''), valuesBottom: Array(4).fill('') };
        newRows.push(newInputRow);

        setRows(newRows);
    }

    const checkIntermediate = (currentTopValues, currentBotValues) => {
        for (let i=0; i<currentTopValues.length; i++) {
            const topNr = parseInt(numberLarge[i]);
            const botNr = parseInt(numberSmall[i]);
            console.log("NR: ", topNr, botNr, currentTopValues[i], currentBotValues[i])
            if (botNr < topNr) {
                if (topNr-botNr !== currentTopValues[i] || currentBotValues[i] !== 0) {
                    setCorrectnessLabel(true);
                    return false;
                }
            }
            else if (botNr > topNr) {
                if (botNr-topNr !== currentBotValues[i] || currentTopValues[i] !== 0) {
                    setCorrectnessLabel(true);
                    return false;
                }
            }
            else if (botNr === topNr) {
                if (currentBotValues[i] !== 0 || currentTopValues[i] !== 0) {
                    setCorrectnessLabel(true);
                    return false;
                }
            }
        }
        setCorrectnessLabel(false);
        return true;
    }

    if (roundCount >= 5) {
        // Message that the game is completed
        return (
            <div className="container">
                <div className="white-box-regular">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message">
                        Gratulation! Du hast Level Tabellensubtraktion geschafft!
                        <img src={congratulation_icon} alt="congratulation_icon" style={{ display: "block", margin: "0 auto" }} />
                    </div>
                    <Link to={"/"}>
                        <button className='button-default'
                            style={{ top: '85%', left: '50%', width: '30%' }} 
                            onClick={incrementHighestUnlockedLevel(5)}>
                            zur Übersicht
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container" >
            <div className="white-box-regular" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="title-text">TODO</span>
                {isCorrect && displayCorrectness && <div className="correctness-label-default">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-default">Versuche es nochmals!</div>}
                
                <table className="number-table-A7">
                    <thead>
                        <tr>
                            <th style={{ border:'none' }}><button className="header-button-A7" onClick={() => handleDecrease(0)}>Tauschen</button></th>
                            <th style={{ border:'none' }}><button className="header-button-A7" onClick={() => handleDecrease(1)}>Tauschen</button></th>
                            <th style={{ border:'none' }}><button className="header-button-A7" onClick={() => handleDecrease(2)}>Tauschen</button></th>
                            <th style={{ border:'none' }}></th>
                        </tr>
                        <tr>
                            <th>1000</th>
                            <th>100</th>
                            <th>10</th>
                            <th>1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {numberLarge.map((digit, index) => (
                                <td key={index} className="number-cell">
                                    <div className="number-font">{digit}</div>
                                    <div className="number-font">
                                        {index === 0 && <span className="minus-sign-A7">-</span>}
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
                                        </td>
                                    ))
                                ) : (
                                    row.map((value, index) => (
                                        <td key={index} className="number-cell">
                                            <div className="number-font">{value.top}</div>
                                            <div className="number-font">{value.bottom}</div>
                                        </td>
                                    ))
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={isCorrect ? handleNext : checkInput} className="button-default" 
                    style={{ top: '88%', left: '89%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivitySeven;