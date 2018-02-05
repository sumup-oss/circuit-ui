import React from 'react';

import Toggle from '.';

describe('Setting', () => {
  it('should have the correct default styles', () => {
    const actual = create(<Toggle />);
    expect(actual).toMatchSnapshot();
  });

  it('should have no bottom margin when "margin" is falsy', () => {
    const actual = create(<Toggle margin={false} />);
    expect(actual).toMatchSnapshot(actual);
  });
});
