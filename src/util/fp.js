/**
 * TODO:
 * - Replace lodash functions with own implementations.
 * - Add polyfills.
 */

import { flow, curry, compose, includes } from 'lodash/fp';

export { flow, curry, compose, includes };

export { toPairs, values, isArray } from 'lodash/fp';

export const keys = obj => Object.keys(obj);

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

// This is only useful for debugging a pipe set up
// with flow.
export const trace = val => {
  console.log(trace); // eslint-disable-line
  return val;
};
