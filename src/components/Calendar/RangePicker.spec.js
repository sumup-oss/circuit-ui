import React from 'react';

import { RangePicker } from '.';

describe('RangePicker', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<RangePicker />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<RangePicker />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
