import React from 'react';

import NavList from './NavList';

describe('NavList', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<NavList />);
      expect(actual).toMatchSnapshot();
    });

    it('should render children', () => {
      const wrapper = shallow(
        <NavList>
          <li data-selector="child">text node</li>
        </NavList>
      );
      const actual = wrapper.find('[data-selector="child"]');

      expect(actual).toHaveLength(1);
      expect(actual.text()).toEqual('text node');
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<NavList />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
