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

import TextArea from '.';

export default {
  title: 'Forms|TextArea',

  parameters: {
    component: TextArea,
    jest: ['TextArea']
  }
};

export const textArea = () => <TextArea placeholder="Enter your story here" />;

textArea.story = {
  name: 'TextArea'
};

export const textAreaInvalid = () => (
  <TextArea placeholder="Invalid TextArea, maybe too many chars?" invalid />
);

textAreaInvalid.story = {
  name: 'TextArea invalid'
};

export const textAreaWarning = () => (
  <TextArea
    placeholder="TextArea with warning, maybe too many chars?"
    hasWarning
  />
);

textAreaWarning.story = {
  name: 'TextArea warning'
};

export const textAreaOptional = () => (
  <TextArea placeholder="Optional" optional />
);

textAreaOptional.story = {
  name: 'TextArea optional'
};

export const textAreaDisabled = () => (
  <TextArea
    value="You cannot enter text because the textarea is disabled"
    disabled
  />
);

textAreaDisabled.story = {
  name: 'TextArea disabled'
};
