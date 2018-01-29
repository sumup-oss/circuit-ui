import React from 'react';

import FormLabel from '.';

describe('FormLabel', () => {
  it('should have the correct styles', () => {
    const actual = create(<FormLabel htmlFor="some-id">Label</FormLabel>);
    expect(actual).toMatchSnapshot();
  });
});
