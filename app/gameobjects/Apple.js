const makeApple = (maxX, maxY) => {
    const point = makePoint(
        Math.floor(Math.random() * maxX),
        Math.floor(Math.random() * maxY)
    );
    
    return {
        equals: (other) => point.equals(other),
        draw: (ctx, gridSize) => {
            drawPoint({ctx, gridSize, point, color: "red"})
        }
    }
}
