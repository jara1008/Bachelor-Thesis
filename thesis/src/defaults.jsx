/* defauls.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import home_icon from './images/home_icon.png';
import './defaults.css';

/* default variables */
export const ROUNDCOUNT = 2;

/* default components */
export const HomeLink = () => (
  <Link to={"/"}>
    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
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
            <Link to={"/"}>
                <button className='button-default'
                    style={{ top: '90%', left: '50%' }} 
                    onClick={incrementHighestUnlockedLevel(levelNr)}>
                    zur Übersicht
                </button>
            </Link>
        </div>
    </div>
);