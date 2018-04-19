import React from 'react';

import CalendarWrap from '.';

describe('CalendarWrap', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CalendarWrap />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CalendarWrap />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
