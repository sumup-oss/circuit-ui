let idCounter = 0;

function id(prefix = '') {
  idCounter += 1;
  return `${prefix}${idCounter}`;
}

export default id;
