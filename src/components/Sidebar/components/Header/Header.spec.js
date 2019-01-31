import React from 'react';

import Header from './Header';

describe('Header', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Header />);
      expect(actual).toMatchSnapshot();
    });

    it('should render children', () => {
      const wrapper = shallow(
        <Header>
          <span data-selector="child">text node</span>
        </Header>
      );
      const actual = wrapper.find('[data-selector="child"]');

      expect(actual).toHaveLength(1);
      expect(actual.text()).toEqual('text node');
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Header />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
