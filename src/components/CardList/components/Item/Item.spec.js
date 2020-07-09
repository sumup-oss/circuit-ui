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

import Item from './Item';

describe('Item', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Item>List item</Item>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with all paddings', () => {
    ['kilo', 'mega', 'giga'].forEach((padding) => {
      expect(
        create(<Item padding={padding}>List item</Item>),
      ).toMatchSnapshot();
    });
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Item>
        <span data-testid="child">Item</span>
      </Item>,
    );
    const childEl = getByTestId('child');
    expect(childEl).not.toBeNull();
    expect(childEl).toHaveTextContent('Item');
  });

  it('should render with selected styles', () => {
    const actual = create(<Item isSelected>List item</Item>);
    expect(actual).toMatchSnapshot();
  });
});
