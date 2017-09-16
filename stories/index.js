import React from 'react';

import { addDecorator } from '@storybook/react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import StyleProvider from '../src/StyleProvider';
import styles from '../src/index.scss';

const insertCss = (...styles) => styles.forEach(s => s._insertCss());
const App = withStyles(styles)(
  ({ children }) => (<div>{children}</div>)
);

const styleDecorator = (storyFn) => (
  <StyleProvider insertCss={insertCss}>
    <App>{storyFn()}</App>
  </StyleProvider>
);

addDecorator(styleDecorator);
