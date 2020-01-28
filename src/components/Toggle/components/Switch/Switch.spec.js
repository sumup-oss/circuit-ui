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

import Switch from '.';

describe('Switch', () => {
  /**
   * Stylesheet tests.
   */
  it('should have the correct default styles', () => {
    const actual = create(<Switch />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct on styles', () => {
    const actual = create(<Switch on />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call the change handler when toggled', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Switch onChange={onChange} data-testid="switch" />
    );
    act(() => {
      fireEvent.click(getByTestId('switch'));
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
