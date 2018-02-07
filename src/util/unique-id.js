// NOTE: Related issue https://github.com/facebook/react/issues/5867

let idCounter = 0;

export const id = (prefix = '') => {
  idCounter += 1;
  return `${prefix}${idCounter}`;
};
