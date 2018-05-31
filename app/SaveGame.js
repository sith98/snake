// handles localStorage interaction
const makeSaveGame = () => {
    const lsKey = "highscore";

    const lsValue = localStorage.getItem(lsKey);
    let highscore = (lsValue === null) ? undefined : parseInt(lsValue);

    return Object.freeze({
        get highscore() { return highscore; },
        set highscore(newHighscore) {
            highscore = newHighscore;
            localStorage.setItem(lsKey, highscore);
        }
    });
};