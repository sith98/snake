const makeCounter = ({saveGame}) => {
    let value = 0;
    let isNewHighscore = false;

    // if this is the first game ever
    // it is a new highscore by default
    if (saveGame.highscore === undefined) {
        saveGame.highscore = 0;
        isNewHighscore = true;
    }
    
    // increments the counter and checks if the current score is a new highscore
    const inc = (incValue) => {
        value += incValue;
        if (value > saveGame.highscore) {
            saveGame.highscore = value;
            isNewHighscore = true;
        }
    };

    // depending whether it is a normal or a special apple
    // increment the score by 9 or 27 (three times as much)
    const onAppleEaten = (apple) => {
        if (apple.type === AppleType.NORMAL) {
            inc(9);
        } else {
            inc(27);
        }
    }

    // Renders current score at the top of the screen
    const draw = ({ctx, canvasSize, gridSize}) => {
        ctx.fillStyle = "white";
        ctx.font = `${gridSize * 2}px Arial`;
        ctx.textAlign = "center";
        ctx.baseLine = "bottom";
        ctx.fillText(value, canvasSize / 2, gridSize * 3);
    };

    return Object.freeze({
        onAppleEaten,
        draw,
        get value() { return value; },
        get isNewHighscore() { return isNewHighscore; }
    });
}