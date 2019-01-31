import React from 'react';

import CloseButton from './CloseButton';

describe.skip('CloseButton', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<CloseButton />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<CloseButton />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
