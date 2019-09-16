/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        updaterName="onChange"
        updater={on => !on}
      >
        {({ onChange, on }) => (
          <Toggle
            label="Short label"
            onChange={e => {
              action('Toggle clicked')(e);
              onChange(e);
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
        updaterName="onChange"
        updater={on => !on}
      >
        {({ onChange, on }) => (
          <Toggle
            label="Short label"
            onChange={e => {
              action('Toggle clicked')(e);
              onChange(e);
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
        updaterName="onChange"
        updater={on => !on}
      >
        {({ onChange, on }) => (
          <Toggle
            {...{ on }}
            onChange={e => {
              action('Toggle clicked')(e);
              onChange(e);
            }}
            label="Short label"
            noMargin
          />
        )}
      </State>
    ))
  );
