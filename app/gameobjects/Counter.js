const makeCounter = () => {
    let counter = 0;

    const inc = () => counter += 1;
    const draw = ({ctx, canvas, gridSize}) => {
        ctx.fillStyle = "white";
        ctx.font = `${gridSize * 2}px Arial`;
        ctx.textAlign = "center";
        ctx.baseLine = "bottom";
        ctx.fillText(counter, canvas.width / 2, gridSize * 3);
    };

    return {
        inc,
        draw
    };
}