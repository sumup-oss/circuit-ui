import React from 'react';

import PageButton from './PageButton';

describe('PageButton', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<PageButton />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<PageButton>Lorem ipsum</PageButton>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
