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

import { uniqueId } from '../../util/id';

import docs from './Input.docs.mdx';
import Input from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    docs: { page: docs },
    jest: ['Input']
  }
};

// Inputs always need labels for accessibility.
const InputWithLabel = props => {
  const id = uniqueId();
  return (
    <div>
      <Input placeholder="Placeholder" {...props} id={id} label="Label" />
    </div>
  );
};

export const base = () => <InputWithLabel />;

export const valid = () => (
  <>
    <InputWithLabel validationHint="That's correct." showValid />
    <InputWithLabel showValid />
  </>
);

export const invalid = () => (
  <>
    <InputWithLabel validationHint="This field is required." invalid />
    <InputWithLabel invalid />
  </>
);

export const warning = () => (
  <>
    <InputWithLabel validationHint="This does not look right." hasWarning />
    <InputWithLabel hasWarning />
  </>
);

export const optional = () => <InputWithLabel optional />;

export const disabled = () => <InputWithLabel value="Some value" disabled />;

export const rightAligned = () => <InputWithLabel textAlign="right" />;

export const inline = () => (
  <div>
    <Input placeholder="First" inline />
    <Input placeholder="Second" inline />
  </div>
);

export const withVisuallyHiddenLabel = props => (
  <Input
    placeholder="Placeholder"
    {...props}
    label="Label"
    labelVisuallyHidden
  />
);
