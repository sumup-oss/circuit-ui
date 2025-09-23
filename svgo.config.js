export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertColors: {
            currentColor: '#0F131A',
          },
        },
      },
    },
    'prefixIds',
  ],
};
