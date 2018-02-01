import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import State from '../State';
import CheckboxInput from './CheckboxInput';

storiesOf('CheckboxInput', module)
  .addDecorator(withTests('CheckboxInput'))
  .add(
    'Default CheckboxInput',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <CheckboxInput
            value="checkbox"
            name="checkbox"
            onToggle={e => {
              action('Checkbox clicked')(e);
              onToggle(e);
            }}
            checked={isChecked}
            selector="ci"
          >
            {isChecked ? 'Checked' : 'Unchecked'}
          </CheckboxInput>
        )}
      </State>
    ))
  )
  .add(
    'Invalid CheckboxInput',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <CheckboxInput
            value="checkbox"
            name="checkbox"
            onToggle={e => {
              action('Checkbox clicked')(e);
              onToggle(e);
            }}
            checked={isChecked}
            selector="ci"
            invalid
          >
            Error
          </CheckboxInput>
        )}
      </State>
    ))
  )
  .add(
    'Disabled CheckboxInput',
    withInfo()(() => <CheckboxInput disabled>Disabled</CheckboxInput>)
  );
