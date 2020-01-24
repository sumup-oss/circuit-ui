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

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs/react';

import docs from './Select.docs.mdx';
import Select from './Select';
import Label from '../Label';

import { ReactComponent as DE } from './flags/de.svg';
import { ReactComponent as US } from './flags/us.svg';
import { ReactComponent as FR } from './flags/fr.svg';

export default {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    docs: { page: docs },
    jest: ['Select']
  }
};

const options = [
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

export const renderBase = (value, onChange) => (
  <Select
    name="select"
    options={options}
    value={value}
    onChange={e => {
      action('Option selected')(e);
      onChange(e.target.value);
    }}
    disabled={boolean('Disabled', false)}
    invalid={boolean('Invalid', false)}
    validationHint={text('Validation hint', '')}
  />
);

// Selects always need labels for accessibility.
const SelectWithLabelAndState = () => {
  const [value, setValue] = useState('US');
  return (
    <Label>
      Country
      {renderBase(value, setValue)}
    </Label>
  );
};

export const invalid = () => (
  <SelectWithLabelAndState
    invalid={boolean('Invalid', true)}
    validationHint={text('Validation hint', 'This field is required')}
  />
);

export const withPrefix = () => (
  <SelectWithLabelAndState
    name="country_select"
    renderPrefix={({ className, value }) => {
      const Icon = flagIconMap[value];
      return <Icon {...{ className }} />;
    }}
  />
);
