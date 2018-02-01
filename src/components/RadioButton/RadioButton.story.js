import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import State from '../State';
import RadioButton from './RadioButton';

storiesOf('RadioButton', module)
  .addDecorator(withTests('RadioButton'))
  .add(
    'Default RadioButton',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <RadioButton
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
          </RadioButton>
        )}
      </State>
    ))
  )
  .add(
    'Invalid RadioButton',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <RadioButton
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
          </RadioButton>
        )}
      </State>
    ))
  )
  .add(
    'Disabled RadioButton',
    withInfo()(() => <RadioButton disabled>Disabled</RadioButton>)
  );
