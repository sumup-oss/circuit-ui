/**
 * TODO:
 * - Replace lodash functions with own implementations.
 * - Add polyfills.
 */

import { flow, curry } from 'lodash/fp';

export { compose } from 'lodash/fp';

export { flow, curry };

// Requires polyfill
export const values = obj => Object.values(obj);

export const keys = obj => Object.keys(obj);

export const toPairs = obj => Object.entries(obj);

// This only works with an array. Might implement iterator
// approach.
export const map = curry((iteratee, arr) => arr.map(iteratee));

export const mapValues = curry((iteratee, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [key]: iteratee(obj[key]) }),
    {}
  )
);

export const mapKeys = curry((iteratee, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    const newKey = iteratee[key];
    return { ...acc, [newKey]: obj[key] };
  })
);

export const find = curry((predicate, arr) => arr.find(predicate));

export const reduce = curry((iteratee, acc, arr) => arr.reduce(iteratee, acc));

export const filter = curry((predicate, arr) => arr.filter(predicate));

// Requires polyfill
export const includes = curry((val, arr) => arr.includes(val));

export const defaultTo = curry((defaultVal, val) => val || defaultVal);

export const concat = curry((first, second) => first.concat(second));

export const slice = curry((start, end, arr) => arr.slice(start, end));

export const identity = val => val;

export const some = curry((predicate, arr) => arr.some(predicate));

// This wil automatically disregard falsy values.
export const pick = curry((picks, obj) =>
  reduce(
    (picked, prop) => (obj[prop] ? { ...picked, [prop]: obj[prop] } : picked),
    {},
    picks
  )
);

export const pickBy = curry((iteratee, obj) =>
  flow(
    keys,
    reduce(
      (picked, key) =>
        iteratee(obj[key]) ? { ...picked, [key]: obj[key] } : picked,
      {}
    )
  )(obj)
);

export const toBool = val => !!val;
