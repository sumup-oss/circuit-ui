import { resolve as pathResolve } from 'path';

// Plugins
import reactSvg from 'rollup-plugin-react-svg';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// Shared config
const shared = {
  external: [
    'emotion',
    'emotion-theming',
    'lodash',
    'polished',
    'react',
    'react-dom',
    'react-emotion',
    'react-modal'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    reactSvg({
      jsx: false
    }),
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
    })
  ]
};

// Entry files
export default [
  {
    input: 'src/index.js',
    output: { file: 'dist/index.esm.js', format: 'es' },
    ...shared
  },
  {
    input: 'src/index.js',
    output: { file: 'dist/index.cjs.js', format: 'cjs' },
    ...shared
  },
  {
    input: 'src/util/index.js',
    output: { file: 'dist/utils.esm.js', format: 'es' },
    ...shared
  },
  {
    input: 'src/util/index.js',
    output: { file: 'dist/utils.cjs.js', format: 'cjs' },
    ...shared
  },
  {
    input: 'src/styles/index.js',
    output: { file: 'dist/styles.esm.js', format: 'es' },
    ...shared
  },
  {
    input: 'src/styles/index.js',
    output: { file: 'dist/styles.cjs.js', format: 'cjs' },
    ...shared
  },
  {
    input: 'src/themes/index.js',
    output: { file: 'dist/themes.esm.js', format: 'es' },
    ...shared
  },
  {
    input: 'src/themes/index.js',
    output: { file: 'dist/themes.cjs.js', format: 'cjs' },
    ...shared
  }
];
