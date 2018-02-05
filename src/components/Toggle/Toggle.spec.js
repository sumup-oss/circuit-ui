import React from 'react';

import Toggle from '.';

describe('Setting', () => {
  it('should have the correct default styles', () => {
    const actual = create(<Toggle />);
    expect(actual).toMatchSnapshot();
  });

  it('should have no bottom margin when "withMargin" is falsy', () => {
    const actual = create(<Toggle withMargin={false} />);
    expect(actual).toMatchSnapshot(actual);
  });
});
