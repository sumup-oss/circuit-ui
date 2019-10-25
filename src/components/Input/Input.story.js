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

import React, { Fragment } from 'react';

import Input from '.';
import Label from '../Label';

export default {
  title: 'Forms|Input',

  parameters: {
    component: Input,
    jest: ['Input']
  }
};

export const input = () => <Input placeholder="Placeholder" />;

input.story = {
  name: 'Input'
};

export const inputValid = () => <Input placeholder="Placeholder" showValid />;

inputValid.story = {
  name: 'Input valid'
};

export const inputInvalid = () => (
  <Fragment>
    <Input
      placeholder="Placeholder"
      validationHint="This field is required."
      invalid
    />
    <Input placeholder="Placeholder" invalid />
  </Fragment>
);

inputInvalid.story = {
  name: 'Input invalid'
};

export const inputWarning = () => (
  <Fragment>
    <Input
      placeholder="Placeholder"
      validationHint="This does not look right."
      hasWarning
    />
    <Input placeholder="Placeholder" hasWarning />
  </Fragment>
);

inputWarning.story = {
  name: 'Input warning'
};

export const inputOptional = () => <Input placeholder="Placeholder" optional />;

inputOptional.story = {
  name: 'Input optional'
};

export const inputDisabled = () => <Input value="Some value" disabled />;

inputDisabled.story = {
  name: 'Input disabled'
};

export const inputRightAlignedText = () => (
  <Input placeholder="Placeholder" textAlign="right" />
);

inputRightAlignedText.story = {
  name: 'Input right aligned text'
};

export const inlineInputs = () => (
  <div>
    <Input placeholder="First" inline />
    <Input placeholder="Second" inline />
  </div>
);

inlineInputs.story = {
  name: 'Inline inputs'
};

export const stackedInputs = () => (
  <div>
    <Label htmlFor="first">My label</Label>
    <Input placeholder="First" id="first" />
    <Label htmlFor="second">My second label</Label>
    <Input placeholder="Second" id="second" />
  </div>
);

stackedInputs.story = {
  name: 'Stacked inputs'
};
