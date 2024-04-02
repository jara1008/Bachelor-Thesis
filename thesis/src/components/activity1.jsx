import React from "react";
import "./activity1.css";
import cloud from "../images/cloud.png";

export const Box = () => {
    return (
        <div className="container">
            <div className="white-box" >
                <img src={cloud} alt="Cloud" style={{position: "absolute", top: "40%", left: "0%", height: "58%", width: "48%"}} />
                <img src={cloud} alt="Cloud" style={{position: "absolute", top: "40%", right: "1%", height: "58%", width: "48%"}} />
            </div>
            {/*<img src={star} className="svg-overlay" alt="Star SVG" />*/}
        </div>
    );
};
