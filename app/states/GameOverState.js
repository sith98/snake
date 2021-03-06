const makeGameOverState = ({canvasSize, ctx, startState, saveGame, soundPlayer}, {score, background, isNewHighscore}) => {
    // the four font sizes
    const size1 = canvasSize / 10
    const size2 = canvasSize / 15
    const size3 = canvasSize / 13
    const size4 = canvasSize / 20

    const centerY = canvasSize / 2;

    if (isNewHighscore) {
        soundPlayer.play("highscore", {delay: 0.1});
    }
    soundPlayer.stop("apple")

    const draw = () => {
        // "Screenshot" of the last frame of the game
        // with a black transparent overlay
        ctx.putImageData(background, 0, 0);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.font = size1 + "px Arial";
        ctx.fillText("Game over!", centerY, canvasSize * 0.35);
        
        ctx.font = size2 + "px Arial"
        ctx.fillText(`Your score was ${score}.`, centerY, canvasSize * 0.45)

        // Animation if this has been a new highscore
        if (isNewHighscore) {
            const fontSize = size3 * interpolate(Math.sin(Date.now() * 0.004), -1, 1, 0.8, 1.2);
            ctx.font = fontSize + "px Arial";
            ctx.fillText("New Highscore!", centerY, canvasSize * 0.55)
        } else {
            ctx.font = size3 + "px Arial";
            ctx.fillText(`Highscore: ${saveGame.highscore}`, centerY, canvasSize * 0.55);
        }

        ctx.font = size4 + "px Arial"
        ctx.fillText("Press ESC to play again.", centerY, canvasSize * 0.65)
    }

    // Starts a new game when the player hits the Escape key
    const ESC = 27;
    const onKeyDown = (evt) => {
        if (evt.keyCode === ESC) {
            startState(makeGameState)
        }
    }

    return Object.freeze({
        draw,
        onKeyDown
    });
}