import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import withTests from '../util/withTests';
import { Button, LoadingButton } from '..';

storiesOf('Buttons', module)
  .addDecorator(withTests('Button/spec.js', 'LoadingButton/spec.js'))
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
