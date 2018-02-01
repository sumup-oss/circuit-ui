import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import State from '../State/State';
import withTests from '../../util/withTests';
import Setting from './Setting';

storiesOf('Setting', module)
  .addDecorator(withTests('Setting'))
  .add(
    'Default Setting',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Setting
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
    'Setting with explanation',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Setting
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
    'Setting with no bottom margin',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Setting
            {...{ on }}
            onToggle={e => {
              action('Toggle clicked')(e);
              onToggle(e);
            }}
            label="Short label"
            withMargin={false}
          />
        )}
      </State>
    ))
  );
