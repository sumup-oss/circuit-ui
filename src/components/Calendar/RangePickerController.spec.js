import React from 'react';

import { RangePickerController } from '.';

describe('RangePickerController', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = shallow(<RangePickerController />);
    expect(actual).toMatchSnapshot();
  });
});
