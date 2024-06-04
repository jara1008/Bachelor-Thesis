
export const incrementHighestUnlockedLevel = (currentLevelNr) => {
    let currentLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;
    if (currentLevelNr > currentLevel) {
        currentLevel += 1;
        localStorage.setItem('highestUnlockedLevel', currentLevel);
    }
};
