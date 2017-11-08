import React from 'react';
import { storiesOf } from '@storybook/react';
import { SumUpLogo } from '..';

storiesOf('Logo', module)
  .add('White Logo', () => (
    <SumUpLogo fill="white" />
  ))
  .add('Dark Logo', () => (
    <SumUpLogo fill="dark" />
  ));
