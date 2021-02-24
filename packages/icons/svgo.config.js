const { extendDefaultPlugins } = require('svgo');

module.exports = {
  plugins: extendDefaultPlugins([
    {
      name: 'convertColors',
      params: {
        currentColor: '#212933',
      },
    },
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'prefixIds',
      params: {
        prefixIds: true,
      },
    },
  ]),
};
