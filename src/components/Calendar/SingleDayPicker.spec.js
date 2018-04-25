import React from 'react';

import { SingleDayPicker } from '.';

const props = { onDateChange: () => {}, onFocusChange: () => {} };

describe('SingleDayPicker', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SingleDayPicker {...props} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SingleDayPicker {...props} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
