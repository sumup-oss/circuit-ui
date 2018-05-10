import React from 'react';

import AutoCompleteInput from '.';

describe('AutoCompleteInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <AutoCompleteInput handleChange={() => {}} items={[]} />
    );
    expect(actual).toMatchSnapshot();
  });
});
