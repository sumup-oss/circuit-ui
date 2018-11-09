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
