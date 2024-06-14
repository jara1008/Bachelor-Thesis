import React from 'react';
import { Link } from 'react-router-dom';
import '../defaults.css';
import home_icon from '../images/home_icon.png';

function InstrOne() {
    return (
        <div className="container">
            <div className="white-box-regular" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="title-text">Anleitung:</span>
                <Link to={"/activityOne"} style={{ textDecoration: 'none' }}>
                    <button className="button-default">Verstanden</button>
                </Link>
            </div>
        </div>
    );
}

export default InstrOne;