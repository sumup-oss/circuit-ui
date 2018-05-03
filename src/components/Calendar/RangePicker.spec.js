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
});
