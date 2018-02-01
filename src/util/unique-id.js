// NOTE: Related issue https://github.com/facebook/react/issues/5867

let idCounter = 0;

function id(prefix = '') {
  idCounter += 1;
  return `${prefix}${idCounter}`;
}

export default id;
