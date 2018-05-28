const makePoint = (x, y) => ({x, y})

const drawPoint = ({ctx, gridSize, point, color}) => {
    ctx.fillStyle = color;
    ctx.fillRect(point.x * gridSize, point.y * gridSize, gridSize, gridSize);
}