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

import State from '../State';
import RadioButton from './RadioButton';

export default {
  title: 'Forms|RadioButton',

  parameters: {
    component: RadioButton,
    jest: ['RadioButton']
  }
};

export const radioButton = () => (
  <State
    initial={false}
    name="isChecked"
    updaterName="onChange"
    updater={isChecked => !isChecked}
  >
    {({ isChecked, onChange }) => (
      <RadioButton
        value="radio"
        name="radio"
        onChange={e => {
          action('Radio clicked')(e);
          onChange(e);
        }}
        checked={isChecked}
      >
        {isChecked ? 'Checked' : 'Unchecked'}
      </RadioButton>
    )}
  </State>
);

radioButton.story = {
  name: 'RadioButton'
};

export const invalidRadioButton = () => (
  <State
    initial={false}
    name="isChecked"
    updaterName="onChange"
    updater={isChecked => !isChecked}
  >
    {({ isChecked, onChange }) => (
      <RadioButton
        value="radio"
        name="radio"
        onChange={e => {
          action('Radio clicked')(e);
          onChange(e);
        }}
        checked={isChecked}
        invalid
      >
        Error
      </RadioButton>
    )}
  </State>
);

invalidRadioButton.story = {
  name: 'Invalid RadioButton'
};

export const disabledRadioButton = () => (
  <RadioButton value="radio" name="radio" disabled>
    Disabled
  </RadioButton>
);

disabledRadioButton.story = {
  name: 'Disabled RadioButton'
};
