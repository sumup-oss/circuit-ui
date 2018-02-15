import React from 'react';

import NotificationBanner from '.';

describe('NotificationBanner', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <NotificationBanner>
        <div />
      </NotificationBanner>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<NotificationBanner />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
