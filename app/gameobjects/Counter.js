const makeCounter = ({saveGame}) => {
    let value = 0;
    let newHighscore = false;

    if (saveGame.highscore === undefined) {
        saveGame.highscore = 0;
        newHighscore = true;
    }

    const inc = () => {
        value += 9;
        if (saveGame.highscore === undefined || value > saveGame.highscore) {
            saveGame.highscore = value;
            newHighscore = true;
        }
    }
    const draw = ({ctx, canvas, gridSize}) => {
        ctx.fillStyle = "white";
        ctx.font = `${gridSize * 2}px Arial`;
        ctx.textAlign = "center";
        ctx.baseLine = "bottom";
        ctx.fillText(value, canvas.width / 2, gridSize * 3);
    };

    return {
        inc,
        draw,
        get value() { return value; },
        get newHighscore() { return newHighscore; }
    };
}