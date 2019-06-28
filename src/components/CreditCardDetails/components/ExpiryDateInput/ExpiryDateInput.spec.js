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

import ExpiryDateInput from '.';

describe('ExpiryDateInput', () => {
  const inputSelector = 'MaskedInput';
  it('should render a Label', () => {
    const wrapper = shallow(<ExpiryDateInput />);
    expect(wrapper.find('Label')).toHaveLength(1);
  });

  it('should render an Input', () => {
    const wrapper = shallow(<ExpiryDateInput />);
    expect(wrapper.find(inputSelector)).toHaveLength(1);
  });

  it('should pass the placeholder to the Input', () => {
    const wrapper = shallow(<ExpiryDateInput />);
    const actual = wrapper.find(inputSelector).props().placeholder;
    expect(actual).toBeTruthy();
  });

  it('should pass the id to the Input', () => {
    const wrapper = shallow(<ExpiryDateInput />);
    const actual = wrapper.find(inputSelector).props().id;
    expect(actual).toBeTruthy();
  });

  it('should spread any other props on the Input', () => {
    const wrapper = shallow(<ExpiryDateInput foo="bar" />);
    const actual = wrapper.find(inputSelector).props().foo;
    expect(actual).toBeTruthy();
  });
});
