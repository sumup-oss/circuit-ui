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
import { boolean } from '@storybook/addon-knobs/react';

import { uniqueId } from '../../util/id';

import docs from './AutoCompleteInput.docs.mdx';
import AutoCompleteInput from './AutoCompleteInput';
import Label from '../Label';

export default {
  title: 'Forms/Input/AutoCompleteInput',
  component: AutoCompleteInput,
  parameters: {
    docs: { page: docs },
    jest: ['AutoCompleteInput']
  }
};

// Inputs always need labels for accessibility.
const AutoCompleteInputWithLabel = props => {
  const id = uniqueId();
  return (
    <Label htmlFor={id}>
      Label
      <AutoCompleteInput {...props} id={id} />
    </Label>
  );
};

export const base = () => (
  <AutoCompleteInputWithLabel
    items={[
      'liam.murphy@sumup.com',
      'liam.burdock@sumup.com',
      'lilijane.giordano@sumup.com'
    ]}
    onChange={action('handleChange')}
    clearOnSelect={boolean('clearOnSelect', false)}
  />
);
