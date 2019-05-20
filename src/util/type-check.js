export const isFunction = val => typeof val === 'function';
export const isString = val => typeof val === 'string';
export const isArray = value =>
  value && typeof value === 'object' && value.constructor === Array;
