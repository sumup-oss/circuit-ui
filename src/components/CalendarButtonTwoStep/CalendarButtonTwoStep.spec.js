import React from 'react';

import CalendarButtonTwoStep from '.';

describe('CalendarButtonTwoStep', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CalendarButtonTwoStep />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CalendarButtonTwoStep />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
