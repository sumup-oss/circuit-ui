import React from 'react';

import CalendarTag from '.';

describe('CalendarTag', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CalendarTag />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CalendarTag />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
