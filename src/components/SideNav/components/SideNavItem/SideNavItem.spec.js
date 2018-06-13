import React from 'react';

import SideNavItem from './SideNavItem';

describe.skip('SideNavItem', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SideNavItem />);
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
    const wrapper = renderToHtml(<SideNavItem />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
