import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input } from '..';

storiesOf('Forms', module).add('Input', () => (
  <Input name="my-input" onChange={action('onChange')} />
));
