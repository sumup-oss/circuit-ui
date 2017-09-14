import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../src/index';
import StyleProvider from '../src/StyleProvider';

const insertCss = (...styles) => styles.forEach(s => s._insertCss());
const styleDecorator = (storyFn) => (
  <StyleProvider insertCss={insertCss}>
    {storyFn()}
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
