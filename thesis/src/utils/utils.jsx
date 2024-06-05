
export const incrementHighestUnlockedLevel = (currentLevelNr) => {
    let currentLevel = parseInt(localStorage.getItem('highestUnlockedLevel')) || 1;
    console.log("current Level: " ,currentLevel)
    if (currentLevelNr >= currentLevel) {
        currentLevel += 1;
        localStorage.setItem('highestUnlockedLevel', currentLevel);
    }
};
