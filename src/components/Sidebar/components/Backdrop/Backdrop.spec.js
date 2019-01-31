import React from 'react';

import Backdrop from './Backdrop';

describe.skip('Backdrop', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Backdrop />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Backdrop />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
