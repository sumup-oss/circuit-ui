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

import MaskedInput from '.';

describe('MaskedInput', () => {
  /**
   * Logic tests.
   */
  it('should render an Input', () => {
    const wrapper = mount(<MaskedInput mask={[/\d/]} />);
    const input = wrapper.find('input');
    expect(input).toBeTruthy();
  });

  it('should forward props to Input', () => {
    const wrapper = mount(<MaskedInput mask={[/\d/]} disabled />);
    const input = wrapper.find('Input');
    const actual = input.prop('disabled');
    expect(actual).toBeTruthy();
  });

  it('should set the deepRef on Input', () => {
    const wrapper = mount(<MaskedInput mask={[/\d/]} />);
    const input = wrapper.find('Input');
    const actual = input.prop('deepRef');
    expect(actual).toBeTruthy();
  });
});
