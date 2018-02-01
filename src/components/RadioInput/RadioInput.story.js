import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import State from '../State';
import RadioInput from './RadioInput';

storiesOf('RadioInput', module)
  .addDecorator(withTests('RadioInput'))
  .add(
    'Default RadioInput',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <RadioInput
            value="radio"
            name="radio"
            onToggle={e => {
              action('Radio clicked')(e);
              onToggle(e);
            }}
            checked={isChecked}
            selector="ri"
          >
            {isChecked ? 'Checked' : 'Unchecked'}
          </RadioInput>
        )}
      </State>
    ))
  )
  .add(
    'Invalid RadioInput',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <RadioInput
            value="radio"
            name="radio"
            onToggle={e => {
              action('Radio clicked')(e);
              onToggle(e);
            }}
            checked={isChecked}
            selector="ci"
            invalid
          >
            Error
          </RadioInput>
        )}
      </State>
    ))
  )
  .add(
    'Disabled RadioInput',
    withInfo()(() => <RadioInput disabled>Disabled</RadioInput>)
  );
