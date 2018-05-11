import React from 'react';

import AutoCompleteTags from '.';

describe('AutoCompleteTags', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<AutoCompleteTags availableTags={[]} />);
    expect(actual).toMatchSnapshot();
  });
});
