import React from 'react';

import Picture from '.';

describe('Picture', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Picture />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Picture alt="Some alt text" />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
