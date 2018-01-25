// Requires a polyfill.
export const values = obj => Object.values(obj);

export const keys = obj => Object.keys(obj);

export const toPairs = obj => Object.entries(obj);

// This only works with an array. Might implement iterator
// approach.
export const map = iteratee => arr => arr.map(iteratee);
