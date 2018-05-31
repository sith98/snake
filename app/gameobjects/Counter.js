const makeCounter = ({saveGame}) => {
    let value = 0;
    let isNewHighscore = false;

    if (saveGame.highscore === undefined) {
        saveGame.highscore = 0;
        isNewHighscore = true;
    }

    const inc = (incValue) => {
        value += incValue;
        if (saveGame.highscore === undefined || value > saveGame.highscore) {
            saveGame.highscore = value;
            isNewHighscore = true;
        }
    };

    const onAppleEaten = (apple) => {
        if (apple.type === AppleType.NORMAL) {
            inc(9);
        } else {
            inc(27);
        }
    }

    const draw = ({ctx, canvasSize, gridSize}) => {
        ctx.fillStyle = "white";
        ctx.font = `${gridSize * 2}px Arial`;
        ctx.textAlign = "center";
        ctx.baseLine = "bottom";
        ctx.fillText(value, canvasSize / 2, gridSize * 3);
    };

    return {
        onAppleEaten,
        draw,
        get value() { return value; },
        get isNewHighscore() { return isNewHighscore; }
    };
}