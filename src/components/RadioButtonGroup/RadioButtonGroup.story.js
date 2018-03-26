import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import State from '../State';

import RadioButtonGroup from './RadioButtonGroup';

const options = [
  {
    label: 'Option 1',
    value: 'First'
  },
  {
    label: 'Option 2',
    value: 'Second'
  },
  {
    label: 'Option 3',
    value: 'Third'
  }
];

storiesOf('RadioButtonGroup', module)
  .addDecorator(withTests('RadioButtonGroup'))
  .add(
    'RadioButtonGroup',
    withInfo()(() => (
      <State
        initial=""
        name="value"
        updaterName="onChange"
        updater={(prev, event) => event.target.value}
      >
        {({ value, onChange }) => (
          <RadioButtonGroup
            {...{ options, value }}
            name="radio-button-group"
            onChange={e => {
              e.persist();
              action(`${e.target.value} radio button clicked`)(e);
              onChange(e);
            }}
          />
        )}
      </State>
    ))
  );
