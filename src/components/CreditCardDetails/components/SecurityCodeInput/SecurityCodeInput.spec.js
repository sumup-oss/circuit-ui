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

import SecurityCodeInput from '.';

describe('SecurityCodeInput', () => {
  it('should render an input with label', () => {
    const { getByLabelText } = render(
      <SecurityCodeInput label="Security Code" />
    );
    const inputEl = getByLabelText('Security Code');
    expect(inputEl).toBeVisible();
  });

  it('should pass the placeholder to the Input', () => {
    const { getByPlaceholderText } = render(
      <SecurityCodeInput placeholder="Security code" />
    );
    const inputEl = getByPlaceholderText('Security code');
    expect(inputEl).toBeVisible();
  });

  it('should pass any other props to the input', () => {
    const { getByLabelText } = render(
      <SecurityCodeInput label="Security Code" foo="bar" />
    );
    const inputEl = getByLabelText('Security Code');
    expect(inputEl).toHaveAttribute('foo', 'bar');
  });

  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SecurityCodeInput />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
