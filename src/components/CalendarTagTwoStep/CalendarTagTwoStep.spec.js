import React from 'react';

import CalendarTagTwoStep from '.';

describe('CalendarTagTwoStep', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CalendarTagTwoStep />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CalendarTagTwoStep />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
