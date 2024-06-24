import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./overview.css";
import rocket from "../images/rocket.png";
import planet from "../images/planet.png";
import star_empty from "../images/star_empty.svg";
import lock from "../images/lock.png";

function Overview() {
    const [boxes] = useState([
        { id: 1, top: '14%', left: '37%', path: "/instructionsOne", title: "Mengen Vergleich" },
        { id: 2, top: '14%', left: '52%', path: "/activityTwo", title: "Längen Vergleich" },
        { id: 3, top: '14%', left: '67%', path: "/activityThree", title: "Münz Vergleich" },
        { id: 4, top: '41%', left: '37%', title: "TODO" },
        { id: 5, top: '41%', left: '52%', path: "/activityFive", title: "Additions-rätsel" },
        { id: 6, top: '41%', left: '67%', path: "/activitySix", title: "Münzen subtrahieren" },
        { id: 7, top: '68%', left: '37%', path: "/activitySeven", title: "Tabellen-subtraktion" },
        { id: 8, top: '68%', left: '52%', path: "/activityEight", title: "Distanzen erkennen" },
        { id: 9, top: '68%', left: '67%', title: "TODO" }
    ]);

    const [dots, setDots] = useState([]);
    const numberOfDots = 9; 

    const [rocketPosition] = useState('28.25%');
    const [rocketPositionTop] = useState('92%');

    // Get the highest unlocked level from local storage or set it to 1 if not available
    //const highestUnlockedLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;
    const highestUnlockedLevel = 8;

    useEffect(() => {
        const topOffset = 8; 
        const bottomOffset = 90;
        const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
            id: index,
            top: `${topOffset + index * ((bottomOffset - topOffset) / (numberOfDots - 1))}%`
        }));
        setDots(newDots);
    }, [numberOfDots]);

    return (
        <div className="overview">
            <img src={rocket} alt="Rocket" style={{
                position: 'absolute',
                left: rocketPosition,
                height: "4.5vw",
                width: "4.5vw",
                transform: 'translate(-50%, -50%)', // Center the rocket image on the dot
                top: rocketPositionTop,
            }} />
            <img src={planet} alt="Planet" style={{
                position: 'absolute',
                left: '28.25%',
                height: "110px",
                width: "110px",
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
            </div>
            {boxes.map((box) => (
                box.id <= highestUnlockedLevel ? (
                    <Link to={box.path} key={box.id} style={{ position: 'absolute', top: box.top, left: box.left }}>
                        <div className="rectangle" style={box.id === highestUnlockedLevel ? { boxShadow: "0px 0px 15px 8px #bec3f1d6" } : {}}>
                            {box.title}
                            <div className="stars-upper" style={{ marginTop: "5%" }}>
                                <img src={star_empty} alt="Star" className="star" style={{ paddingRight: "2%" }} />
                                <img src={star_empty} alt="Star" className="star" style={{ paddingLeft: "2%" }} />
                            </div>
                            <div className="stars-lower" style={{ marginTop: "-5%" }}>
                                <img src={star_empty} alt="Star" className="star" />
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
