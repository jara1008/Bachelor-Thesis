import React from 'react';
import { Link } from 'react-router-dom';
import './instructionsOne.css';
import home_icon from '../images/home_icon.png';

function InstrOne() {
    return (
        <div className="container-I1">
            <div className="white-box-I1" >
                <Link to={"/"}>
                    <img src={home_icon} alt="home_icon" style={{ position: "absolute", top: "-8%", left: "95%" }} />
                </Link>
                <span className="text-wrapper-I1">Anleitung:</span>
                <Link to={"/activityOne"} style={{ textDecoration: 'none' }}>
                    <button className="button_instr-I1">Verstanden</button>
                </Link>
            </div>
        </div>
    );
}

export default InstrOne;