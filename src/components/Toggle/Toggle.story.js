import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import State from '../State/State';
import withTests from '../../util/withTests';
import Toggle from './Toggle';

storiesOf(`${GROUPS.FORMS}|Toggle`, module)
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
            label="Short label"
            onToggle={e => {
              action('Toggle clicked')(e);
              onToggle(e);
            }}
            {...{ on }}
          />
        )}
      </State>
    ))
  )
  .add(
    'Toggle with explanation',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Toggle
            label="Short label"
            onToggle={e => {
              action('Toggle clicked')(e);
              onToggle(e);
            }}
            {...{ on }}
            explanation="Some more detailed text of what this means"
          />
        )}
      </State>
    ))
  )
  .add(
    'Toggle with no bottom margin',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Toggle
            {...{ on }}
            onToggle={e => {
              action('Toggle clicked')(e);
              onToggle(e);
            }}
            label="Short label"
            noMargin
          />
        )}
      </State>
    ))
  );
