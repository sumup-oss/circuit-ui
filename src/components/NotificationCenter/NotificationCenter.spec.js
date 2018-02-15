import React from 'react';

import NotificationCenter from '.';

describe('NotificationCenter', () => {
  it('should render with default styles', () => {
    const actual = create(
      <NotificationCenter>
        <div />
      </NotificationCenter>
    );
    expect(actual).toMatchSnapshot();
  });
  it('should render with positional styles', () => {
    const actualFixed = create(
      <NotificationCenter position={NotificationCenter.FIXED} />
    );
    expect(actualFixed).toMatchSnapshot();
    const actualAbsolute = create(
      <NotificationCenter position={NotificationCenter.ABSOLUTE} />
    );
    expect(actualAbsolute).toMatchSnapshot();
  });
  it('should render with corner styles', () => {
    const actualTopLeft = create(
      <NotificationCenter corner={NotificationCenter.TOP_LEFT} />
    );
    expect(actualTopLeft).toMatchSnapshot();
    const actualTopRight = create(
      <NotificationCenter corner={NotificationCenter.TOP_RIGHT} />
    );
    expect(actualTopRight).toMatchSnapshot();
    const actualBottomRight = create(
      <NotificationCenter corner={NotificationCenter.BOTTOM_RIGHT} />
    );
    expect(actualBottomRight).toMatchSnapshot();
    const actualBottomLeft = create(
      <NotificationCenter corner={NotificationCenter.BOTTOM_LEFT} />
    );
    expect(actualBottomLeft).toMatchSnapshot();
  });
});
