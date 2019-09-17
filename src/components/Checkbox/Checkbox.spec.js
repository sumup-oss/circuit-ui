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

import Checkbox from '.';

const name = 'name';
const onChange = jest.fn();

describe('Checkbox', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Checkbox {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with checked styles when passed the checked prop', () => {
    const actual = create(<Checkbox checked {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Checkbox disabled {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Checkbox invalid {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with a tooltip when passed a validation hint', () => {
    const actual = create(
      <Checkbox
        validationHint="This field is required."
        {...{ name, onChange }}
      />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const { getByLabelText } = render(
      <Checkbox {...{ name, onChange }}>Label</Checkbox>
    );
    const inputEl = getByLabelText('Label', {
      exact: false
    });
    expect(inputEl).not.toHaveAttribute('checked');
  });

  it('should call the change handler when clicked', () => {
    const { getByLabelText } = render(
      <Checkbox {...{ name, onChange }}>Label</Checkbox>
    );
    const inputEl = getByLabelText('Label', {
      exact: false
    });

    act(() => {
      fireEvent.click(inputEl);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div>
        <Checkbox {...{ name, onChange }}>Label</Checkbox>
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
