import React from 'react';
import { useParams } from 'react-router-dom';
import ActivityOne from '../activities/activityOne';
import ActivityTwo from '../activities/activityTwo';
import ActivityThree from '../activities/activityThree';
import ActivityFive from '../activities/activityFive';
import ActivitySix from '../activities/activitySix';
import ActivitySeven from '../activities/activitySeven';
import ActivityEight from '../activities/activityEight';
import ActivityNine from '../activities/activityNine';

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
            case 'activityNine':
                return <ActivityNine difficulty={difficulty} />;
            default:
                return <div>Invalid Activity</div>;
        }
    };

    return getGameComponent();
};

export default GameWrapper;