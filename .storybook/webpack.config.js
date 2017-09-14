const path = require('path');
const bourbonPath = require('bourbon').includePaths;
const neatPath = require('bourbon-neat').includePaths;
const normalizePath = path.join(__dirname, '../node_modules/normalize.css');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../'),
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [normalizePath].concat(neatPath).concat(bourbonPath)
            }
          }
        ]
      }
    ]
  }
}
