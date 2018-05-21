import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import State from '../State';
import RadioButton from './RadioButton';

storiesOf(`${GROUPS.FORMS}|RadioButton`, module)
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
    withInfo()(() => (
      <RadioButton value="radio" name="radio" disabled>
        Disabled
      </RadioButton>
    ))
  );
