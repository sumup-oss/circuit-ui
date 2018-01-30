import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

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
            label={isChecked ? 'Checked' : 'Unchecked'}
            onClick={onToggle}
            checked={isChecked}
          />
        )}
      </State>
    ))
  )
  .add(
    'Invalid RadioInput',
    withInfo()(() => <RadioInput label="Error" isInvalid />)
  )
  .add(
    'Disabled RadioInput',
    withInfo()(() => <RadioInput label="Disabled" disabled />)
  );
