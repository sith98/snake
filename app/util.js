const makePoint = (x, y) => Object.freeze({
    x,
    y,
    equals: (other) => x === other.x && y === other.y
})

const drawPoint = ({ctx, gridSize, point, color}) => {
    ctx.fillStyle = color;
    ctx.fillRect(point.x * gridSize, point.y * gridSize, gridSize, gridSize);
}