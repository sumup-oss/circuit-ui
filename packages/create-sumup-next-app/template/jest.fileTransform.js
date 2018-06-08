const { basename } = require('path');

module.exports = {
  process(src, filename) {
    const name = basename(filename);
    return `
      const React = require('react');
      module.exports = () => React.createElement('div', null, '${name}');
    `;
  }
};
