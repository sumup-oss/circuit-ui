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
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { Checkbox, CheckboxProps } from './Checkbox';
import docs from './Checkbox.docs.mdx';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: { page: docs }
  }
};

// eslint-disable-next-line react/prop-types
const CheckboxWithState = ({
  checked: initial = false,
  children,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(initial);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    action('Checkbox clicked')(event);
    setChecked(prev => !prev);
  };
  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={handleChange}
      tracking={{ label: text('Tracking Label', 'trackingId') }}
    >
      {children || (checked ? 'Checked' : 'Unchecked')}
    </Checkbox>
  );
};

export const base = () => <CheckboxWithState name="base" value="true" />;

export const invalid = () => (
  <CheckboxWithState
    name="invalid"
    value="invalid"
    validationHint={text('Validation hint', 'This field is required.')}
    invalid
  />
);

export const disabled = () => (
  <CheckboxWithState name="disabled" value="disabled" disabled />
);

export const multiple = () => (
  <>
    <CheckboxWithState value="apples" name="fruits">
      Apples
    </CheckboxWithState>
    <CheckboxWithState value="bananas" name="fruits">
      Bananas
    </CheckboxWithState>
    <CheckboxWithState value="oranges" name="fruits">
      Oranges
    </CheckboxWithState>
  </>
);
