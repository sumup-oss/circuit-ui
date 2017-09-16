import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, LoadingButton } from '../src/index';

storiesOf('Buttons', module)
  .add('Button', () => (
    <Button className="btn btn--highlight" onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('LoadingButton', () => (
    <LoadingButton
      className="btn btn--highlight"
      onClick={action('clicked')}>
      Loading!
    </LoadingButton>
  ));

