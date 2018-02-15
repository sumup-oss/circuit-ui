import React from 'react';

import NotificationBanner from '.';

describe('NotificationBanner', () => {
  it('should render with default styles', () => {
    const actual = create(
      <NotificationBanner>
        <div />
      </NotificationBanner>
    );
    expect(actual).toMatchSnapshot();
  });
});
