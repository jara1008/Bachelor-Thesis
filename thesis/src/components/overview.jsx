
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./overview.css";
import rocket from "../images/rocket.png";
import planet from "../images/planet.png";
import star_empty from "../images/star_empty.svg";
import star from "../images/star.svg";
import lock from "../images/lock.png";

function Overview() {
    const [boxes] = useState([
        { id: 1, top: '14%', left: '37%', path: "/difficultySelection/activity1/Mengen Vergleich", title: "Mengen Vergleich" },
        { id: 2, top: '14%', left: '52%', path: "/difficultySelection/activity2/Längen Vergleich", title: "Längen Vergleich" },
        { id: 3, top: '14%', left: '67%', path: "/difficultySelection/activity3/Münz Vergleich", title: "Münz Vergleich" },
        { id: 4, top: '41%', left: '37%', path: "/difficultySelection/activity5/Additionsrätsel", title: "Additions-rätsel" },
        { id: 5, top: '41%', left: '52%', path: "/difficultySelection/activity6/Münzen subtrahieren 1", title: "Münzen subtrahieren 1" },
        { id: 6, top: '41%', left: '67%', path: "/difficultySelection/activity7/Tabellensubtraktion", title: "Tabellen-subtraktion" },
        { id: 7, top: '68%', left: '37%', path: "/difficultySelection/activity8/Positionen erkennen", title: "Positionen erkennen" },
        { id: 8, top: '68%', left: '52%', path: "/difficultySelection/activity9/Münzen subtrahieren 2", title: "Münzen subtrahieren 2" },
        { id: 9, top: '68%', left: '67%', path: "/difficultySelection/activity10/Schriftliche Subtraktion",  title: "Schriftliche Subtraktion" },
    ]);

    const [dots, setDots] = useState([]);
    const [rocketPositionTop, setRocketPositionTop] = useState('90%');

    const numberOfDots = 9;

    // Get the highest unlocked level from local storage or set it to 1 if not available
    const highestUnlockedLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;

    // Initialize the difficulty array with values from local storage or default to -1
    const difficulty = Array.from({ length: 9 }, (_, i) => {
        const storedValue = localStorage.getItem(`difficulty_${i + 1}`);
        return storedValue !== null ? parseInt(storedValue) : -1;
    });

    useEffect(() => {
        const topOffset = 8; 
        const bottomOffset = 90;
        const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
            id: index,
            top: `${topOffset + index * ((bottomOffset - topOffset) / (numberOfDots - 1))}%`
        }));
        setDots(newDots);
    }, [numberOfDots]);

    useEffect(() => {
        if (highestUnlockedLevel > 1 && dots.length > 0 && highestUnlockedLevel <= numberOfDots) {
            setRocketPositionTop(dots[dots.length - highestUnlockedLevel].top);
            console.log(dots[dots.length - highestUnlockedLevel].top)
        }
    }, [dots, highestUnlockedLevel, numberOfDots]);

    return (
        <div className="overview">
            <img src={planet} alt="Planet" style={{
                position: 'absolute',
                left: '28.25%',
                height: "10vw",
                width: "10vw",
                transform: 'translate(-50%, -50%)',
                top: '10%',
                filter: 'drop-shadow(8px 8px 4px #00000040)'
            }} />
            <div className="progress-line">
                {dots.map((dot) => (
                    <div key={dot.id} style={{ 
                        position: 'absolute', 
                        top: dot.top, 
                        left: '50%', 
                        transform: 'translateX(-50%)'
                    }} className="dot"></div>
                ))}
                <img src={rocket} alt="Rocket" style={{
                    position: 'relative',
                    height: "4.5vw",
                    width: "4.5vw",
                    transform: "translate(-100%, -35%)", // Center the rocket image on the dot
                    top: rocketPositionTop,
                }} />
            </div>
            {boxes.map((box) => (
                box.id <= highestUnlockedLevel ? (
                    <Link to={box.path} key={box.id} style={{ position: 'absolute', top: box.top, left: box.left }}>
                        <div className="rectangle" style={box.id === highestUnlockedLevel ? { boxShadow: "0px 0px 15px 8px #bec3f1d6" } : {}}>
                            {box.title}
                            <div className="stars-upper">
                                <img src={difficulty[box.id - 1] >= 0 ? star : star_empty} alt="Star" className="star" style={{ paddingRight: "2%" }} />
                                <img src={difficulty[box.id - 1] >= 1 ? star : star_empty} alt="Star" className="star" style={{ paddingLeft: "2%" }} />
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div key={box.id} style={{ position: 'absolute', top: box.top, left: box.left }}>
                        <div className="rectangle inactive" style={box.id === highestUnlockedLevel ? { boxShadow: "0px 0px 15px 8px #bec3f1d6" } : {}}>
                            {box.title}
                            <div className="lock-div" style={{ marginTop: "7%" }}>
                                <img src={lock} alt="Lock" className="lock" />
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default Overview;