const makePoint = (x, y) => Object.freeze({
    x,
    y,
    equals: (other) => x === other.x && y === other.y,
    draw: ({ctx, gridSize, color}) => {
        ctx.fillStyle = color;
        ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    },
    drawAsCircle: ({ctx, gridSize, color, radius}) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(
            (x + 0.5) * gridSize,
            (y + 0.5) * gridSize,
            radius,
            0, 2 * Math.PI
        );
        ctx.fill();
    }
})