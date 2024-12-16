/* defauls.jsx */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import home_icon from './images/home_icon.png';
import questionmark_icon from './images/questionmark_icon.png';
import './defaults.css';

/* default variables */
export const ROUNDCOUNT = 7;
export const checkButtonTop = 92;

/* default components */
export const HomeLink = ({ top = '-6.5%' }) => {
    const { level, difficulty } = useParams();
    const levelNr = level.match(/\d+$/)?.[0];
    const tutorialPath = `/tutorial/${levelNr}${difficulty}`;
    const isActivity = level.startsWith('activity') && difficulty!==undefined;
    console.log(difficulty)
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    gap: '1vw',
                    top: top,
                    left: '95%',
                }}
            >
                {isActivity && <Link to={tutorialPath}>
                    <img
                        src={questionmark_icon}
                        alt="questionmark_icon"
                    />
                </Link>}
                <Link to="/">
                    <img
                        src={home_icon}
                        alt="home_icon"
                    />
                </Link>
            </div>
        </>
    );
};

const incrementHighestUnlockedLevel = (currentLevelNr, difficulty) => {
    let currentLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;
    if (currentLevelNr >= currentLevel) {
        currentLevel += 1;
        localStorage.setItem('highestUnlockedLevel', currentLevel);
    }
    const storedDifficulty = localStorage.getItem(`difficulty_${currentLevelNr}`);
    if (storedDifficulty !== '1') {
        localStorage.setItem(`difficulty_${currentLevelNr}`, difficulty);
    }
};

export const EndOfGame = ({ levelName, levelNr, difficulty }) => {
    const isEasy = difficulty === 'easy';

    return (
        <div className="container">
            <div className="white-box-regular" style={{ display: 'flex', alignItems: 'center' }}>
                <span className="congratulation-title">🌟  Herzlichen Glückwunsch!  🌟</span>
                <span className="congratulation-message">
                    Du hast das Level <strong>{levelName}</strong> erfolgreich gemeistert!
                </span>
                <Link to="/">
                    <button
                        className="button-default"
                        style={{ top: `${checkButtonTop}%` }}
                        onClick={() => incrementHighestUnlockedLevel(levelNr, isEasy ? 0 : 1)}
                    >
                        🌟 Zur Übersicht 🌟
                    </button>
                </Link>
            </div>
        </div>
    );
};

export const CorrectnessLabel = ({ message, isVisible, height = '15vh', width = '14vw' }) => {
    if (!isVisible) return null;
    
    return (
        <div className="overlay" style={{ height: height, width: width }} >
            <div
                className="overlay-content"
                style={{
                    backgroundColor: message === "Richtig!" ? "#d4edda" : 'var(--secondary-color)',
                    zIndex: '100'
                }}
            >
                {message === "Richtig!" ? (
                    <div className="star-container2">
                        <span style={{ fontWeight: 'bold' }}>🌟{message}🌟</span>
                    </div>
                    ) : (
                        <span>{message}</span>
                    )}
            </div>
        </div>
    );
};

export const ScreenSizeMessage = () => {
    return (
    <div className='container'>
        <div className='white-box-regular'>
            <div className="screen-size-message">
                Bitte verwende einen grösseren Bildschirm.
            </div>
        </div>
    </div>
    );
};