const makeApple = (x, y) => {
    const point = makePoint(x, y);
    
    return Object.freeze({
        equals: point.equals,
        draw: ({ctx, gridSize}) => {
            const radius = gridSize * (0.4 + Math.sin(Date.now() / 150) * 0.1)
            point.drawAsCircle({ctx, gridSize, radius, color: "red"})
        }
    })
}
