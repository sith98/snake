const makeApple = (maxX, maxY) => {
    const point = makePoint(
        Math.floor(Math.random() * maxX),
        Math.floor(Math.random() * maxY)
    );
    
    return {
        equals: (other) => point.equals(other),
        draw: ({ctx, gridSize}) => {
            const radius = gridSize * (0.4 + Math.sin(Date.now() / 150) * 0.1)
            point.drawAsCircle({ctx, gridSize, radius, color: "red"})
        }
    }
}
