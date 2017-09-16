import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from '../src/index';
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

storiesOf('Button', module)
  .add('with text', () => (
    <Button className="btn btn--highlight" onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emojies', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
