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

import Selector from './Selector';

export default {
  title: 'Components|Selector',

  parameters: {
    component: Selector,
    jest: ['Selector']
  }
};

export const selector = () => <Selector>Select me!</Selector>;

selector.story = {
  name: 'Selector'
};

export const disabledSelector = () => (
  <Selector disabled>I cannot be selected</Selector>
);

disabledSelector.story = {
  name: 'Disabled Selector'
};

export const selectedSelected = () => (
  <Selector selected>I am selected!</Selector>
);

selectedSelected.story = {
  name: 'Selected Selected'
};
