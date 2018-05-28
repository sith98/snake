const makeApple = (maxX, maxY) => {
    const point = makePoint(
        Math.floor(Math.random() * maxX),
        Math.floor(Math.random() * maxY)
    );
    
    return {
        equals: ({x, y}) => x === point.x && y === point.y,
        draw: (ctx, gridSize) => {
            drawPoint({ctx, gridSize, point, color: "red"})
        }
    }
}
