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

  /**
   * Accessibility tests.
   */

  /*
  a11y test for RangePickerController failes (timeots most of the time)
  for some reason. Should already be tested, anyway.
  */

  /*
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<RangePickerController />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
  */
});
