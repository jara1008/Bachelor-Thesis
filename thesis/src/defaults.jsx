/* defauls.jsx */
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import home_icon from './images/home_icon.png';
import './defaults.css';

/* default variables */
export const ROUNDCOUNT = 3;
export const checkButtonTop = 92;

/* default components */
export const HomeLink = ({ top = '-8%' }) => (
  <Link to={"/"}>
    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: top, left: "95%" }} />
  </Link>
);

const incrementHighestUnlockedLevel = (currentLevelNr, difficulty) => {
    let currentLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;
    if (currentLevelNr >= currentLevel) {
        currentLevel += 1;
        localStorage.setItem('highestUnlockedLevel', currentLevel);
    }
    localStorage.setItem(`difficulty_${currentLevelNr}`, difficulty);
};

export const EndOfGame = ({ levelName, levelNr, difficulty }) => (
    <div className="container">
        <div className="white-box-regular">
            <HomeLink />
            <div className="congratulation-message">
                Gratulation! Du hast das Level { levelName } geschafft!
                { /* Add party icon */ }
            </div>
            <Link to={"/"}>
                <button className='button-default'
                    style={{ top: '90%', left: '50%' }} 
                    onClick={incrementHighestUnlockedLevel(levelNr, difficulty==='easy' ? 0 : 1)}>
                    zur Übersicht
                </button>
            </Link>
        </div>
    </div>
);

export const CorrectnessLabel = ({ message, isVisible, top = '80%', left = '76%', height = '12vh', width = '13vw' }) => {
    if (!isVisible) return null;

    return (
        <div className="overlay" style={{ top: top, left: left, height: height, width: width }} >
            <div className="overlay-content" >
                {message}
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

export const HintLabel = ({ message, isVisible, onTimeout }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onTimeout();
            }, 10000); // 10000 milliseconds = 10 seconds
            return () => clearTimeout(timer);
        }
    }, [isVisible, onTimeout]);

    return (
        isVisible && (
            <div className="hint-label">
                {message}
            </div>
        )
    );
};