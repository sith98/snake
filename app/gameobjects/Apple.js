const AppleType = Object.freeze({
    NORMAL: 0,
    LONGER: 1,
    REVERSE: 2,
    FASTER: 3,
    SLOWER: 4,
})

const makeApple = (x, y, type = AppleType.NORMAL) => {
    const point = makePoint(x, y);

    const drawNormal = ({ctx, gridSize}) => {
        const radius = gridSize * (0.4 + Math.sin(Date.now() / 150) * 0.1)
        point.drawAsCircle({ctx, gridSize, radius, color: "red"})
    }
    
    const drawSpecial = ({ctx, gridSize}) => {
        const size = Math.sqrt(2 * (gridSize * 0.5) * (gridSize * 0.5))
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.translate((x + 0.5) * gridSize, (y + 0.5) * gridSize);
        ctx.rotate((Date.now() * 0.002) % (2 * Math.PI));
        ctx.fillRect(-size * 0.5, -size * 0.5, size, size);
        ctx.restore();
    }

    return Object.freeze({
        pointEquals: point.equals,
        draw: (props) => {
            if (type === AppleType.NORMAL) {
                drawNormal(props);
            } else {
                drawSpecial(props);
            }
        },
        get type() { return type; }
    })
}
