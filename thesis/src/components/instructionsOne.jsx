import React from 'react';
import { Link } from 'react-router-dom';
import '../defaults.css';
import { HomeLink, checkButtonTop } from '../defaults';

function InstrOne() {
    return (
        <div className="container">
            <div className="white-box-regular" >
                <HomeLink />
                <span className="title-text">Anleitung:</span>
                <Link to={"/activityOne"} style={{ textDecoration: 'none' }}>
                    <button className="button-default" style={{ top: `${checkButtonTop}%`, left: '50%' }}>Verstanden</button>
                </Link>
            </div>
        </div>
    );
}

export default InstrOne;