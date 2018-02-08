// NOTE: Related issue https://github.com/facebook/react/issues/5867

let idCounter = 0;

export const uniqueId = (prefix = '') => {
  idCounter += 1;
  return `${prefix}${idCounter}`;
};
