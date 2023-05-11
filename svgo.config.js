module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertColors: {
            currentColor: '#212933',
          },
          removeViewBox: false,
        },
      },
    },
    'prefixIds',
  ],
};
