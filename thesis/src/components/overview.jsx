import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./overview.css";

function Overview() {
    const [boxes, setBoxes] = useState([
        { id: 1, top: '14%', left: '37%', path: "/activityOne" },
        { id: 2, top: '14%', left: '52%' },
        { id: 3, top: '14%', left: '67%' },
        { id: 4, top: '41%', left: '37%' },
        { id: 5, top: '41%', left: '52%' },
        { id: 6, top: '41%', left: '67%' },
        { id: 7, top: '68%', left: '37%' },
        { id: 8, top: '68%', left: '52%' },
        { id: 9, top: '68%', left: '67%' }
    ])

    return (
        <div className="overview">
            {boxes.map((box) => (
                <Link to={box.path} key={box.id} style={{ position: 'absolute', top: box.top, left: box.left }}>
                    <div className="rectangle" />
                </Link>
            ))}
        </div>
    );
}

export default Overview;