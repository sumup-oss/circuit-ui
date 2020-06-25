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

import { TextArea, TextAreaProps } from './TextArea';
import docs from './TextArea.docs.mdx';

export default {
  title: 'Forms/TextArea',
  component: TextArea,
  parameters: {
    docs: { page: docs }
  }
};

// TextAreas always need labels for accessibility.
const TextAreaWithLabel = (props: Partial<TextAreaProps>) => {
  const id = uniqueId();
  return (
    <TextArea
      placeholder="Write your text here..."
      {...props}
      id={id}
      label="Label"
    />
  );
};

export const base = () => <TextAreaWithLabel />;

export const invalid = () => (
  <TextAreaWithLabel validationHint="Please fill in this field." invalid />
);

export const warning = () => (
  <TextAreaWithLabel
    validationHint="We recommend that you fill in this field."
    hasWarning
  />
);

export const readonly = () => <TextAreaWithLabel readOnly />;

export const disabled = () => (
  <TextAreaWithLabel
    value="You cannot edit the text because the textarea is disabled"
    disabled
  />
);

export const hiddenLabel = () => <TextAreaWithLabel hideLabel />;
