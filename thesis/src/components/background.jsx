import React, { useState } from 'react';
import './background.css';

function Background() {
  const [ellipses_white, setEllipses_white] = useState([
    { top: '12%', left: '10%', width: '25px', height: '25px', blur: '5px' },
    { top: '30%', left: '6%', width: '18px', height: '18px', blur: '4px' },
    { top: '70%', left: '4%', width: '20px', height: '20px', blur: '4px' },
    { top: '85%', left: '8%', width: '22px', height: '22px', blur: '5px' },
    { top: '10%', left: '97%', width: '15px', height: '15px', blur: '4px' },
    { top: '23%', left: '90%', width: '20px', height: '20px', blur: '4px' },
    { top: '50%', left: '95%', width: '22px', height: '22px', blur: '5px' },
    { top: '72%', left: '95%', width: '15px', height: '15px', blur: '4px' },
    { top: '90%', left: '90%', width: '25px', height: '25px', blur: '5px' },
  ]);

  const [ellipses_blue, setEllipses_blue] = useState([
    { top: '8%', left: '90%', width: '400px', height: '400px', blur: '100px' },
    { top: '30%', left: '2%', width: '350px', height: '350px', blur: '100px' },
    { top: '90%', left: '10%', width: '400px', height: '400px', blur: '100px' },
    { top: '95%', left: '25%', width: '350px', height: '350px', blur: '100px' },
    { top: '85%', left: '85%', width: '400px', height: '400px', blur: '100px' },
  ]);

  return (
    <div className="background">
      <div className="div">
        {ellipses_blue.map((ellipse, index) => (
            <div
                key={index}
                className="blue-ellipse"
                style={{
                '--ellipse-top': ellipse.top,
                '--ellipse-left': ellipse.left,
                '--ellipse-width': ellipse.width,
                '--ellipse-height': ellipse.height,
                '--ellipse-blur': ellipse.blur,
                '--ellipse-radius': ellipse.borderRadius
                }}
            ></div>
            ))}
        {ellipses_white.map((ellipse, index) => (
          <div
            key={index}
            className="white-ellipse"
            style={{
              '--ellipse-top': ellipse.top,
              '--ellipse-left': ellipse.left,
              '--ellipse-width': ellipse.width,
              '--ellipse-height': ellipse.height,
              '--ellipse-blur': ellipse.blur,
              '--ellipse-radius': ellipse.borderRadius
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Background;
