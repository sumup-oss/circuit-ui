import React from 'react';

import Footer from './Footer';

describe('Header', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Footer />);
      expect(actual).toMatchSnapshot();
    });

    it('should render children', () => {
      const wrapper = shallow(
        <Footer>
          <span data-selector="child">text node</span>
        </Footer>
      );
      const actual = wrapper.find('[data-selector="child"]');

      expect(actual).toHaveLength(1);
      expect(actual.text()).toEqual('text node');
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Footer />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
