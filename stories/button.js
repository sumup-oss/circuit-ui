import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, LoadingButton } from '..';

storiesOf('Buttons', module)
  .add('Button', () => (
    <Button className="btn btn--highlight" onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('LoadingButton', () => (
    <LoadingButton className="btn btn--highlight" onClick={action('clicked')}>
      I am Loading!
    </LoadingButton>
  ));
