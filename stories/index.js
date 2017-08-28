import React from 'react';
import Button from '../src/Button';
import { storiesOf } from '@storybook/react';

storiesOf('Button', module)
  .add('with text', () => {
    return <Button label="Hi button"/>
  });
