import React from 'react';
import { useParams } from 'react-router-dom';
import Activity1 from '../activities/activity1';
import Activity2 from '../activities/activity2';
import Activity3 from '../activities/activity3';
import Activity5 from '../activities/activity5';
import Activity6 from '../activities/activity6';
import Activity7 from '../activities/activity7';
import Activity8 from '../activities/activity8';
import Activity9 from '../activities/activity9';
import Activity10 from '../activities/activity10';

const GameWrapper = () => {
    const { level, difficulty } = useParams();

    const getGameComponent = () => {
        console.log(level)
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
            default:
                return <div>Invalid Activity</div>;
        }
    };

    return getGameComponent();
};

export default GameWrapper;