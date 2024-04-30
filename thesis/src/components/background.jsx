import React, { useState } from 'react';
import './background.css';
import sparkle from '../images/sparkle.svg';

function Background() {
  const [ellipses_white] = useState([
    { top: '12%', left: '17%', width: '25px', height: '25px', blur: '5px' },
    { top: '30%', left: '10%', width: '18px', height: '18px', blur: '4px' },
    { top: '60%', left: '12%', width: '18px', height: '18px', blur: '4px' },
    { top: '78%', left: '18%', width: '22px', height: '22px', blur: '5px' },
    { top: '10%', left: '97%', width: '15px', height: '15px', blur: '4px' },
    { top: '20%', left: '88%', width: '20px', height: '20px', blur: '4px' },
    { top: '50%', left: '95%', width: '22px', height: '22px', blur: '5px' },
    { top: '75%', left: '85%', width: '15px', height: '15px', blur: '4px' },
    { top: '90%', left: '93%', width: '25px', height: '25px', blur: '5px' },
  ]);

  const [ellipses_blue] = useState([
    { top: '8%', left: '90%', width: '400px', height: '400px', blur: '100px' },
    { top: '30%', left: '2%', width: '350px', height: '350px', blur: '100px' },
    { top: '90%', left: '10%', width: '400px', height: '400px', blur: '100px' },
    { top: '95%', left: '25%', width: '350px', height: '350px', blur: '100px' },
    { top: '85%', left: '85%', width: '400px', height: '400px', blur: '100px' },
  ]);

  const [sparkles] = useState([
    { top: '18%', left: '5%', size: '8%', opacity: '0.9' },
    { top: '40%', left: '85%', size: '10%', opacity: '0.9' },
    { top: '52%', left: '17%', size: '10%', opacity: '0.9' },
    { top: '70%', left: '94%', size: '8%', opacity: '0.9' },
    { top: '90%', left: '8%', size: '6%', opacity: '0.9' },
    { top: '95%', left: '23%', size: '5%', opacity: '0.9' },
    { top: '5%', left: '76%', size: '5%', opacity: '0.9' },
  ]);

  return (
    <div className="background">
      <div>
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
        {sparkles.map((sparkleItem, index) => (
          <img
            key={index}
            src={sparkle}
            alt="Sparkle"
            style={{
              position: 'absolute',
              top: sparkleItem.top,
              left: sparkleItem.left,
              width: sparkleItem.size,
              height: sparkleItem.size,
              opacity: sparkleItem.opacity,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Background;
