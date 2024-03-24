import { Component } from 'react';
import './App.css';
import Background from './components/background'
import { Box } from './components/activity1'

function App() {
  return (
    <div className="App">
      <Background className="background"></Background>
      <Box className="test"></Box>
    </div>
  );
}

export default App;
