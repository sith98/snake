const makeGameOverState = ({canvas, ctx, startState}, {score}) => {
    
    const draw = () => {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game over!", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial"
        ctx.fillText(`Your score was ${score}.`, canvas.width / 2, canvas.height / 2 + 50)
    }
    const update = () => {}
    const onKeyDown = () => {}

    return Object.freeze({
        update,
        draw,
        onKeyDown
    });
}