import React from 'react';

import Tab from './Tab';

describe.skip('Tab', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Tab />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Tab />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
