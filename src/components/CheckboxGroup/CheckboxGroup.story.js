import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { filter, includes } from 'lodash';

import withTests from '../../util/withTests';
import State from '../State';

import CheckboxGroup from './CheckboxGroup';

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

storiesOf('CheckboxGroup', module)
  .addDecorator(withTests('CheckboxGroup'))
  .add(
    'CheckboxGroup',
    withInfo()(() => (
      <State
        initial={[]}
        name="value"
        updaterName="onChange"
        updater={(prev, event) => {
          const { value } = event.target;
          return includes(prev, value)
            ? filter(prev, i => i !== value)
            : prev.concat(value);
        }}
      >
        {({ value, onChange }) => (
          <CheckboxGroup
            {...{ options, value }}
            name="checkbox-group"
            onChange={e => {
              e.persist();
              action(`${e.target.value} checkbox clicked`)(e);
              onChange(e);
            }}
          />
        )}
      </State>
    ))
  );
