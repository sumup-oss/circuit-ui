import React from 'react';

import NavList from '../NavList';
import NavItem from './NavItem';

describe('NavItem', () => {
  describe('styles', () => {
    it('should render with default styles and match the snapshot', () => {
      const props = {
        selected: false,
        onClick: jest.fn()
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with selected state styles and match the snapshot', () => {
      const props = {
        selected: true,
        onClick: jest.fn()
      };
      const actual = create(<NavItem {...props} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render children', () => {
      const wrapper = shallow(
        <NavItem>
          <span data-selector="child">text node</span>
        </NavItem>
      );
      const actual = wrapper.find('[data-selector="child"]');

      expect(actual).toHaveLength(1);
      expect(actual.text()).toEqual('text node');
    });

    it('should render an icon', () => {
      const wrapper = shallow(
        <NavItem icon={<div />}>
          <span data-selector="child">text node</span>
        </NavItem>
      );
      const actual = wrapper.find('IconWrapper');

      expect(actual).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <NavList>
          <NavItem />
        </NavList>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
