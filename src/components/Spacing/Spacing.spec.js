import React from 'react';

import Spacing from '.';

describe('Spacing', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Spacing />);
    expect(actual).toMatchSnapshot();
  });

  describe('margin bottom', () => {
    it('should render with margin bottom styles', () => {
      const actual = create(<Spacing bottom />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('margin top', () => {
    it('should render with margin top styles', () => {
      const actual = create(<Spacing top />);
      expect(actual).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Spacing />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
