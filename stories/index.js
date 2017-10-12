import React from 'react';

import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import withStyles from '../util/withStyles';
import StyleProvider from '../util/StyleProvider';
import styles from '../src/index.scss';

const insertCss = (...styles) => styles.forEach(s => s._insertCss());
const App = withStyles(styles)(({ children }) => <div>{children}</div>);

const styleDecorator = storyFn => (
  <StyleProvider insertCss={insertCss}>
    <App>{storyFn()}</App>
  </StyleProvider>
);

addDecorator(styleDecorator);
addDecorator(withSmartKnobs);
addDecorator(withKnobs);
