const randomInt = (min, max, inclusive = true) => Math.floor(Math.random() * (max - min + 1 + (inclusive ? 1 : 0))) + min;
const fillRandom = (min, max, size = max - min + 1) => Array(size).fill(min).map(_ => randomInt(min, max - min));

export {
    randomInt,
    fillRandom
}