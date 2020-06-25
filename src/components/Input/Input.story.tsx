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

import React, { useState, ChangeEvent } from 'react';
import { css } from '@emotion/core';
import { boolean, text } from '@storybook/addon-knobs';

import docs from './Input.docs.mdx';
import { Input, InputProps } from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    docs: { page: docs }
  }
};

const BaseInput = ({
  value: initialValue = '',
  ...props
}: Partial<InputProps>) => {
  const [value, setValue] = useState(initialValue);

  // The readOnly attribute is treated as truthy even if the value is falsy
  const readOnly = boolean('Readonly', false);

  if (readOnly) {
    // eslint-disable-next-line no-param-reassign
    props.readOnly = true;
  }

  return (
    <Input
      value={value}
      label={text('Label', 'First name')}
      placeholder={text('Placeholder', 'Jane')}
      validationHint={text('Validation hint', 'Maximum 100 characters')}
      invalid={boolean('Invalid', false)}
      showValid={boolean('Show valid', false)}
      hasWarning={boolean('Has warning', false)}
      readOnly={boolean('Readonly', false)}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      css={css`
        max-width: 250px;
      `}
      {...props}
    />
  );
};

export const base = () => <BaseInput />;

export const valid = () => (
  <BaseInput
    label="Username"
    validationHint="Yay! That username is available."
    showValid
  />
);

export const invalid = () => (
  <BaseInput validationHint="This field is required." invalid />
);

export const warning = () => (
  <BaseInput validationHint="This does not look right." hasWarning />
);

export const readonly = () => <BaseInput readOnly value="Copy me" />;

export const disabled = () => <BaseInput value="Some value" disabled />;

export const rightAligned = () => <BaseInput textAlign="right" />;

export const inline = () => (
  <div>
    <BaseInput placeholder="First name" inline />
    <BaseInput placeholder="Last name" inline />
  </div>
);

export const hiddenLabel = () => (
  <BaseInput
    hideLabel
    label="Email"
    placeholder="Email"
    type="email"
    validationHint=""
  />
);
