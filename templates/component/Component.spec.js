import React from 'react';

import Component from '.';

describe('Component', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Component />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Component />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
