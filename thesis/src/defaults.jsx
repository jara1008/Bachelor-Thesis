/* defauls.jsx */
import React from 'react';
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

const incrementHighestUnlockedLevel = (currentLevelNr) => {
    let currentLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;
    console.log("current Level: " ,currentLevel)
    if (currentLevelNr >= currentLevel) {
        currentLevel += 1;
        localStorage.setItem('highestUnlockedLevel', currentLevel);
    }
};

export const EndOfGame = ({ levelName, levelNr }) => (
    <div className="container">
        <div className="white-box-regular">
            <HomeLink />
            <div className="congratulation-message">
                Gratulation! Du hast das Level { levelName } geschafft!
                { /* Add party icon */ }
            </div>
            <Link to={"/Bachelor_Thesis/"}>
                <button className='button-default'
                    style={{ top: '90%', left: '50%' }} 
                    onClick={incrementHighestUnlockedLevel(levelNr)}>
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