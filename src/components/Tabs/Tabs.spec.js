import React from 'react';

import Tabs from './Tabs';

describe.skip('Tabs', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Tabs />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Tabs />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
