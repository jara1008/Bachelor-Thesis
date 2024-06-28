import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './activityFive.css';
import '../defaults.css';
import { HomeLink } from '../defaults';

function DifficultySelection() {
    const { level } = useParams();
    const navigate = useNavigate();

    const handleSelection = (selectedDifficulty) => {
        console.log(level, selectedDifficulty);
        navigate(`/${level}/${selectedDifficulty}`);
    };

    return (
        <div className="container">
            <div className="white-box-regular">
                <HomeLink />
                <span className="title-text">Wähle eine Schwierigkeitsstufe:</span>
                <div className="difficulty-buttons">
                    <button onClick={() => handleSelection('easy')}>Leicht</button>
                    <button onClick={() => handleSelection('hard')}>Schwer</button>
                </div>
            </div>
        </div>
    );
}

export default DifficultySelection;