import React from 'react';

import Message from '.';

describe('Message', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Message />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Message />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
