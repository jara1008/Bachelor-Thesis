import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Activity1 from '../activities/activity1';
import Activity2 from '../activities/activity2';
import Activity3 from '../activities/activity3';
import Activity5 from '../activities/activity5';
import Activity6 from '../activities/activity6';
import Activity7 from '../activities/activity7';
import Activity8 from '../activities/activity8';
import Activity9 from '../activities/activity9';
import Activity10 from '../activities/activity10';
import TutorialActivity1 from '../tutorials/tutorial_activity1';
import TutorialActivity2 from '../tutorials/tutorial_activity2';
import TutorialActivity3 from '../tutorials/tutorial_activity3';
import TutorialActivity5 from '../tutorials/tutorial_activity5';
import TutorialActivity6 from '../tutorials/tutorial_activity6';
import TutorialActivity7 from '../tutorials/tutorial_activity7';
import TutorialActivity8 from '../tutorials/tutorial_activity8';
import TutorialActivity9 from '../tutorials/tutorial_activity9';
import TutorialActivity10 from '../tutorials/tutorial_activity10';

// Basic localstorage function to store arrays
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      if (
        storedValue !== null &&
        JSON.parse(storedValue).map(Number).length < 20
      ) {
        return initialValue;
      }
      return storedValue !== null
        ? JSON.parse(storedValue).map(Number)
        : initialValue;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
};

const GameWrapper = () => {
    const { level, difficulty } = useParams();
    const navigate = useNavigate();
    const [tutorialProgress, setTutorialProgress] = useLocalStorage("tutorialProgress",Array(20).fill(0))
    function increaseProgress(){
        var number = parseInt(difficulty.substring(0,1));
        const isEasy = (difficulty.substring(1,5) === 'easy');
        if(number === 0){
            number = 10;
        }
        const newProgress = [...tutorialProgress];
        const arrPos = (isEasy ? number : number+10);
        newProgress[arrPos] = 1;
        setTutorialProgress(newProgress);
        navigate(`/activity${number}/${difficulty.slice(1)}`);
    }
    const getGameComponent = () => {
        switch (level) {
            case 'activity1':
                return <Activity1 difficulty={difficulty} />;
            case 'activity2':
                return <Activity2 difficulty={difficulty} />;
            case 'activity3':
                return <Activity3 difficulty={difficulty} />;
            case 'activity5':
                return <Activity5 difficulty={difficulty} />;
            case 'activity6':
                return <Activity6 difficulty={difficulty} />;
            case 'activity7':
                return <Activity7 difficulty={difficulty} />;
            case 'activity8':
                return <Activity8 difficulty={difficulty} />;
            case 'activity9':
                return <Activity9 difficulty={difficulty} />;
            case 'activity10':
                return <Activity10 difficulty={difficulty} />;
            case 'tutorial':
                switch (difficulty.substring(0,1)){
                    case '1': return <TutorialActivity1 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '2': return <TutorialActivity2 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '3': return <TutorialActivity3 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '5': return <TutorialActivity5 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '6': return <TutorialActivity6 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '7': return <TutorialActivity7 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '8': return <TutorialActivity8 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '9': return <TutorialActivity9 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    case '0': return <TutorialActivity10 difficulty={difficulty.slice(1)} onComplete={increaseProgress}/>;
                    default:
                        return <div>Invalid Activity</div>;
                }
            default:
                return <div>Invalid Activity</div>;
        }
    };

    return getGameComponent();
};

export default GameWrapper;