import React from 'react';

import CalendarButton from '.';

describe('CalendarButton', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CalendarButton />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CalendarButton />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
