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
});
