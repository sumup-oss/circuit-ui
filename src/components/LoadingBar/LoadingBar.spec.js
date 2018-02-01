import React from 'react';

import LoadingBar from '.';

describe('LoadingBar', () => {
  /**
   * Stylesheet tests.
   */
  it('should render with default styles', () => {
    const actual = create(<LoadingBar />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with loading styles', () => {
    const actual = create(<LoadingBar value={0.5} />);
    expect(actual).toMatchSnapshot();
  });
});
