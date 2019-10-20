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

import Label from '.';

export default {
  title: 'Forms|Label',

  parameters: {
    component: Label,
    jest: ['Label']
  }
};

export const label = () => <Label>An input label</Label>;

label.story = {
  name: 'Label'
};

export const labelUsedForAccessibilityOnly = () => (
  <Label accessibleOnly>Only visible for screen readers</Label>
);

labelUsedForAccessibilityOnly.story = {
  name: 'Label used for accessibility only'
};
