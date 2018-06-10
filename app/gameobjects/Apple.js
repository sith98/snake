// an enum that represents the apple type
// normal the default version
// the rest are the four different power ups
const AppleType = Object.freeze({
    NORMAL: 0,
    LONGER: 1,
    REVERSE: 2,
    FASTER: 3,
    SLOWER: 4,
})

// Creates an apple that can be either a normal one
// or a special apple depending on type
const makeApple = (x, y, type = AppleType.NORMAL) => {
    const point = makePoint(x, y);

    const drawNormal = ({ctx, gridSize, imageLoader}) => {
        const factor = interpolate(Math.sin(Date.now() / 150), -1, 1, 0.8, 1.2);

        ctx.drawImage(
            imageLoader.getImage("apple"),
            (x + 0.5 - factor / 2) * gridSize,
            (y + 0.5 - factor / 2) * gridSize,
            gridSize * factor,
            gridSize * factor
        );
    }
    
    const drawSpecial = ({ctx, gridSize, imageLoader}) => {
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.translate((x + 0.5) * gridSize, (y + 0.5) * gridSize);
        ctx.rotate((Date.now() * 0.002) % (2 * Math.PI));
        ctx.drawImage(
            imageLoader.getImage("star"),
            -gridSize / 2, -gridSize / 2, gridSize, gridSize
        )
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
