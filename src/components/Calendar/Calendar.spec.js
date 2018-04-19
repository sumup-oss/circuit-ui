import React from 'react';

import Calendar from '.';

describe('Calendar', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Calendar />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Calendar />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
