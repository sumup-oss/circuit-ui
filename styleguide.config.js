const path = require('path');

module.exports = {
  components: 'src/*.js',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: { plugins: ['lodash'] }
          },
          exclude: [path.join(__dirname, 'node_modules')],
          include: [path.join(__dirname, 'src')]
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'isomorphic-style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader' }
          ]
        }
      ]
    }
  }
};
