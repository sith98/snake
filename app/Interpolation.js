// maps some value in a certain range (fromStart to fromEnd)
// to a different range (toStart to toEnd)
// Gets used for calculating Snake colors
// and Main Menu animations
const interpolate = (value, fromStart, fromEnd, toStart, toEnd) =>
    (value - fromStart) / (fromEnd - fromStart) * (toEnd - toStart) + toStart

const boundInterpolate = (value, fromStart, fromEnd, toStart, toEnd) =>
    Math.min(Math.max(interpolate(value, fromStart, fromEnd, toStart, toEnd), toStart), toEnd)