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

import RestrictedInput from '.';

describe('RestrictedInput', () => {
  it('should render an Input', () => {
    const wrapper = shallow(<RestrictedInput />);
    const themedInput = wrapper.find('Input');
    expect(themedInput).toHaveLength(1);
  });

  it('should overwrite the keyDown handler on the Input, when filtered keys are provided', () => {
    const wrapper = shallow(<RestrictedInput filteredKeys={['e']} />);
    const themedInput = wrapper.find('Input');
    const actual = themedInput.props('onKeyDown');
    expect(actual).toBeTruthy();
  });

  it('should overwrite the focus handler on the input', () => {
    const wrapper = shallow(<RestrictedInput />);
    const themedInput = wrapper.find('Input');
    const actual = themedInput.props('onFocus');
    expect(actual).toBeTruthy();
  });

  it('should overwrite the mouseUp handler on the Input', () => {
    const wrapper = shallow(<RestrictedInput />);
    const themedInput = wrapper.find('Input');
    const actual = themedInput.props('onMouseUp');
    expect(actual).toBeTruthy();
  });
});
