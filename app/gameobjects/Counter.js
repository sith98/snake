const makeCounter = () => {
    let value = 0;

    const inc = () => value += 9;
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
        get value() { return value }
    };
}