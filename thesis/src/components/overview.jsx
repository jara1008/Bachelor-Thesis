import React, { useState } from "react";
import "./overview.css";

function Overview() {
    const [boxes, setBoxes] = useState([
        { top: '14%', left: '37%' },
        { top: '14%', left: '52%' },
        { top: '14%', left: '67%' },
        { top: '41%', left: '37%' },
        { top: '41%', left: '52%' },
        { top: '41%', left: '67%' },
        { top: '68%', left: '37%' },
        { top: '68%', left: '52%' },
        { top: '68%', left: '67%' }
    ])

    return (
        <div className="overview">
            {boxes.map((box) => (
                <div className="rectangle" style={{ top: box.top, left: box.left, position: 'absolute' }} />
            ))}
        </div>
    );
}

export default Overview;