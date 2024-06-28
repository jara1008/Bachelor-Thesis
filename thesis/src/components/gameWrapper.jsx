import React from 'react';
import { useParams } from 'react-router-dom';
import ActivityOne from './activityOne';
import ActivityTwo from './activityTwo';
import ActivityThree from './activityThree';
import ActivityFive from './activityFive';
import ActivitySix from './activitySix';
import ActivitySeven from './activitySeven';
import ActivityEight from './activityEight';

const GameWrapper = () => {
    const { level, difficulty } = useParams();

    const getGameComponent = () => {
        switch (level) {
            case 'activityOne':
                return <ActivityOne difficulty={difficulty} />;
            case 'activityTwo':
                return <ActivityTwo difficulty={difficulty} />;
            case 'activityThree':
                return <ActivityThree difficulty={difficulty} />;
            case 'activityFive':
                return <ActivityFive difficulty={difficulty} />;
            case 'activitySix':
                return <ActivitySix difficulty={difficulty} />;
            case 'activitySeven':
                return <ActivitySeven difficulty={difficulty} />;
            case 'activityEight':
                return <ActivityEight difficulty={difficulty} />;
            default:
                return <div>Invalid Activity</div>;
        }
    };

    return getGameComponent();
};

export default GameWrapper;