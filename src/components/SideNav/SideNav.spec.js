import React from 'react';

import SideNav from './SideNav';

describe.skip('SideNav', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SideNav />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */

  it('should have tests');

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SideNav />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
