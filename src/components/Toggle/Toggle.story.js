import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

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
        {props => <Toggle {...props} />}
      </State>
    ))
  );
