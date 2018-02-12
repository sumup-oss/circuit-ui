import React from 'react';

import AlertIcon from '../..';

describe('AlertIcon', () => {
  /**
   * Style tests.
   */

  it('should have the correct styles', () => {
    const actual = create(<AlertIcon />);
    expect(actual).toMatchSnapshot();
  });
});
