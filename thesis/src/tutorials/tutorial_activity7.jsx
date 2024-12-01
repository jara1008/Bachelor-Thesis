import React, { useState } from 'react';
import '../styles/activity7.css';
import '../defaults.css';
import { HomeLink } from '../defaults';

function TutorialActivity7({ difficulty }) {
    const [numberLarge, setNumberLarge] = useState([1, 1, 1]);
    const [numberSmall, setNumberSmall] = useState([2, 2, 2]);
    const nrCols = difficulty === 'hard' ? 4 : 3;
    const [rows, setRows] = useState([
        { type: 'input', valuesTop: Array(nrCols).fill(''), valuesBottom: Array(nrCols).fill('') }
    ]);

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
        newRows.push(newInputRow);

        setRows(newRows);
    };

    return (
        <div className="container">
            <div className="white-box-tall">
                <HomeLink top="-6%" />
                <span className="title-text">Löse die Rechnung:</span>

                <table className="number-table-A7">
                    {nrCols === 4 && (
                        <thead>
                            <tr>
                                <th style={{ border: 'none' }}>
                                    <button className="header-button" onClick={() => handleDecrease(0)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <button className="header-button" onClick={() => handleDecrease(1)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <button className="header-button" onClick={() => handleDecrease(2)}>Tauschen</button>
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
                                    <button className="header-button" onClick={() => handleDecrease(0)}>Tauschen</button>
                                </th>
                                <th style={{ border: 'none' }}>
                                    <button className="header-button" onClick={() => handleDecrease(1)}>Tauschen</button>
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
            </div>
        </div>
    );
}

export default TutorialActivity7;