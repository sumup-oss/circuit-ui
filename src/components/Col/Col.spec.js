import React from 'react';

import Col from '.';

describe('Col', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Col />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Col />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
