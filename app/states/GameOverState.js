const makeGameOverState = ({canvas, ctx, startState}, {score, background}) => {
    const size1 = canvas.width / 10
    const size2 = canvas.width / 15
    const size3 = canvas.width / 20

    const centerY = canvas.width / 2;

    const draw = () => {
        ctx.putImageData(background, 0, 0);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = size1 + "px Arial";
        ctx.fillText("Game over!", centerY, canvas.height * 0.4);
        
        ctx.font = size2 + "px Arial"
        ctx.fillText(`Your score was ${score}.`, centerY, canvas.height * 0.5)
        
        ctx.font = size3 + "px Arial"
        ctx.fillText("Press ESC to play again.", centerY, canvas.height * 0.6)
    }
    const update = () => {}

    const ESC = 27;
    const onKeyDown = (evt) => {
        if (evt.keyCode === ESC) {
            startState(makeGameState)
        }
    }

    return Object.freeze({
        update,
        draw,
        onKeyDown
    });
}