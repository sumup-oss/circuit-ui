import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import ButtonGroup from './';
import Button from '../Button';

storiesOf('ButtonGroup', module)
  .addDecorator(withTests('ButtonGroup'))
  .add(
    'Default ButtonGroup',
    withInfo()(() => (
      <ButtonGroup>
        <Button secondary>Cancel</Button>
        <Button>Confirm</Button>
      </ButtonGroup>
    ))
  )
  .add(
    'Left Aligment',
    withInfo()(() => (
      <ButtonGroup align="left">
        <Button secondary>Cancel</Button>
        <Button>Confirm</Button>
      </ButtonGroup>
    ))
  );
