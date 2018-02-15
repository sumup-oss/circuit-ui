import React from 'react';

import NotificationList from '.';

describe('NotificationList', () => {
  it('should render with default styles', () => {
    const actual = create(
      <NotificationList>
        <div />
      </NotificationList>
    );
    expect(actual).toMatchSnapshot();
  });
});
