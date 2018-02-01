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
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <Checkbox
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
        updaterName="onToggle"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onToggle }) => (
          <Checkbox
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
          </Checkbox>
        )}
      </State>
    ))
  )
  .add(
    'Disabled Checkbox',
    withInfo()(() => <Checkbox disabled>Disabled</Checkbox>)
  );
