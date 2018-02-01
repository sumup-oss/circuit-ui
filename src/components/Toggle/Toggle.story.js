import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import Toggle from './Toggle';
import State from '../State/State';

storiesOf('Toggle', module)
  .addDecorator(withTests('Toggle'))
  .add(
    'Default Toggle',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Toggle
            on={on}
            onToggle={e => {
              action('Toggle clicked')(e);
              onToggle(e);
            }}
          />
        )}
      </State>
    ))
  );
