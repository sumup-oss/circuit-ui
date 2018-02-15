import React from 'react';

import NotificationList from '.';

describe('NotificationList', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <NotificationList>
        <div />
      </NotificationList>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<NotificationList />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
