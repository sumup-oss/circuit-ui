import React from 'react';

import Notifications from '.';

describe('Notifications', () => {
  it('should render with default styles', () => {
    const actual = create(
      <Notifications>
        <div />
      </Notifications>
    );
    expect(actual).toMatchSnapshot();
  });
  it('should render with top-left styles', () => {
    const actual = create(<Notifications position={Notifications.TOP_LEFT} />);
    expect(actual).toMatchSnapshot();
  });
  it('should render with top-right styles', () => {
    const actual = create(<Notifications position={Notifications.TOP_RIGHT} />);
    expect(actual).toMatchSnapshot();
  });
  it('should render with bottom-right styles', () => {
    const actual = create(
      <Notifications position={Notifications.BOTTOM_RIGHT} />
    );
    expect(actual).toMatchSnapshot();
  });
  it('should render with bottom-left styles', () => {
    const actual = create(
      <Notifications position={Notifications.BOTTOM_LEFT} />
    );
    expect(actual).toMatchSnapshot();
  });
});
