import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './difficultySelection.css';
import '../defaults.css';
import { HomeLink } from '../defaults';
import star from '../images/star.svg';

function DifficultySelection() {
    const { level, title } = useParams();
    const navigate = useNavigate();

    const handleSelection = (selectedDifficulty) => {
        navigate(`/${level}/${selectedDifficulty}`);
    };

    return (
        <div className="container">
            <div className="white-box-small">
                <HomeLink top="-15%"/>
                <span className="title-text" >{title}</span>
                <span className="medium-text">Wähle eine Schwierigkeitsstufe:</span>
                <div className="difficulty-buttons">
                    <button onClick={() => handleSelection('easy')} className='blue-square'>
                        Einfach
                        <div className="stars-upper">
                                <img src={star} alt="Star" className="star" style={{ paddingRight: "2%" }} />
                        </div>
                    </button>
                    <button onClick={() => handleSelection('hard')} className='blue-square'>
                        Schwierig
                        <div className="stars-upper">
                            <img src={star} alt="Star" className="star" style={{ paddingRight: "5%" }} />
                            <img src={star} alt="Star" className="star" style={{ paddingLeft: "5%" }} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DifficultySelection;