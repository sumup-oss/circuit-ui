import React from 'react';

import CalendarWrapper from '.';

describe('CalendarWrapper', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CalendarWrapper />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CalendarWrapper />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
