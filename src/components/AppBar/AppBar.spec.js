import React from 'react';

import AppBar from './AppBar';

describe('AppBar', () => {
  const props = {
    title: 'Title',
    onHamburgerClick: jest.fn(),
    hamburgerButtonLabel: 'hamburguer-button'
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<AppBar {...props} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<AppBar {...props} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
