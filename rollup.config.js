import { resolve as pathResolve } from 'path';

// Plugins
import reactSvg from 'rollup-plugin-react-svg';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';

// Shared config
const shared = {
  external: id => {
    if (/shared-prop-types/.test(id)) {
      return false;
    }
    return /lodash|webpack-merge|emotion|polished|react-dom|react-emotion|react-modal|react|prop-types/.test(
      id
    );
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    reactSvg({
      jsx: false
    }),
    // Replace delimited values
    replace({
      delimiters: ['__', '__'],
      values: {
        DEV: process.env.NODE_ENV === 'develop',
        STORYBOOK: false,
        PRODUCTION: process.env.NODE_ENV === 'production'
      }
    }),
    resolve({
      module: true,
      main: true,
      browser: true,
      preferBuiltins: false,
      // eslint-disable-next-line
      jail: pathResolve('.'),
      modulesOnly: true
    }),
    minify()
  ]
};

// Entry files
export default [
  {
    input: 'src/index.js',
    output: { file: 'dist/index.js', format: 'es' },
    ...shared,
    plugins: [
      ...shared.plugins,
      copy({
        'package.json': 'dist/package.json',
        LICENSE: 'dist/LICENSE',
        'README.md': 'dist/README.md',
        verbose: true
      })
    ]
  },
  {
    input: 'src/util/index.js',
    output: { file: 'dist/utils.js', format: 'es' },
    ...shared
  },
  {
    input: 'src/styles/index.js',
    output: { file: 'dist/styles.js', format: 'es' },
    ...shared
  },
  {
    input: 'src/themes/index.js',
    output: { file: 'dist/themes.js', format: 'es' },
    ...shared
  }
];
