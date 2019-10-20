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
import { boolean, text } from '@storybook/addon-knobs/react';

import State from '../State';
import Select from '.';

import { ReactComponent as DE } from './flags/de.svg';
import { ReactComponent as US } from './flags/us.svg';
import { ReactComponent as FR } from './flags/fr.svg';

const options = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  }
];

const countryOptions = [
  {
    label: 'United States',
    value: 'US'
  },
  {
    label: 'Germany',
    value: 'DE'
  },
  {
    label: 'France',
    value: 'FR'
  }
];
const flagIconMap = { DE, US, FR };

export default {
  title: 'Forms|Select',

  parameters: {
    component: Select,
    jest: ['Select']
  }
};

export const select = () => (
  <Select
    name="select"
    options={options}
    onChange={action('Option selected')}
    disabled={boolean('Disabled', false)}
    invalid={boolean('Invalid', false)}
    validationHint={text('Validation hint', '')}
  />
);

select.story = {
  name: 'Select'
};

export const selectInvalid = () => (
  <Select
    name="select"
    options={options}
    onChange={action('Option selected')}
    disabled={boolean('Disabled', false)}
    invalid={boolean('Invalid', true)}
    validationHint={text('Validation hint', 'This field is required')}
  />
);

selectInvalid.story = {
  name: 'Select invalid'
};

export const selectWithPrefix = () => (
  <State
    initial="US"
    name="country"
    updaterName="onChange"
    updater={(prevCountry, country) => country}
  >
    {({ country, onChange }) => (
      <Select
        name="country_select"
        options={countryOptions}
        value={country}
        renderPrefix={({ className }) => {
          const Icon = flagIconMap[country];

          return <Icon {...{ className }} />;
        }}
        onChange={e => {
          action('Option selected')(e);
          onChange(e.target.value);
        }}
        disabled={boolean('Disabled', false)}
        invalid={boolean('Invalid', false)}
      />
    )}
  </State>
);

selectWithPrefix.story = {
  name: 'Select with prefix'
};
