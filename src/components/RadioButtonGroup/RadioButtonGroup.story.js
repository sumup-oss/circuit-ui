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
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import State from '../State';

import RadioButtonGroup from './RadioButtonGroup';

const options = [
  {
    label: 'Option 1',
    value: 'First'
  },
  {
    label: 'Option 2',
    value: 'Second'
  },
  {
    label: 'Option 3',
    value: 'Third'
  }
];

storiesOf(`${GROUPS.FORMS}|RadioButton/RadioButtonGroup`, module)
  .addParameters({ jest: ['RadioButtonGroup'] })
  .add('RadioButtonGroup', () => (
    <State
      initial=""
      name="value"
      updaterName="onChange"
      updater={(prev, event) => event.target.value}
    >
      {({ value, onChange }) => (
        <RadioButtonGroup
          {...{ options, value }}
          name="radio-button-group"
          onChange={e => {
            e.persist();
            action(`${e.target.value} radio button clicked`)(e);
            onChange(e);
          }}
        />
      )}
    </State>
  ));
