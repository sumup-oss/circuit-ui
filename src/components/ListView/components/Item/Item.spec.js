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
    [Item.KILO, Item.MEGA, Item.GIGA].forEach(padding => {
      expect(
        create(<Item padding={padding}>List item</Item>)
      ).toMatchSnapshot();
    });
  });

  it('should render children', () => {
    const wrapper = shallow(
      <Item>
        <div data-selector="child">text node</div>
      </Item>
    );
    const actual = wrapper.find('[data-selector="child"]');

    expect(actual).toHaveLength(1);
    expect(actual.text()).toEqual('text node');
  });

  it('should render with selected styles', () => {
    const actual = render(<Item isSelected>List item</Item>);
    expect(actual).toMatchSnapshot();
  });
});
