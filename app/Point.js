// a basic 2d point
// that gets used for apple and snake coordinates
const makePoint = (x, y) => Object.freeze({
    x,
    y,
    equals: (other) => x === other.x && y === other.y,
})