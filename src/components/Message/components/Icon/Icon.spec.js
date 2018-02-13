import React from 'react';

import MessageIcon from '../..';

describe('MessageIcon', () => {
  /**
   * Style tests.
   */

  it('should have the correct styles', () => {
    const actual = create(<MessageIcon />);
    expect(actual).toMatchSnapshot();
  });
});
