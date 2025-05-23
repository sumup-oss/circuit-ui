/**
 * Copyright 2025, SumUp Ltd.
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

import { Autocomplete, type AutocompleteProps } from './Autocomplete.js';
import { suggestions } from './fixtures.js';

export default {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  tags: ['status:stable'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const baseArgs = {
  label: 'Choose your hero',
  placeholder: 'Whiskers',
  suggestions,
  validationHint: 'All our cats have been neutered and vaccinated.',
  value: suggestions[8].value,
};

export const Base = (args: AutocompleteProps) => <Autocomplete {...args} />;
Base.args = baseArgs;
