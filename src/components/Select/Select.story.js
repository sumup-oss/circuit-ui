import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Select from './';

const options = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  }
];

storiesOf(`${GROUPS.FORMS}|Select`, module)
  .addDecorator(withTests('Select'))
  .add(
    'Default Select',
    withInfo()(() => (
      <Select options={options} onChange={action('Option selected')} />
    ))
  )
  .add(
    'Disabled Select',
    withInfo()(() => (
      <Select
        options={options}
        value={2}
        onChange={action('Option selected')}
        disabled
      />
    ))
  )
  .add(
    'Invalid Select',
    withInfo()(() => (
      <Select
        options={options}
        value={2}
        onChange={action('Option selected')}
        invalid
      />
    ))
  );
