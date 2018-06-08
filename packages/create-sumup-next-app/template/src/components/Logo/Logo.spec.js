import React from 'react';

import Logo from '.';

describe('Logo', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Logo />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Logo />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
