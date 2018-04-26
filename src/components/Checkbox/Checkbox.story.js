import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import State from '../State';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withTests('Checkbox'))
  .add(
    'Default Checkbox',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onChange"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onChange }) => (
          <Checkbox
            value={isChecked}
            name="checkbox"
            onChange={e => {
              action('Checkbox clicked')(e);
              onChange(e);
            }}
            checked={isChecked}
          >
            {isChecked ? 'Checked' : 'Unchecked'}
          </Checkbox>
        )}
      </State>
    ))
  )
  .add(
    'Invalid Checkbox',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onChange"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onChange }) => (
          <Checkbox
            value="true"
            name="checkbox"
            onChange={e => {
              action('Checkbox clicked')(e);
              onChange(e);
            }}
            checked={isChecked}
            invalid
          >
            Error
          </Checkbox>
        )}
      </State>
    ))
  )
  .add(
    'Disabled Checkbox',
    withInfo()(() => (
      <Checkbox value="checkbox" name="checkbox" disabled>
        Disabled
      </Checkbox>
    ))
  );
