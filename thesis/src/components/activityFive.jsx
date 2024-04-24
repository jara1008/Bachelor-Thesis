import React, { useState, useEffect } from 'react';
import './activityFive.css';
import { Link } from 'react-router-dom';
import home_icon from '../images/home_icon.png';
import congratulation_icon from '../images/congratulation_icon.png';

function ActivityFive() {
    const [numbers, setNumbers] = useState({ largeNum: 0, smallNum: 0 });
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        generateRandomNumbers();
    }, []);

    const generateRandomNumbers = () => {
        let firstNum = Math.floor(Math.random() * 20) + 1;
        let secondNum = Math.floor(Math.random() * 20) + 1;
        if (secondNum < firstNum) {
            let swap = firstNum;
            firstNum = secondNum;
            secondNum = swap;
        }
        setNumbers({
            smallNum: firstNum,
            largeNum: secondNum
        });
        console.log(numbers);
    };

    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    return (
        <div className="container" >
            <div className="white-box" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper">Fülle das Kästchen so, dass die Rechnung stimmt: </span>
                <div className="info">
                    {numbers.smallNum} + 
                    <input
                        type="text" 
                        placeholder=""
                        className="info-input"
                    />
                    = {numbers.largeNum}
                </div>
            </div>
        </div>
    );
}

export default ActivityFive;