import React, { useState } from 'react';
import Background from './components/background';
import { Box } from './components/activity1';
import Overview from './components/overview';
import './App.css';

const App = () => {
  return (
    <div>
      <Background />
      <div className="content">
        <Overview />
      </div>
    </div>
  );
};

export default App;
