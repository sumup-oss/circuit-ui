import React from 'react';

import NavList from './NavList';

describe.skip('NavList', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<NavList />);
      expect(actual).toMatchSnapshot();
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
