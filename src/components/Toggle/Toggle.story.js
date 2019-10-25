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
import { action } from '@storybook/addon-actions';

import State from '../State/State';
import Toggle from './Toggle';

export default {
  title: 'Forms|Toggle',

  parameters: {
    component: Toggle,
    jest: ['Toggle']
  }
};

export const toggle = () => (
  <State initial={false} name="on" updaterName="onChange" updater={on => !on}>
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
);

toggle.story = {
  name: 'Toggle'
};

export const toggleWithExplanation = () => (
  <State initial={false} name="on" updaterName="onChange" updater={on => !on}>
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
);

toggleWithExplanation.story = {
  name: 'Toggle with explanation'
};

export const toggleWithNoBottomMargin = () => (
  <State initial={false} name="on" updaterName="onChange" updater={on => !on}>
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
);

toggleWithNoBottomMargin.story = {
  name: 'Toggle with no bottom margin'
};
