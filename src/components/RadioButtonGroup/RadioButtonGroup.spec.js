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

import RadioButtonGroup from '.';

describe('RadioButtonGroup', () => {
  const options = [
    {
      label: 'Option 1',
      value: 'first'
    },
    {
      label: 'Option 2',
      value: 'second'
    },
    {
      label: 'Option 3',
      value: 'third'
    }
  ];

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<RadioButtonGroup {...{ options }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const value = 'second';
    const wrapper = renderToHtml(
      <div role="group" aria-label="Choose your favourite option">
        <RadioButtonGroup options={options} value={value} />
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should check the currently active RadioButton', () => {
    const value = 'second';
    const { getByLabelText } = render(
      <RadioButtonGroup options={options} value={value} />
    );
    expect(getByLabelText('Option 1')).not.toHaveAttribute('checked');
    expect(getByLabelText('Option 2')).toHaveAttribute('checked');
    expect(getByLabelText('Option 3')).not.toHaveAttribute('checked');
  });
});
