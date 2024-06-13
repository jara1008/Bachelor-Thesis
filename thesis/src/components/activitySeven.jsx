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
    const [inputValuesTop, setInputValuesTop] = useState(Array(4).fill(''));
    const [inputValuesBottom, setInputValuesBottom] = useState(Array(4).fill(''));
    const [numberLarge, setNumberLarge] = useState([]);
    const [numberSmall, setNumberSmall] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const numberOne = generateRandomNumber();
        const numberTwo = generateRandomNumber();
        setNumberLarge(String(Math.max(numberOne, numberTwo)).padStart(4, '0').split('').map(Number));
        setNumberSmall(String(Math.min(numberOne, numberTwo)).padStart(4, '0').split('').map(Number));
    }, []); // Empty dependency array to run only once on mount

    const generateRandomNumber = () => {
        Math.floor(Math.random() * 8999 + 1000) + 1;
    }

    const checkInput = () => {
        // Add your input checking logic here
    }

    const handleNext = () => {
        // Add your logic for handling the next round here
    }

    const handleChangeTop = (index, event) => {
        const newInputValues = [...inputValuesTop];
        newInputValues[index] = event.target.value;
        setInputValuesTop(newInputValues);
    }

    const handleChangeBottom = (index, event) => {
        const newInputValues = [...inputValuesBottom];
        newInputValues[index] = event.target.value;
        setInputValuesBottom(newInputValues);
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
        const newRowValues = [...inputValuesTop];

        // Parse the current value to an integer
        const currentValue = parseInt(newRowValues[index], 10);

        // Check if the current value is a number and greater than 0
        if (!isNaN(currentValue) && currentValue > 0) {
            newRowValues[index] = (currentValue - 1).toString();
        }

        // Increase the next value by 10
        const nextValue = parseInt(newRowValues[index + 1], 10) || 0;
        newRowValues[index + 1] = (nextValue + 10).toString();

        // Add new rows
        const newRows = [...rows];
        const newRow = newRowValues.map((value, idx) => ({
            top: value,
            bottom: inputValuesBottom[idx]
        }));
        newRows.push(newRow);

        // Add a new row with input fields
        const newInputRow = { type: 'input', valuesTop: Array(4).fill(''), valuesBottom: Array(4).fill('') };
        newRows.push(newInputRow);

        setRows(newRows);
    }

    if (roundCount >= 5) {
        // Message that the game is completed
        return (
            <div className="container-A7">
                <div className="white-box-A7">
                    <Link to={"/"}>
                        <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                    </Link>
                    <div className="congratulation-message-A7">
                        Gratulation! Du hast Level Tabellensubtraktion geschafft!
                        <img src={congratulation_icon} alt="congratulation_icon" style={{ display: "block", margin: "0 auto" }} />
                    </div>
                    <Link to={"/"}>
                        <button className='button-A7'
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
        <div className="container-A7" >
            <div className="white-box-A7" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper-A7">TODO</span>
                {isCorrect && displayCorrectness && <div className="correctness-label-A7">Richtig!</div>}
                {!!!isCorrect && displayCorrectness && <div className="correctness-label-A7">Versuche es nochmals!</div>}
                
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
                        <tr>
                            {inputValuesTop.map((value, index) => (
                                <td key={index} className="number-cell">
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(event) => handleChangeTop(index, event)}
                                        className="input-field-A7"
                                    />
                                    <input
                                        type="text"
                                        value={inputValuesBottom[index]}
                                        onChange={(event) => handleChangeBottom(index, event)}
                                        className="input-field-A7"
                                        style={{ marginTop: '5px' }} 
                                    />
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

                <button onClick={isCorrect ? handleNext : checkInput} className="button-A7" 
                    style={{ top: '88%', left: '85%' }} >
                    {isCorrect ? "Weiter" : "Prüfen"}
                </button>
            </div>
        </div>
    );
}

export default ActivitySeven;
