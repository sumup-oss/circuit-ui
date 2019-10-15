import React from 'react';

import Logo from './Logo';

describe('Logo', () => {
  /**
   * An automatic accessibility test only covers basic best practices.
   * You will still need to test manually to ensure full accessibility.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Logo />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
