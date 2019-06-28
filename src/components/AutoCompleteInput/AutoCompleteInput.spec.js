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

import AutoCompleteInput from '.';

describe('AutoCompleteInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<AutoCompleteInput onChange={() => {}} items={[]} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should filter items when input is changed', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <AutoCompleteInput
        onChange={handleChange}
        items={['1111111111111', '2222222222222', '3333333333333']}
      />
    );

    wrapper.find('input').simulate('change', { target: { value: '222' } });

    expect(
      wrapper
        .find('#downshift-1-item-0')
        .first()
        .text()
    ).toBe('2222222222222');
  });
});
